import React, { useEffect } from "react";
import MainLayout from "../../Components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../../Service/index/user";
import ProfilePicture from "../../Components/ProfilePicture";
import { userActions } from "../../store/reducer/userReducer";
import { toast } from "react-hot-toast";

function ProfilePage() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile Uploaded Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
      name: profileIsLoading ? "" : profileData?.name,
      email: profileIsLoading ? "" : profileData.email,
    },
    mode: "onChange",
  });

  // useEffect Function
  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <>
      <MainLayout>
        <section className="container mx-auto px-5 py-5">
          <div className="mx-auto w-full max-w-sm ">
            <ProfilePicture avatar={profileData?.avatar} />
            <form onSubmit={handleSubmit(submitHandler)}>
              {/* name */}
              <div className="mb-6 flex w-full flex-col">
                <label
                  htmlFor="name"
                  className="block font-semibold text-[#5a7184]"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  // validation
                  {...register("name", {
                    minLength: {
                      value: 3,
                      message: "Name must be atleast 3 characters long ",
                    },
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                  placeholder="Enter Name"
                  className={`mt-3 block rounded-lg  border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead]            
                  ${errors.name ? "border-red-700" : "border-[#c3cad9]"}`}
                />
                {errors.name?.message && (
                  <p className="mt-1 text-xs text-red-700">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              {/* -----------------email-------------------------------------- */}
              <div className="mb-6 flex w-full flex-col">
                <label
                  htmlFor="email"
                  className="block font-semibold text-[#5a7184]"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Enter a valid email",
                    },
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  placeholder="Enter Your Email"
                  className={`mt-3 block rounded-lg  border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead]            
                  ${errors.email ? "border-red-700" : "border-[#c3cad9]"}`}
                />
                {errors.email?.message && (
                  <p className="mt-1 text-xs text-red-700">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              {/* -------------------------password------------------------------------ */}
              <div className="mb-6 flex w-full flex-col">
                <label
                  htmlFor="password"
                  className="block font-semibold text-[#5a7184]"
                >
                  New Password (Optional)
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter New Password"
                  className={`mt-3 block rounded-lg  border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead]            
                  ${errors.email ? "border-red-700" : "border-[#c3cad9]"}`}
                />
                {errors.password?.message && (
                  <p className="mt-1 text-xs text-red-700">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              {/* ---------------------Links----------buttons--------------------- */}

              <button
                type="submit"
                disabled={!isValid || profileIsLoading == true}
                className="my-6 w-full bg-primary px-8 py-4 text-lg font-bold text-white
                disabled:cursor-not-allowed disabled:opacity-70
                "
              >
                Update Profile
              </button>
            </form>
          </div>
        </section>
      </MainLayout>
    </>
  );
}

export default ProfilePage;
