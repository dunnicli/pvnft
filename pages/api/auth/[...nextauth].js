import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");

export default NextAuth({
  session: { jwt: true },

  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token.uid = user.id;
        token.admin = user.admin;
      }
      return Promise.resolve(token);
    },

    session: async (session, user) => {
      session.user.uid = user.uid;
      session.user.admin = user.admin;
      return Promise.resolve(session);
    },
  },

  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    //
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        //const user = { id: 2, name: "John D", email: "dunnicli@gmail.com" };
        ///***
        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
            //password: credentials.password,
          },
        });
        //// *****
        if (bcrypt.compareSync(credentials.password, user.passwordHash)) {
          //if (user.password === credentials.password) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),

    //
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
});

////
