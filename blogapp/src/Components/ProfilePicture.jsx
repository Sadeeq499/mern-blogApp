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
      <div className="w-full flex items-center p-5 gap-x-1">
        <div
          className="relative w-32 h-32  rounded-full outline outline-offset-2 outline-primary 
      overflow-hidden "
        >
          <label
            htmlFor="profile"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {avatar ? (
              <img
                src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
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
          className="border border-red-500 rounded-lg px-2 py-2 mx-5 text-red-500"
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default ProfilePicture;
