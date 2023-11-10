import { signIn } from "@/services/auth.service"
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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await signIn({ payload: credentials })
        if (user.code === 200) {
          return user
        } else {
          throw new Error(user.message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.data?.accessToken
        token.accessTokenExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
        token.user = user?.data?.user
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user
        session.accessToken = token.accessToken
        session.accessTokenExpires = token.accessTokenExpires
      }
      return session
    },
  },
}

export default authOptions