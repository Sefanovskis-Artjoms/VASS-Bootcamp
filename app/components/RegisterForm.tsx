"use client";

import { UserPlusIcon } from "@heroicons/react/20/solid";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IResponse } from "@/types";

export default function LoginForm({
  onRegisterAction,
}: {
  onRegisterAction: (data: {
    name: string;
    surname: string;
    username: string;
    password: string;
    repeatPassword: string;
  }) => Promise<IResponse>;
}) {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onFormSubmit = async (data: {
    name: string;
    surname: string;
    username: string;
    password: string;
    repeatPassword: string;
  }) => {
    startTransition(async () => {
      if (data.password !== data.repeatPassword) {
        setError("repeatPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
      const response: IResponse = await onRegisterAction(data);

      if (!response.success && response.error?.type === "FORM") {
        if (response.error?.field === "username") {
          setError("username", {
            type: "manual",
            message: response.error.message,
          });
          return;
        }
        if (response.error.field === "password") {
          setError("password", {
            type: "manual",
            message: response.error.message,
          });
          return;
        }
        if (response.error.field === "repeatPassword") {
          setError("repeatPassword", {
            type: "manual",
            message: response.error.message,
          });
          return;
        }
      }

      setFormError(
        response.error?.message ??
          "Unexpected error occured while registering, please try again later"
      );
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-200 rounded-lg shadow-md border border-slate-500">
      <div className="mt-6 mb-6 flex items-center justify-center relative">
        <h2 className="text-2xl font-bold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
          Register
        </h2>
        <a
          href="/login"
          className="absolute right-0 border border-slate-500 px-4 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-gray-600 hover:text-slate-50"
        >
          Back
        </a>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            {...register("name", {
              required: "Please enter your name",
            })}
            type="text"
            id="name"
            name="name"
            placeholder="John"
            className={`mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-slate-50 
            ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="surname"
            className="block text-sm font-medium text-gray-700"
          >
            Surname:
          </label>
          <input
            {...register("surname", {
              required: "Please enter your surname",
            })}
            type="text"
            id="surname"
            name="surname"
            placeholder="Doe"
            className={`mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-slate-50 
            ${errors.surname ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.surname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.surname.message}
            </p>
          )}
        </div>
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
              minLength: {
                value: 5,
                message: "Username must be at least 5 characters long",
              },
            })}
            type="text"
            id="username"
            name="username"
            placeholder="johndoe123"
            className={`mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-slate-50 
            ${errors.username ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            type="password"
            id="password"
            name="password"
            placeholder="********"
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
        <div className="mb-6">
          <label
            htmlFor="repeatPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Repeat Password:
          </label>
          <input
            {...register("repeatPassword", {
              required: "Please repeat your password",
            })}
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            placeholder="********"
            className={`mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-slate-50 
            ${errors.repeatPassword ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.repeatPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="mb-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-50 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}{" "}
          <UserPlusIcon className="ml-2 h-5 w-5" />
        </button>

        {formError && <p className="text-red-500 text-sm mt-1">{formError}</p>}
      </form>
    </div>
  );
}
