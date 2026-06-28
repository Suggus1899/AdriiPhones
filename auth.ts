import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // MVP: Hardcoded admin credentials for phase 1.
        // In a real scenario, this would query the DB.
        if (credentials?.email === "admin@iphonizatechabal.es" && credentials?.password === "admin123") {
          return { id: "1", name: "Admin", email: "admin@iphonizatechabal.es", role: "ADMIN" }
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
