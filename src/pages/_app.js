import "@/styles/globals.css";
import BubbleEffect from "@/components/ui/bubble_effect";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <BubbleEffect />
      </div>
      <div className="relative z-10">
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
      </div>
    </div>
  );
}

export default MyApp;