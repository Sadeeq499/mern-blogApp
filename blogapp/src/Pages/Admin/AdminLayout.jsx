import React from "react";
import Header from "./Components/Header/header";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../Service/index/user";
import { toast } from "react-hot-toast";
import Loader from "../../Components/Loader";

function AdminLayout() {
  //----------------------------states---------------------
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  ///---------------------------------------------------
  const { data, isLoading, error } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.isAdmin) {
        navigate("/");
        toast.error("You are not admin");
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
      navigate("/");
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <Header />
      <main className="flex-1 bg-[#F9F9F9] p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
