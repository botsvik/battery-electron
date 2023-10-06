"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs";

import { TabsList } from "./TabsList";
import { TabsTrigger } from "./TabsTrigger";
import { TabsContent } from "./TabsContent";

const TabsRoot = TabsPrimitive.Root;

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
