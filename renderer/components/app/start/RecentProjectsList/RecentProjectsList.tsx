import { FunctionComponent, HTMLAttributes } from "react";

import { Input } from "@renderer/components/ui";
import { RecentProjectsListItem } from "./RecentProjectsListItem";

type RecentProjectsListProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  count?: number;
};
export const RecentProjectsList: FunctionComponent<RecentProjectsListProps> = ({
  title,
  count,
  ...rest
}) => {
  return (
    <div {...rest}>
      <Input placeholder="Search recent projects" className="mb-2" />
      <ul className="">
        <RecentProjectsListItem
          title="Giorgi Botsvadze's Lexus ct200h"
          path="C:\Users\Giorgi Botsvadze\BatteryApp\Giorgi Botsvadze's Lexus ct200h.badb"
        />
        <RecentProjectsListItem
          title="Toyota Prius C"
          path="C:\Users\Giorgi Botsvadze\BatteryApp\Toyota Prius C.badb"
        />
        <RecentProjectsListItem
          title="Jemalas Manqana"
          path="C:\Users\Giorgi Botsvadze\BatteryApp\Jemalas Manqana.badb"
        />
      </ul>
    </div>
  );
};
