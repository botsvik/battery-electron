import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Rectangle,
  screen,
} from "electron";
import Store from "electron-store";

import getWindowRect from "./get-window-rect";

const STORE_NAME = "BatteryAppStore";
const WINDOW_RECT_KEY = "WindowRect";
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 728;

const createWindow = (
  name: string,
  options: BrowserWindowConstructorOptions
) => {
  const key = WINDOW_RECT_KEY + "." + name;

  if (!options.width) options.width = DEFAULT_WIDTH;
  if (!options.height) options.height = DEFAULT_HEIGHT;

  const store = new Store({ name: STORE_NAME });
  const state = store.get(key, undefined) as Rectangle | undefined;

  if (state) {
    const visible = screen
      .getAllDisplays()
      .some(
        ({ bounds }) =>
          state.x >= bounds.x &&
          state.y >= bounds.y &&
          state.x + state.width <= bounds.x + bounds.width &&
          state.y + state.height <= bounds.y + bounds.height
      );

    if (!visible) {
      const bounds = screen.getPrimaryDisplay().bounds;
      state.x = (bounds.width - options.width) / 2;
      state.y = (bounds.height - options.height) / 2;
    }
  }

  const window = new BrowserWindow({
    ...options,
    ...state,
  });

  window.on("resized", () => {
    store.set(key, getWindowRect(window));
  });

  window.on("moved", () => {
    store.set(key, getWindowRect(window));
  });

  return window;
};

export default createWindow;
