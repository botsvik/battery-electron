import { FunctionComponent, HTMLAttributes, ChangeEventHandler, useState } from "react";
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
          placeholder="Search recent projects..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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
    </div>
  );
};
