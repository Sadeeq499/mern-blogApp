import PostCategories from "../Models/PostCategories.js";
import PostModel from "../Models/PostModel.js";
const createPostCategory = async (req, res, next) => {

    try {
        const { title } = req.body;
        const postCategory = await PostCategories.findOne({ title });

        if (postCategory) {
            const error = new Error("Category is already exist");
            return next(error);
        }

        const newPostCategory = new PostCategories({ title: title });

        const savePostCategory = await newPostCategory.save();

        return res.status(201).json(savePostCategory);
    } catch (error) {
        next(error);
    }


}


const getAllPostCategories = async (req, res) => {
    try {

        const postCategories = await PostCategories.find({});

        return res.json(postCategories);
    } catch (error) {

        next(error);
    }
};


const updatePostCategories = async (req, res, next) => {
    try {
        const { title } = req.body;
        const postCategory = await PostCategories.findByIdAndUpdate(
            req.params.postCategoryId, { title }, { new: true }
        )

        if (!postCategory) {
            const error = new Error("Cateogry not found")
            return next(error)
        }

        return res.json(postCategory)

    } catch (error) {
        next(error);
    }
};



const deletePostCategories = async (req, res, next) => {
    try {
        const categoryId = req.params.postCategoryId;

        await PostModel.updateMany(
            { categories: { $in: [categoryId] } },
            { $pull: { categories: categoryId } }
        );

        await PostCategories.deleteOne({ _id: categoryId });

        return res.send({ message: "Category deleted successfully" });

    } catch (error) {
        next(error);
    }
};


export {
    createPostCategory,
    getAllPostCategories,
    updatePostCategories,
    deletePostCategories
};