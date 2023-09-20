import { FunctionComponent, MouseEventHandler } from "react";
import { IconX } from "@tabler/icons-react";

import { Button } from "@renderer/components/ui";

export type RecentProjectsListItemProps = {
  title: string;
  path: string;
};

export const RecentProjectsListItem: FunctionComponent<RecentProjectsListItemProps> = ({
  title,
  path,
}) => {
  const handleOpen: MouseEventHandler<HTMLLIElement> = () => {
    alert("opening - " + title);
  };

  const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    alert("clear");
  };

  return (
    <li
      tabIndex={0}
      className=" p-2 cursor-pointer hover:bg-accent hover:text-accent-foreground inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full justify-start h-18 [&:has(button:hover)]:bg-background"
      onClick={handleOpen}
    >
      <div className="flex flex-col items-start h-full grow">
        <span className="font-normal">{title}</span>
        <span className="text-xs text-muted-foreground">{path}</span>
      </div>
      <Button variant="ghost" size="icon" className="hover" onClick={handleClear}>
        <IconX className="h-4 w-4" />
      </Button>
    </li>
  );
};
