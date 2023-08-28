import React, { useState } from "react";
import { stables } from "../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { createPortal } from "react-dom";
import CropEasy from "./Crop/CropEasy";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../Service/index/user";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/reducer/userReducer";
function ProfilePicture({ avatar }) {
  // ----------------states-------------------------------
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  // --------------------useMutation-------------------------
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile Deleted Successfully");
      setOpenCrop(false);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // -----------------functions ----------------------------------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    console.log(photo);
    setOpenCrop(true);
  };

  const handleDeleteImage = () => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", undefined);
      mutate({ token: userState.userInfo.token, formData: formData });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}
      <div className="flex w-full items-center gap-x-1 p-5">
        <div
          className="relative h-32 w-32  overflow-hidden rounded-full outline outline-offset-2 
      outline-primary "
        >
          <label
            htmlFor="profile"
            className="absolute inset-0 cursor-pointer rounded-full bg-transparent"
          >
            {avatar ? (
              <img
                src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-blue-50/50">
                <HiOutlineCamera className="h-auto w-7 text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            id="profile"
          />
        </div>
        <button
          type="button"
          onClick={handleDeleteImage}
          className="mx-5 rounded-lg border border-red-500 px-2 py-2 text-red-500"
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default ProfilePicture;
