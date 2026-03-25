import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerOwnerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerProviderSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    businessName: z.string().min(2, "Business name must be at least 2 characters"),
    location: z.string().min(2, "Location is required"),
    phone: z.string().optional(),
    description: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const boatSchema = z.object({
  name: z.string().min(1, "Boat name is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  loa: z.number().optional(),
  beam: z.number().optional(),
  draft: z.number().optional(),
  hullType: z.string().optional(),
  engineType: z.string().optional(),
  registrationNumber: z.string().optional(),
  homePort: z.string().optional(),
  estimatedValue: z.number().optional(),
});

export const serviceRequestSchema = z.object({
  boatId: z.string().min(1, "Boat is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  urgency: z.enum(["LOW", "NORMAL", "HIGH", "EMERGENCY"]).default("NORMAL"),
  providerId: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterOwnerInput = z.infer<typeof registerOwnerSchema>;
export type RegisterProviderInput = z.infer<typeof registerProviderSchema>;
export type BoatInput = z.infer<typeof boatSchema>;
export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
