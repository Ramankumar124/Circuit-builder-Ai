import { z } from "zod";


// Schema for Step 1 (Only email and password)
export const register1FormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    // name: z.string().min(2, "Name must be at least 2 characters"),
    // bio: z.string().min(5, "Bio must be at least 5 characters long"),
    // avatar: z.any().optional(),
  })

export const register2FormSchema =z.object({
    fullName: z.string().min(2, "full Name must be at least 2 characters"),
    userName: z.string().min(5, "User Name must be at least 5 characters long"),
    avatar: z
      .any()  
      .refine((file) => file?.length > 0, "File is required")
      .refine(
        (files) => files?.[0] && files[0].size < 2 * 1024 * 1024,
        "File size must be less than 2MB"
      )
      .refine(
        (files) => files?.[0] && ["image/png", "image/jpeg"].includes(files[0].type),
        "Only PNG and JPEG files are allowed"
      )
})
export const loginSchema = z.object({
  credential: z
    .string({ required_error: "Email or Username is required" })
    .refine(
      (value) =>
        value.includes("@")
          ? z.string().email().safeParse(value).success
          : value.length >= 5,
      {
        message: "Enter a valid email or username (username must be at least 5 characters)",
      }
    ),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});
export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "password required" })
    .email({ message: "Invalid email" }),
});
export const otpSchema = z.object({
  otp: z
    .string({ required_error: "Otp is required" })
    .min(6, { message: "Enter your 6 digit otp " }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
export type ForgotPasswordInputs = z.infer<typeof ForgotPasswordSchema>;

export type OtpInput = z.infer<typeof otpSchema>;
