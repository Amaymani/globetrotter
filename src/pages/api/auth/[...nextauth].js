import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      
      session.user.username = token.username;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // Set username from Google profile (or customize it)
      if (profile) {
        token.username = profile.name.toLowerCase().replace(/\s/g, ""); // Example: Convert "John Doe" → "johndoe"
      }
      return token;
    },
  },
});
