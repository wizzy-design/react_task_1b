import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";

const AdminLoginPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch: authDispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let sdk = new MkdSDK();
    //TODO
    try {
      // Since this an Admin login page, role would be admin
      const response = await sdk.login(data.email, data.password, "admin");
      localStorage.setItem("token", response.token);
      localStorage.setItem("user_id", JSON.stringify(response.user_id));
      localStorage.setItem("role", "admin");
      if (response.token) {
        // Dispatch action to update auth context
        authDispatch({
          type: "LOGIN",
          payload: {
            user: response.user_id,
            token: response.token,
            role: "admin",
          },
        });

        showToast(globalDispatch, "Logged in successfully");
        // Navigate to admin dashboard
        navigate("/admin/dashboard");
      } else {
        setError("api", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      setError("api", {
        type: "manual",
        message: error.message || "Something went wrong. Please try again",
      });
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-8 pt-6 pb-8 mt-8 mb-4 bg-white rounded shadow-md "
      >
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-xs italic text-red-500">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="******************"
            {...register("password")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-xs italic text-red-500">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            value="Sign In"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
