import { z } from "zod";

const createAdmin = z.object({
  password: z.string({ required_error: "password is required" }),
  admin: z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
  }),
});

export const userValidation = {
  createAdmin,
};
