"use client";

import { FunctionComponent, PropsWithChildren } from "react";
import { SWRConfig, SWRConfiguration } from "swr";

const config: SWRConfiguration = {
  suspense: true,
};

export const SWRProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <SWRConfig value={config}>{children}</SWRConfig>;
};
