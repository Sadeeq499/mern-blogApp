import React, { useEffect } from "react";
import MainLayout from "../../Components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../Service/index/user";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducer/userReducer";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signUp({ name, email, password });
    },
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(userActions.setUserInfo(data));
      // save the data in localstorage
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      ConfirmPassword: "",
    },
    mode: "onChange",
  });

  // useEffect Function
  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const password = watch("password");

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <>
      <MainLayout>
        <section className="container mx-auto px-5 py-5">
          <div className="w-full max-w-sm mx-auto ">
            <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit(submitHandler)}>
              {/* name */}
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="name"
                  className="text-[#5a7184] font-semibold block"
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
                  className={`placeholder:text-[#959ead] text-dark-hard mt-3  rounded-lg px-5 py-4 font-semibold block outline-none border            
                  ${errors.name ? "border-red-700" : "border-[#c3cad9]"}`}
                />
                {errors.name?.message && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              {/* -----------------email-------------------------------------- */}
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="email"
                  className="text-[#5a7184] font-semibold block"
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
                  className={`placeholder:text-[#959ead] text-dark-hard mt-3  rounded-lg px-5 py-4 font-semibold block outline-none border            
                  ${errors.email ? "border-red-700" : "border-[#c3cad9]"}`}
                />
                {errors.email?.message && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              {/* -------------------------password------------------------------------ */}
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="password"
                  className="text-[#5a7184] font-semibold block"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: "Password must be atleast 6 characters long ",
                    },
                    required: {
                      value: true,
                      message: "password is required",
                    },
                  })}
                  placeholder="Enter Password"
                  className={`placeholder:text-[#959ead] text-dark-hard mt-3  rounded-lg px-5 py-4 font-semibold block outline-none border            
                  ${errors.email ? "border-red-700" : "border-[#c3cad9]"}`}
                />
                {errors.password?.message && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              {/* -----------------------confirm Password----------------------------------------------- */}
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="ConfirmPassword"
                  className="text-[#5a7184] font-semibold block"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="ConfirmPassword"
                  {...register("ConfirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm password is required",
                    },
                    validate: (value) => {
                      if (value !== password) {
                        return "Password do not match";
                      }
                    },
                  })}
                  placeholder=" Enter Confirm Password"
                  className={`placeholder:text-[#959ead] text-dark-hard mt-3  rounded-lg px-5 py-4 font-semibold block outline-none border            
                  ${
                    errors.ConfirmPassword
                      ? "border-red-700"
                      : "border-[#c3cad9]"
                  }`}
                />
              </div>
              {errors.ConfirmPassword?.message && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.ConfirmPassword?.message}
                </p>
              )}

              {/* ---------------------Links----------buttons--------------------- */}

              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="bg-primary text-white font-bold text-lg py-4 px-8 w-full my-6
                disabled:opacity-70 disabled:cursor-not-allowed
                "
              >
                Register
              </button>

              <p className="text-sm font-semibold text-[#5a7184]">
                You have an account?
                <Link to="/login" className=" px-2 text-primary">
                  Login now
                </Link>
              </p>
            </form>
          </div>
        </section>
      </MainLayout>
    </>
  );
}

export default RegisterPage;
