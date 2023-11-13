import { login } from "@/services/auth.service"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await login({
          payload: {
            username: credentials?.username,
            password: credentials?.password,
          },
        })
        if (user?.message) {
          throw new Error(user.message)
        } else {
          return user
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.token
        token.accessTokenExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken
        session.accessTokenExpires = token.accessTokenExpires
      }
      return session
    },
  },
}

export default authOptions
