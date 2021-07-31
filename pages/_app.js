import { createClient } from "@liveblocks/client";
import { LiveblocksProvider } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks",
});

function MyApp({ Component, pageProps }) {
  return (
    <LiveblocksProvider client={client}>
      <Component {...pageProps} />
    </LiveblocksProvider>
  );
}

export default MyApp;