import { FunctionComponent, HTMLAttributes, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { useRecentDocuments } from "@renderer/data";
import { Input, ScrollArea } from "@renderer/components/ui";
import { cn } from "@renderer/utils";

import { RecentDocumentsListItem } from "./RecentDocumentsListItem";

type RecentDocumentsListProps = HTMLAttributes<HTMLDivElement>;
export const RecentDocumentsList: FunctionComponent<RecentDocumentsListProps> = ({
  className,
  ...rest
}) => {
  const { data: recentDocuments } = useRecentDocuments();
  const [search, setSearch] = useState("");

  if (!recentDocuments) return null;

  return (
    <div className={cn("flex flex-col overflow-hidden grow", className)} {...rest}>
      <div className="px-4 pt-px z-10">
        <Input
          value={search}
          leadingIcon={MagnifyingGlassIcon}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {recentDocuments.length === 0 && (
        <div className="flex flex-col items-center justify-center grow text-muted-foreground text-xs p-4">
          <span className="block mb-2">
            As you use APPNAME, any projects you open will show up here for quick access.
          </span>
          <span>
            You can pin anything you open frequently so it&apos;s always at the top of the list.
          </span>
        </div>
      )}

      {recentDocuments.length > 0 && (
        <ScrollArea className="grow px-4 pr-3 mr-1">
          <ul>
            {recentDocuments
              .filter((rd) => rd.title.toLowerCase().includes(search.toLowerCase()))
              .map((rd) => (
                <RecentDocumentsListItem
                  className="first:mt-2 last:mb-2"
                  key={rd.path}
                  path={rd.path}
                  title={rd.title}
                />
              ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
};
