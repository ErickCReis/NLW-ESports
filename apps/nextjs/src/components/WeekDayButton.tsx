import { Fragment } from "react";
import { Switch } from "@headlessui/react";

export const WeekDayButton: React.FC<{
  content: string;
  title: string;
  name: string;
}> = ({ content, title, name }) => {
  return (
    <Switch defaultChecked={false} as={Fragment} name={`weekday-${name}`}>
      {({ checked }) => (
        <button
          className={`${
            checked ? "bg-violet-500" : "bg-zinc-900"
          } h-8 w-8 rounded font-semibold`}
          title={title}
        >
          {content}
        </button>
      )}
    </Switch>
  );
};
