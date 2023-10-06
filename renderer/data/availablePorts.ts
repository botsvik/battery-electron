import useSWR from "swr";

export const KEY = "AvailablePorts";

export const useAvailablePorts = () => {
  return useSWR(KEY, async () => {
    return await window.api.getAvailablePorts();
  });
};
