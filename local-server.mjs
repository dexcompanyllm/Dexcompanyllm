import "dotenv/config";
import app, { localListenHost } from "./services/mcp-gateway/src/server.mjs";

const port = Number(process.env.PORT ?? 8787);
const listenHost = localListenHost();

const server = app.listen(port, listenHost, () => {
  if (process.env.NODE_ENV !== "test") {
    console.log(`Dex Company Runtime listening on ${listenHost}:${port}`);
  }
});

export { app, server };
export default app;
