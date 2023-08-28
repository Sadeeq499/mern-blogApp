import { fileRemover } from "../helpers/fileRemover.js";
import { uploadPicture } from "../middleware/pictureUpload.js";
import Post from "../Models/PostModel.js";
import { v4 as uuidv4 } from "uuid";
import Comment from "../Models/CommentModel.js";

// ---------------------------CreatePost -------------------------------------------------------
export const CreatePostController = async (req, res, next) => {
  try {
    const post = new Post({
      title: "sample title",
      caption: "sample Caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });
    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};
// ----------------updatePOst---------------------------------------------
export const UpdatePostController = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      const error = new Error("Post not found");
      next(error);
      return;
    }
    const upload = uploadPicture.single("postPicture");
    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;

      const updatePost = await post.save();
      return res.json(updatePost);
    };
    upload(req, res, async function (err) {
      if (err) {
        const err = new Error("An unknown error occured while uploading ");
        next(err);
      } else {
        // upload the image
        if (req.file) {
          let filename;
          filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
          handleUpdatePostData(req.body.document);
        } else {
          let filename;
          filename = post.photo;
          post.photo = "";
          fileRemover(filename);
          handleUpdatePostData(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// --------------------DeletePost------------------------------------------------

export const DeletePostController = async (req, res, next) => {
  try {
    // check the post through slug amd delete the post
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    // if no post founded related to that slug then display the message
    if (!post) {
      const Err = new Error("Post not found");
      next(Err);
    }

    // Deleted all the Comments on  that post
    await Comment.deleteMany({ post: post._id });
    return res.json({
      message: "Post is Successfully Deleted",
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------Get Post-------------------------------------------------------

export const getPostController = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["name", "avatar"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);

    if (!post) {
      const err = new Error("Post not found");
      next(err);
    }
    return res.json(post);
  } catch (error) {
    next(error);
  }
};

// --------------------------------Get All Posts--------------------------------
export const getAllPosts = async (req, res, next) => {
  try {
    const filter = req.query.searchKey;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }
    let query = Post.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Post.countDocuments();
    const pages = Math.ceil(total / pageSize);

    if (page > pages) {
      const err = new Error("Page not found");
      next(err);
    }
    const results = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
      ])
      .sort({ createdAt: -1 });

    res.header({
      "X-Total-Count": JSON.stringify(total),
      "X-Total-Pages": JSON.stringify(pages),
      "X-Current-Page": JSON.stringify(page),
      "X-Filter": JSON.stringify(filter),
      "X-Page-Size": JSON.stringify(pageSize),
    });
    res.json(results);
  } catch (error) {
    next(error);
  }
};
