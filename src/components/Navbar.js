import React, { useState } from "react";
import { Globe } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-[#7366e3] shadow-md">
      {/* Left: Logo & Title */}
      <div className="flex items-center space-x-3">
        <Globe size={32} className="text-white" />
        <h1 className="text-2xl font-bold text-white">Globetrotter</h1>
      </div>

      {/* Right: Auth Section */}
      <div>
        {session ? (
          <div className="flex items-center space-x-4">
            <p className="text-white font-medium hidden sm:block">
              Welcome, {session.user.name}
            </p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-white text-[#7366e3] hover:bg-[#5a4cd1] hover:text-white px-4 py-2 rounded-lg transition-all font-medium shadow"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;