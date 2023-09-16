import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

interface GoogleProviderTy {
  clientId: string;
  clientSecret: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    } as GoogleProviderTy),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    } as GoogleProviderTy),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile: any) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          role: profile.role ?? "user",
          image: profile.picture,
        };
      },
    } as GoogleProviderTy),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Elektron pochta",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "parol",
        },
      },
      async authorize(credentials) {
        // const res = await makeRequest("/api/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   data: JSON.stringify({
        //     username: credentials?.username,
        //     password: credentials?.password,
        //   }),
        // });

        // if (res) {
        //   return res;
        // } else {
        //   return null;
        // }
        const user = {
          id: "42",
          name: "test",
          password: "test",
          role: "admin",
        };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token, user, account, profile, session }: any) {
      // console.log("user", user);
      // console.log("session", session);
      // console.log("token", token);
      // console.log("account", account);
      // console.log("profile", profile);
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ token,  user, account, profile, isNewUser, session }: any) {
      session.user.role = token.role;
      // const response = async () => {
      //   if (!token.accessToken) {
      //     const data = await makeRequest("/api/auth/userExists", {
      //       method: "POST",
      //       data: { email: session?.user?.email },
      //     });
      //     return data;
      //   }
      //   return null;
      // };

      // const data = await response();
      // console.log(data);

      // session.user = token;
      // session.user = data === null ? token : (data as any);
      return session;
    },
  },
};
