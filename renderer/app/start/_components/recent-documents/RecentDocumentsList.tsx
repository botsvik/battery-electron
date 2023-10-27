import { FunctionComponent } from "react";

import { useRecentDocuments } from "@renderer/api";
import { ScrollArea } from "@renderer/components";

import { RecentDocumentsListItem } from "./RecentDocumentsListItem";

export type RecentDocumentsListProps = {
  searchTerm?: string;
};
export const RecentDocumentsList: FunctionComponent<
  RecentDocumentsListProps
> = ({ searchTerm = "" }) => {
  const { data } = useRecentDocuments();

  if (!data) return null;

  return data.length === 0 ? (
    <div className="flex flex-col items-center justify-center grow text-muted-foreground text-xs p-4">
      <span className="block mb-2">
        As you use APPNAME, any projects you open will show up here for quick
        access.
      </span>
      <span>
        You can pin anything you open frequently so it&apos;s always at the top
        of the list.
      </span>
    </div>
  ) : (
    <ScrollArea className="grow px-4 pr-3 mr-1">
      <ul>
        {data
          .filter((rd) =>
            rd.title.toLowerCase().includes(searchTerm.toLowerCase()),
          )
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
  );
};
