import { Dialog, Switch } from "@headlessui/react";
import { Check, GameController, Spinner } from "phosphor-react";
import { AppRouter } from "@acme/api";
import { inferProcedureInput } from "@trpc/server";

import { trpc } from "../utils/trpc";

import { Input } from "./Form/Input";
import { AutoComplete, AutoCompleteItem } from "./Form/AutoComplete";
import { WeekDayButton } from "./WeekDayButton";

type AdForm = inferProcedureInput<AppRouter["ad"]["create"]>;

export const BannerDialog: React.FC<{
  isOpen: boolean;
  onClose: (success?: boolean) => void;
}> = ({ isOpen, onClose }) => {
  const { data: games } = trpc.game.all.useQuery();
  const { mutate, isLoading, error } = trpc.ad.create.useMutation({
    onSuccess: () => onClose(true),
  });

  const gameOptions: AutoCompleteItem[] =
    games?.map((game) => ({ name: game.name, value: game.id })) ?? [];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawParamsForm = Object.fromEntries(formData);

    const paramsForm = Object.entries(rawParamsForm).reduce(
      (acc, [key, value]) => {
        if (key.startsWith("weekday-")) {
          return {
            ...acc,
            weekDays: [...(acc.weekDays ?? []), Number(key.slice(-1))],
          };
        }

        if (key === "yearsPlaying" || key === "gameId") {
          return {
            ...acc,
            [key]: Number(value),
          };
        }

        return {
          ...acc,
          [key]: value === "on" ? true : value,
        };
      },
      {} as AdForm
    );

    mutate(paramsForm);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center  bg-black/60">
        <Dialog.Panel className="w-full max-w-lg rounded-lg bg-[#2A2634] px-10 py-8 shadow-lg shadow-black/80">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>
          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            <AutoComplete
              items={gameOptions}
              placeholder="Selecione o game que deseja jogar"
              name="gameId"
              error={error?.data?.zodError?.fieldErrors["gameId"]?.[0]}
            ></AutoComplete>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="name">
                Seu nome (ou nickname)
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Como te chamam dentro do game?"
                error={error?.data?.zodError?.fieldErrors["name"]?.[0]}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="yearsPlaying">
                  Joga há quantos anos?
                </label>
                <Input
                  id="yearsPlaying"
                  name="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                  error={
                    error?.data?.zodError?.fieldErrors["yearsPlaying"]?.[0]
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="discord">
                  Qual seu Discord?
                </label>
                <Input
                  id="discord"
                  name="discord"
                  placeholder="Usuario#0000"
                  error={error?.data?.zodError?.fieldErrors["discord"]?.[0]}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="weekdays">
                  Quando costuma jogar?
                  {error?.data?.zodError?.fieldErrors["weekDays"]?.[0] && (
                    <span className="pl-1 text-red-500">*</span>
                  )}
                </label>
                <div className="text-bold flex flex-wrap justify-center gap-1">
                  <WeekDayButton content="D" title="Domingo" name="0" />
                  <WeekDayButton content="S" title="Segunda" name="1" />
                  <WeekDayButton content="T" title="Terça" name="2" />
                  <WeekDayButton content="Q" title="Quarta" name="3" />
                  <WeekDayButton content="Q" title="Quinta" name="4" />
                  <WeekDayButton content="S" title="Sexta" name="5" />
                  <WeekDayButton content="S" title="Sábado" name="6" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="hourStart">
                  Qual horário do dia?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="hourStart"
                    name="hourStart"
                    type="time"
                    placeholder="De"
                    error={error?.data?.zodError?.fieldErrors["hourStart"]?.[0]}
                  />
                  <Input
                    id="hourEnd"
                    name="hourEnd"
                    type="time"
                    placeholder="Até"
                    error={error?.data?.zodError?.fieldErrors["hourEnd"]?.[0]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <Switch.Group>
                <Switch
                  defaultChecked={false}
                  name="useVoiceChannel"
                  className="h-6 w-6 rounded bg-zinc-900 p-1"
                >
                  {({ checked }) => (
                    <>
                      {checked && (
                        <Check className="h-4 w-4 text-emerald-400" />
                      )}
                    </>
                  )}
                </Switch>
                <Switch.Label>Costumo me conectar ao chat de voz</Switch.Label>
              </Switch.Group>
            </div>

            <footer className="mt-4 flex justify-end gap-4">
              <button
                className="h-12 rounded-md bg-zinc-500 px-4 font-semibold hover:bg-zinc-500"
                onClick={() => onClose()}
              >
                Cancelar
              </button>
              <button
                className="flex h-12 items-center gap-3 rounded-md bg-violet-500 px-4 font-semibold hover:bg-violet-600"
                type="submit"
              >
                {isLoading ? (
                  <Spinner className="h-5 w-5 text-white" />
                ) : (
                  <>
                    <GameController size={24} />
                    Encontrar duo
                  </>
                )}
              </button>
            </footer>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
