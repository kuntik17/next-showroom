import { useEffect } from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import UserProvider from "../context/UserProvider";
import SharedProvider from "../context/SharedProvider";
import ProductProvider from "../context/ProductProvider";
import CommentProvider from "../context/CommentProvider";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import HeaderBar from "../Components/HeaderBar/HeaderBar";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const router = useRouter();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    let token = getCookie("token");
    if (token === null || token === undefined) {
      router.push("/login");
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <SharedProvider>
        <UserProvider>
          <CommentProvider>
            <ProductProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <HeaderBar />
                <Component {...pageProps} />
              </ThemeProvider>
            </ProductProvider>
          </CommentProvider>
        </UserProvider>
      </SharedProvider>
    </CacheProvider>
  );
}
