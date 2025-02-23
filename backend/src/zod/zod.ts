import z from "zod"

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

export const UserSchema = z.object({
    
    username : z.string().min(1, { message: 'Must have at least 1 character' }).email({
      message: 'Must be a valid email',
    }).trim().toLowerCase(),

    password : z.string().min(1, { message: 'Must have at least 1 character' }).regex(passwordValidation, {
      message: 'Your password is not valid',
    }),

    name : z.string().min(1, { message: 'Must have at least 1 character' })
})



