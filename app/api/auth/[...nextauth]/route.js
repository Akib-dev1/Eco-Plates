import { loginUser } from "@/app/(user side)/(auth side)/actions/auth/loginAdmin";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await loginUser(credentials);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        session.user.name = token.userName;
        session.user.role = token.role;
        session.user.householdSize = token.householdSize;
        session.user.location = token.location;
        session.user.dietaryPreferences = token.dietaryPreferences;
        session.user.budgetLimit = token.budgetLimit;
        session.user.createdAt = token.createdAt;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.userName = user.name;
        token.role = user.role;
        token.householdSize = user.householdSize;
        token.location = user.location;
        token.dietaryPreferences = user.dietaryPreferences;
        token.budgetLimit = user.budgetLimit;
        token.createdAt = user.createdAt;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
