import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";

export type Duo = inferProcedureOutput<AppRouter["game"]["adsById"]>[number];

const DuoInfo: React.FC<{
  label: string;
  value: string;
  valueStyle?: string;
}> = ({ label, value, valueStyle = "text-white" }) => {
  return (
    <View className="mb-4 w-full">
      <Text className="mb-1 font-[regular] text-sm text-caption-300">
        {label}
      </Text>
      <Text className={`font-[bold] text-sm ${valueStyle}`} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

type Props = {
  data: Duo;
  onConnect: () => void;
  style?: string;
};

export const DuoCard: React.FC<Props> = ({ data, onConnect, style = "" }) => {
  return (
    <View
      className={`mr-6 w-48 flex-grow-0 rounded-lg bg-[#2A2634] p-5 ${style}`}
    >
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        valueStyle={data.useVoiceChannel ? `text-emerald-400` : `text-red-400`}
      />

      <TouchableOpacity
        className="flex h-9 w-full flex-row items-center justify-center rounded-md bg-violet-500"
        onPress={onConnect}
      >
        <Ionicons name="game-controller-outline" size={20} color="white" />
        <Text className="ml-2 font-[semibold] text-white">Conectar</Text>
      </TouchableOpacity>
    </View>
  );
};
