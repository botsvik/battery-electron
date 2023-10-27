import useSWR from "swr";

export const AVAILABLE_PORTS_KEY = "AvailablePorts";

export const useAvailablePorts = () => {
  return useSWR(AVAILABLE_PORTS_KEY, async () => {
    return await window.api.getAvailablePorts();
  });
};
