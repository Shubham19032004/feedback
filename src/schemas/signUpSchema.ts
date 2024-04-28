import { string, z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "UserName must be atleast 2 characters")
  .max(10, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special character")


export  const signUpSchema=z.object({
    username:string(),
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(6,{message:"password must be at least 6 character"})
})