import "@/styles/globals.css";
import Countdown from "@/nationals/countdown";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <>
      {!isHome && <Countdown />}
      <Component {...pageProps} />
    </>
  );
}
