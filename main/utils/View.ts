import path from "path";
import serve from "electron-serve";

import { isDev } from "./isDev";

export class View {
  static serve() {
    if (!isDev) serve({ directory: path.join(__dirname, "../../renderer") });
  }

  static url(view: string) {
    return isDev ? `http://localhost:8080/${view}` : `app://-/${view}.html`;
  }
}
