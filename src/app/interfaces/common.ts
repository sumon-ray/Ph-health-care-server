import { UserRole } from "@prisma/client";

export type TAuth = {
    email:string;
    role: UserRole
} | null;