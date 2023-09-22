import useSWR, { mutate } from "swr";

const KEY = "recentDocuments";
type Data = Awaited<ReturnType<typeof window.api.getRecentDocuments>>;

export const removeRecentDocument = (path: string) => {
  mutate<Data>(
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

export const pinRecentDocument = (path: string) => {
  // TODO: implement
};

export const useRecentDocuments = () => {
  const swr = useSWR(KEY, async () => {
    return await window.api.getRecentDocuments();
  });

  return { ...swr, removeRecentDocument, pinRecentDocument };
};
