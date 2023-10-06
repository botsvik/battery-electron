import useSWR, { mutate } from "swr";
import { RecentDocument } from "@main/services/user-preferences";

export const KEY = "RecentDocuments";

/**
 *
 * @param path
 * @returns
 */
export const removeRecentDocument = async (path: string) => {
  return await mutate<RecentDocument[]>(
    KEY,
    async (data) => {
      await window.api.removeRecentDocument(path);
      return data;
    },
    {
      optimisticData: (data) => {
        if (!data) return [];

        const existsAtIndex = data.findIndex((rd) => rd.path === path);
        if (existsAtIndex === -1) return data;
        data.splice(existsAtIndex, 1);

        return [...data];
      },
    },
  );
};

/**
 *
 * @param path
 */
export const pinRecentDocument = (path: string) => {
  // TODO: implement
};

/**
 * 
 * @param path 
 */
export const unpinRecentDocument = (path: string) => {
  // TODO: implement
};

/**
 *
 * @returns
 */
export const useRecentDocuments = () => {
  return useSWR(KEY, async () => {
    return await window.api.getRecentDocuments();
  });
};
