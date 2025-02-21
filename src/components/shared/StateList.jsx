import { State } from "country-state-city";
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

export function StateList({ setStateCode, style, setStateName }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const states = State.getStatesOfCountry("IN").map((state) => ({
    name: state.name,
    stateCode: state.isoCode,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between ${style}`}
        >
          {value
            ? states.find((state) => state.name === value)?.name
            : "Select State..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[200px] p-0 ${style}`}>
        <Command>
          <CommandInput placeholder="Search State..." className="h-9" />
          <CommandList>
            <CommandEmpty>No State found.</CommandEmpty>
            <CommandGroup>
              {states.map((state) => (
                <CommandItem
                  key={state.stateCode}
                  value={state.name}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);

                    const selectedState = states.find(
                      (s) => s.name === newValue
                    );
                    if (selectedState) {
                      setStateCode(selectedState.stateCode);
                      setStateName(selectedState.name);
                    }

                    setOpen(false);
                  }}
                >
                  {state.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === state.name ? "opacity-100" : "opacity-0"
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
