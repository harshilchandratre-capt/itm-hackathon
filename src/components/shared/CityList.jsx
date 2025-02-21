import { City } from "country-state-city";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function CityList({ stateCode, setCityName, style }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const values = City.getCitiesOfState("IN", stateCode).map(
    (state) => state.name
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between ${style}`}
        >
          {value ? values.find((state) => state === value) : "Select City..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[200px] p-0 ${style}`}>
        <Command>
          <CommandInput placeholder="Search Cities..." className="h-9" />
          <CommandList>
            <CommandEmpty>No City found.</CommandEmpty>
            <CommandGroup>
              {values.map((framework) => (
                <CommandItem
                  key={framework}
                  value={framework}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setCityName(currentValue);

                    setOpen(false);
                  }}
                >
                  {framework}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
