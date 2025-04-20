import { Server } from "http";
import app from "./app";
import config from "./config";
const port = config.port;
async function main() {
  const server: Server = app.listen(port, () => {
    console.log("app is listening on port", port);
  });
}

main();

// সংক্ষেপে বললে:
// 👉 main() async function এর মাধ্যমে তুমি:

// Future async কাজ করার সুযোগ তৈরি করো

// Error handling সহজ করো

// কোডকে গুছিয়ে ও clean রাখো
