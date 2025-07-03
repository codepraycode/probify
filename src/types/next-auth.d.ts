import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//     interface Session extends DefaultSession {
//         user: {
//             id: string;
//         } & DefaultSession["user"];
//     }
// }

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // name: string;
      // email: string;
      // image?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}
