import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(5)
  .max(100)
  // must contain at least one number,one uppercase letter and one special character
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,{
    message: "Password must contain at least one number, one lowercase and one uppercase letter and one special character",
  })
  .transform((str) => str.trim())

// Add role string that can either be USER, LAWYER or ADMIN
export const role = z
  .string()
  .min(3)
  .max(10)
  .transform((str) => str.trim())

export const Signup = z.object({
  email,
  password,
  role,
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
