import z from "zod"

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

export const signupSchema = z.object({
    
    username : z.string().min(3, { message: 'Must have at least 3 character' }).max(20, { message: 'Username cannot have more than 20 character' }).trim().toLowerCase(),

    password : z.string().min(3, { message: 'Must have at least 8 character' }).max(30, { message: 'Password cannot have more than 30 character' })
    // .regex(passwordValidation, {message: 'Your password is not valid',})
    .trim(),

    name : z.string().min(1, { message: 'Must have at least 1 character' }).trim()
})

export const signinSchema = z.object({
  username : z.string().trim().min(3),
  password : z.string().trim().min(3)
})

