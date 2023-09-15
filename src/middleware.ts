import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role

      if (req.nextUrl.pathname === "/admin") {
        return token?.role === "admin";
      }
      return !!token;
    },
  },
});

export const config = { matcher: ["/admin", "/me"] };
