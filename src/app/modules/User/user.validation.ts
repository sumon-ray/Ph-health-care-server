import { z } from "zod";

const createAdmin = z.object({
  password: z.string({ required_error: "password is required" }),
  admin: z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
  }),
});

// doctor

// Enum validation
const genderEnum = z.enum(["MALE", "FEMALE"]);

export const createDoctor = z.object({
  password: z.string({ required_error: "password is required" }),

  doctor: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
    profilePhoto: z.string().url("Must be a valid URL").optional(),
    contactNumber: z.string({ required_error: "Contact number is required" }),
    address: z.string().optional(),
    registrationNumber: z.string({
      required_error: "Registration number is required",
    }),
    experience: z.number().optional(),
    gender: genderEnum,
    appointmentFee: z.number({
      required_error: "Appointment fee must be a non-negative number",
    }),
    qualification: z.string({ required_error: "Qualification is required" }),
    currentWorkingPlace: z.string({
      required_error: "Current working place is required",
    }),
    designation: z.string({ required_error: "Designation is required" }),
  }),
});

const createPatient = z.object({
  password: z.string({ required_error: "password is required" }),
  patient: z.object({
    name: z.string({ required_error: "name is required" }),
    email: z
      .string({ required_error: "email is required" })
      .email("Invalid email format"),
    profilePhoto: z.string().url("must be a valid url").optional(),
    contactNumber: z.string({ required_error: "contact number is required" }),
    address: z.string({ required_error: "address is required" }),
    isDeleted: z.boolean({ required_error: "this field is required" }),
  }),
});

export const userValidation = {
  createAdmin,
  createDoctor,
  createPatient,
};
