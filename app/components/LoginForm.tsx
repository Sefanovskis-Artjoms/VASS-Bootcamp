"use client";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm({
  onLoginAction,
}: {
  onLoginAction: (username: string, password: string) => void;
}) {
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onFormSubmit = async (data: { username: string; password: string }) => {
    try {
      onLoginAction(data.username, data.password);
    } catch {
      setFormError("Invalid username or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-200 rounded-lg shadow-md border border-slate-500">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username:
          </label>
          <input
            {...register("username", {
              required: "Please enter your username",
            })}
            type="text"
            id="username"
            name="username"
            className={`mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-slate-50 
            ${errors.username ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            {...register("password", {
              required: "Please enter your password",
            })}
            type="password"
            id="password"
            name="password"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-slate-50 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-50 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          LOG-IN <ArrowRightEndOnRectangleIcon className="ml-2 h-5 w-5" />
        </button>
        {formError && <p className="text-red-500 text-sm mt-1">{formError}</p>}
      </form>
    </div>
  );
}
