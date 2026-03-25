import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "OWNER" | "PROVIDER" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User {
    role: "OWNER" | "PROVIDER" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "OWNER" | "PROVIDER" | "ADMIN";
  }
}
