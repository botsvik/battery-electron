"use client";

import { FunctionComponent, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@renderer/components/ui";

import { RecentDocumentsList } from "./RecentDocumentsList";

export const RecentDocuments: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col overflow-hidden grow">
      <div className="px-4 pt-px z-10">
        <Input
          value={searchTerm}
          leadingIcon={MagnifyingGlassIcon}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <RecentDocumentsList searchTerm={searchTerm} />
    </div>
  );
};
