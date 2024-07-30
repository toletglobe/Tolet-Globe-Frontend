/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../index.js";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  // const login = async (data) => {
  //   setError('');
  //   try {
  //     const session = await authService.login(data);
  //     if (session) {
  //       const userData = await authService.getCurrentUser();
  //       if (userData) dispatch(authLogin(userData));
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  console.log("Login");

  return (
    
    <div className="flex items-center justify-center w-full h-[80vh]">
      <div
        className={`mx-auto w-full max-w-lg bg-black rounded-xl p-10 border text-white border-white`}
      >
        <div className="mb-2 flex justify-center"></div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit("login")} className="mt-8">
          <div className="space-y-5">
            <div>
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
           
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <div className="flex justify-center mt-5 mx-auto px-auto w-full">
              <Button
                type="submit"
                className="flex justify-center mt-2 bg-teal-500 rounded-md w-full py-1"
              >
                Sign in
              </Button>
            </div>
            <p className="mt-5 text-center text-base ">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
