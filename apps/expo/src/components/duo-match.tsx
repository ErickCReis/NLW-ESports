import {
  ActivityIndicator,
  Alert,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { setStringAsync } from "expo-clipboard";
import colors from "tailwindcss/colors";

import { trpc } from "../utils/trpc";

import { Heading } from "./heading";

type Props = ModalProps & {
  adId: string;
  onClose: () => void;
};

export const DuoMatch: React.FC<Props> = ({ adId, onClose, ...props }) => {
  const { data } = trpc.ad.discord.useQuery(adId, { enabled: !!adId });

  const handleCopyDiscordToClipboard = async () => {
    if (!data) return;

    await setStringAsync(data.discord);

    Alert.alert(
      "Discord Copiado!",
      "Usuário copiado para a área de transferência."
    );
  };

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...props}>
      <View className="flex-1 items-center justify-center bg-black/60">
        <View className="w-80 items-center justify-center rounded-lg bg-dark-500">
          <TouchableOpacity className="self-end p-4" onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.zinc["500"]} />
          </TouchableOpacity>

          {data ? (
            <Ionicons
              name="checkmark-circle-outline"
              size={72}
              color={colors.emerald["400"]}
            />
          ) : (
            <ActivityIndicator
              color={colors.violet["500"]}
              size="large"
              className="p-4"
            />
          )}

          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar"
            className="items-center"
          />

          <Text className="mb-4 font-[semibold] text-base text-white">
            Adicione no Discord
          </Text>

          <TouchableOpacity
            className="mb-8 h-12 w-60 items-center justify-center rounded bg-dark-900"
            onPress={handleCopyDiscordToClipboard}
          >
            <Text className="font-[regular] text-base text-white">
              {!data ? "..." : data.discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
