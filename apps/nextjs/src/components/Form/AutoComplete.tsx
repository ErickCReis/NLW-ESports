import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { CaretDown } from "phosphor-react";

export type AutoCompleteItem = { name: string; value: number };

type Props = {
  items: AutoCompleteItem[];
  placeholder?: string;
  name: string;
};

export const AutoComplete: React.FC<Props> = ({ items, placeholder, name }) => {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter(({ name }) => {
          return name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox name={name}>
      <div className="relative w-full">
        <Combobox.Label className="font-semibold" htmlFor={name}>
          Qual o game?
        </Combobox.Label>
        <div className="relative mt-2 w-full">
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            displayValue={(value?: number) =>
              items.find((item) => item.value === value)?.name ?? ""
            }
            className="w-full rounded bg-zinc-900 px-4 py-3 text-sm placeholder:text-zinc-500"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <CaretDown className="h-5 w-5 text-zinc-400" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-900 shadow shadow-black/80">
          {filteredItems.map(({ name, value }) => (
            <Combobox.Option key={name} value={value}>
              {({ active }) => (
                <div className={`px-2 py-1 ${active && "bg-zinc-800"}`}>
                  {name}
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};
