import { FunctionComponent, MouseEventHandler, LiHTMLAttributes } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

import { Button } from "@renderer/components/ui";
import { cn } from "@renderer/utils";
import { removeRecentDocument } from "@renderer/data";

export type RecentDocumentsListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  title: string;
  path: string;
};

export const RecentDocumentsListItem: FunctionComponent<RecentDocumentsListItemProps> = ({
  title,
  path,
  className,
  ...rest
}) => {
  const handleOpen: MouseEventHandler<HTMLLIElement> = async (event) => {
    await window.api.loadProject(path);
  };

  const handleRemove: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    removeRecentDocument(path);
  };

  return (
    <li
      tabIndex={0}
      className={cn(
        "p-2 cursor-pointer hover:bg-accent hover:text-accent-foreground inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full justify-start h-18 [&:has(button:hover)]:bg-background",
        className,
      )}
      onClick={handleOpen}
      {...rest}
    >
      <div className="flex flex-col items-start h-full grow">
        <span className="font-medium">{title}</span>
        <span className="text-xs font-light text-muted-foreground">{path}</span>
      </div>
      <Button variant="ghost" size="icon" className="hover" onClick={handleRemove}>
        <Cross1Icon className="h-4 w-4" />
      </Button>
    </li>
  );
};
