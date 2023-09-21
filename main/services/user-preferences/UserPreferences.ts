import path from "node:path";
import { Rectangle, app } from "electron";
import Store from "electron-store";
import orderBy from "lodash/orderBy";

export type RecentDocument = {
  title: string;
  path: string;
  pinned: boolean;
  timestamp: number;
};

type UserPreferencesType = {
  recentDocuments: Array<Omit<RecentDocument, "title">>;
  mainWindowRect: Rectangle;
};

const STORE_NAME = "BatteryAppUserPreferences";
const store = new Store<UserPreferencesType>({ name: STORE_NAME });

export class UserPreferences {
  static async getRecentDocuments() {
    const recentDocuments = store.get("recentDocuments", []).map<RecentDocument>((x) => ({
      ...x,
      title: path.basename(x.path, path.extname(x.path)),
    }));

    return orderBy(recentDocuments, (item) => item.timestamp, "desc");
  }

  static async addRecentDocument(filepath: string) {
    // Add to os managed
    app.addRecentDocument(filepath);

    // Add to app managed
    const recentDocuments = store.get("recentDocuments", []);
    const existsAtIndex = recentDocuments.findIndex(
      (recentDocument) => recentDocument.path === filepath,
    );
    if (existsAtIndex !== -1) recentDocuments.splice(existsAtIndex, 1);
    recentDocuments.push({
      path: filepath,
      pinned: false, // For future use
      timestamp: Date.now(),
    });
    store.set("recentDocuments", recentDocuments);
  }

  static async removeRecentDocument(path: string) {
    const recentDocuments = store.get("recentDocuments", []);
    const existsAtIndex = recentDocuments.findIndex(
      (recentDocument) => recentDocument.path === path,
    );
    if (existsAtIndex !== -1) {
      recentDocuments.splice(existsAtIndex, 1);
      store.set("recentDocuments", recentDocuments);
    }
  }

  static async getMainWindowRect() {
    return store.get("mainWindowRect");
  }

  static async setMainWindowRect(rect: Rectangle) {
    store.set("mainWindowRect", rect);
  }
}
