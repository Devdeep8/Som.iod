import { DefaultSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer"; // Import Nodemailer to send emails
import { db } from "@/lib/db";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        try {
          // Define Nodemailer transport for sending emails
          const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io", // Extract host from EMAIL_SERVER
            port: 2525, // Extract port from EMAIL_SERVER
            auth: {
              user:"49e7d0e133de32", // Extract user from EMAIL_SERVER
              pass: "c43f49cd8c379f", // Extract pass from EMAIL_SERVER
            },
          });

          const result = await transport.sendMail({
            to: identifier,
            from: provider.from,
            subject: "Your sign-in link for...",
            text: `Sign in to your account using this link: ${url}`,
            html: `<p>Sign in to your account using <a href="${url}">this link</a></p>`,
          });

          if (result.rejected.length) {
            throw new Error(`Failed to send verification email to ${identifier}`);
          }

          console.log("Verification email sent to:", identifier);
        } catch (error) {
          console.error("Error sending verification email:", error);
          throw new Error("Failed to send verification email");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role as Role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
};

// Types
enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
