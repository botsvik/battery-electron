import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Rectangle,
  screen,
} from "electron";
import Store from "electron-store";

import getWindowRect from "./get-window-rect";

const STORE_KEY = "window-state";
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 728;

const createWindow = (
  name: string,
  options: BrowserWindowConstructorOptions
) => {
  if (!options.width) options.width = DEFAULT_WIDTH;
  if (!options.height) options.height = DEFAULT_HEIGHT;

  const store = new Store<Rectangle>({ name: `${STORE_KEY}-${name}` });
  const state = store.get(STORE_KEY, undefined) as Rectangle | undefined;

  if (state) {
    const visible = screen.getAllDisplays().some(({ bounds }) => {
      return (
        state.x >= bounds.x &&
        state.y >= bounds.y &&
        state.x + state.width <= bounds.x + bounds.width &&
        state.y + state.height <= bounds.y + bounds.height
      );
    });

    if (!visible) {
      const bounds = screen.getPrimaryDisplay().bounds;
      state.x = (bounds.width - options.width) / 2;
      state.y = (bounds.height - options.height) / 2;
    }
  }

  const window = new BrowserWindow({
    ...state,
    ...options,
  });

  window.on("move", () => {
    store.set(STORE_KEY, getWindowRect(window));
  });

  window.on("close", () => {
    if (!window.isMinimized() && !window.isMaximized()) {
      store.set(STORE_KEY, getWindowRect(window));
    }
  });

  return window;
};

export default createWindow;
