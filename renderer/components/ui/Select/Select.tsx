import * as SelectPrimitive from "@radix-ui/react-select";

import { SelectTrigger } from "./SelectTrigger";
import { SelectContent } from "./SelectContent";
import { SelectLabel } from "./SelectLabel";
import { SelectItem } from "./SelectItem";
import { SelectSeparator } from "./SelectSeparator";

const SelectRoot = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

export const Select = Object.assign(SelectRoot, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
});
