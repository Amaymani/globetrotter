import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import connectDB from "@/lib/mongo";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),


  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    
    async signIn({ account, profile }) {
      await connectDB();
       let user= await User.findOne({ email: profile.email });
      if (!user) {
        user = await User.create({
          username: profile.name,
          email: profile.email,
        });}
      
      return true;
    },

    async session({ session, token, user }) {
      await connectDB();

      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id;
        session.user.username = dbUser.username || null; // If username exists
      }
      
      return session;
    },
  },
});
