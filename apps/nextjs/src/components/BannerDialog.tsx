import { Dialog } from "@headlessui/react";
import { GameController } from "phosphor-react";
import { Input } from "./Form/Input";

const btnWeekday = "w-8 h-8 rounded bg-zinc-900 font-semibold";

export const BannerDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center  bg-black/60">
        <Dialog.Panel className="w-full max-w-[488px] rounded-lg bg-[#2A2634] px-10 py-8 shadow-lg shadow-black/80">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>
          <form className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="game">
                Qual o game?
              </label>
              <Input
                id="game"
                placeholder="Selecione o game que deseja jogar"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="name">
                Seu nome (ou nickname)
              </label>
              <Input id="name" placeholder="Como te chamam dentro do game?" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="yearsPlaying">
                  Joga há quantos anos?
                </label>
                <Input
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="discord">
                  Qual seu Discord?
                </label>
                <Input id="discord" placeholder="Usuario#0000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="weekdays">
                  Quando costuma jogar?
                </label>
                <div className="text-bold flex flex-wrap justify-center gap-1">
                  <button className={btnWeekday} title="Domingo">
                    D
                  </button>
                  <button className={btnWeekday} title="Segunda">
                    S
                  </button>
                  <button className={btnWeekday} title="Terça">
                    T
                  </button>
                  <button className={btnWeekday} title="Quarta">
                    Q
                  </button>
                  <button className={btnWeekday} title="Quinta">
                    Q
                  </button>
                  <button className={btnWeekday} title="Sexta">
                    S
                  </button>
                  <button className={btnWeekday} title="Sábado">
                    S
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="hourStart">
                  Qual horário do dia?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input id="hourStart" type="time" placeholder="De" />
                  <Input id="hourEnd" type="time" placeholder="Até" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 text-sm">
              <Input id="useVoiceChannel" type="checkbox" />
              <label htmlFor="useVoiceChannel">
                Costumo me conectar ao chat de voz
              </label>
            </div>

            <footer className="mt-4 flex justify-end gap-4">
              <button
                className="h-12 rounded-md bg-zinc-500 px-4 font-semibold hover:bg-zinc-500"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button className="flex h-12 items-center gap-3 rounded-md bg-violet-500 px-4 font-semibold hover:bg-violet-600">
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
