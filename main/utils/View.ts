import path from "node:path";
import { URLSearchParams } from "node:url";
import serve from "electron-serve";

import { isDev } from "./isDev";

const PROTOCOL = isDev ? "http" : "app";
const HOSTNAME = isDev ? "localhost" : "-";
const PORT = isDev ? 8080 : 80;

export class View {
  static serve() {
    if (!isDev) serve({ directory: path.join(__dirname, "../../renderer") });
  }

  static url(view: string, params?: ConstructorParameters<typeof URLSearchParams>[0]) {
    if (!isDev) {
      view += ".html";
    }

    let query = "";
    if (params) {
      query = "?" + new URLSearchParams(params).toString();
    }

    return `${PROTOCOL}://${HOSTNAME}:${PORT}/${view}${query}`;
  }
}
