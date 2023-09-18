import { Rectangle } from "electron";
import Store from "electron-store";
import orderBy from "lodash/orderBy";

const STORE_NAME = "BatteryAppUserPreferences";

export type RecentProject = {
  path: string;
  pinned: boolean;
  timestamp: number;
};

export type UserPreferences = {
  recentProjects: Array<RecentProject>;
  mainWindowRect: Rectangle;
};

export class UserPreferencesService {
  private readonly _store = new Store<UserPreferences>({ name: STORE_NAME });

  constructor() {}

  getRecentProjects() {
    const recentProjects = this._store.get("recentProjects", []);
    return orderBy(recentProjects, (item) => item.timestamp, "desc");
  }

  addRecentProject(path: string) {
    const recentProjects = this._store.get("recentProjects", []);
    const existsAtIndex = recentProjects.findIndex((recentProject) => recentProject.path === path);
    if (existsAtIndex !== -1) recentProjects.splice(existsAtIndex, 1);
    recentProjects.push({ path, pinned: false, timestamp: Date.now() });
    this._store.set("recentProjects", recentProjects);
  }

  removeRecentProject(path: string) {
    const recentProjects = this._store.get("recentProjects", []);
    const existsAtIndex = recentProjects.findIndex((recentProject) => recentProject.path === path);
    if (existsAtIndex !== -1) recentProjects.splice(existsAtIndex, 1);
  }

  getMainWindowRect() {
    return this._store.get("mainWindowRect");
  }

  setMainWindowRect(rect: Rectangle) {
    this._store.set("mainWindowRect", rect);
  }
}
