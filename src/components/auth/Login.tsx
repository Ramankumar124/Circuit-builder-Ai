import { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/features/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Api from "../../api";
import { LoginFormInputs, loginSchema } from "@/lib/Schemas/authSchemas";
import toast, { Toaster } from "react-hot-toast";

type AuthPage =
  | "login"
  | "register1"
  | "register2"
  | "forgot-password"
  | "otp"
  | "reset-password"
  | "dashboard"
  | "verify-forgot-password"
  | "otp-verifyEmail";
interface LoginProps {
  onPageChange: (page: AuthPage, email?: string) => void;
}

export function Login({ onPageChange }: LoginProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPassword, setIsPassword] = useState(true);

  function passwordToggle() {
    setIsPassword(!isPassword);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await Api.post("/auth/login", data);
      dispatch(setUserData(response.data.data));
      toast.success("Login Succesfull");
      navigate("/home");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster />
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Sign In</h1>
        <p className="text-gray-400 mt-2">
          Welcome back! Please enter your details.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                {...register("credential")}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                placeholder="Enter Username or email"
                required
              />
            </div>
            {errors.credential && (
              <p className=" text-red-500 error-message">
                {errors.credential.message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={isPassword ? "password" : "text"}
                {...register("password")}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                placeholder="Create a password"
              />

            {isPassword ? (
              <Eye
              onClick={passwordToggle}
              className="absolute h-7  w-7 right-3 top-1/2 -translate-y-1/2 text-gray-400 "
              />
            ) : (
              <EyeOff
              onClick={passwordToggle}
              className="absolute h-7  w-7 right-3 top-1/2 -translate-y-1/2 text-gray-400 "
              />
            )}
            </div>
            {errors.password && (
              <p className="text-red-500 error-message">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onPageChange("forgot-password")}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
         {isSubmitting?"Submitting...":"Sign In"}
       {!isSubmitting &&   <ArrowRight className="h-4 w-4" />}
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => onPageChange("register1")}
            className="text-purple-400 hover:text-purple-300"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
