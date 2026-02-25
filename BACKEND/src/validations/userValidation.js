import { z } from "zod"

const registerSchema = z.object({
    name: z.string({ required_error: "Name should not be empty" }).min(3, "Name must be atleast 3 characters"),
    email: z.string({ required_error: "Email should not be empty" }).email("Invalid email format").toLowerCase(),
    password: z.string().min(6, "Password must be atleast 6 characters")
})

export { registerSchema }