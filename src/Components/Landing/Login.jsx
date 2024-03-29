import React from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [remember, setRemember] = useState(true);

  const apiClient = axios.create({
    baseURL: "http://yavoy.test",
    withCredentials: true,
  });

  apiClient.get('/sanctum/csrf-cookie')
    .then(response => {
        apiClient.post('/api/v1/user/login', {
            email: email,
            password: password
        }).then(response => {
            console.log(response)
        })
    });

 

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                onChange={(el) => setEmail(el.target.value)}
                id="email-address"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={(el) => setPassword(el.target.value)}
                id="password"
                value={password}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                onChange={() => setRemember(true)}
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              onClick={handleLogin}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-orange-500 group-hover:text-orange-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
