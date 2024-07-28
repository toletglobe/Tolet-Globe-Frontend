/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../store/authSlice.js';
import { Button, Input } from '../index.js';
import authService from "../../appwrite/auth.js";
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
         
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
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
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
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
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
