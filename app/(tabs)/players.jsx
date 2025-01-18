import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlusIcon } from "../../assets/icons/Icons";
import Header from "../../components/Header";
import IconsButton from "../../components/IconsButton";
import PlayerCard from "../../components/PlayerCard";
import useStore from "../../store/store";
const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
    },
    {
        id: "5869dsd4a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
    },
];
const Players = () => {
    const { user } = useStore((state) => state);

    const router = useRouter();

    return (
        <SafeAreaView className="h-full w-full bg-white">
            <View>
                <Header text="Player’s Matrix" />

                {user?.role === "Authority" && (
                    <View className="px-4">
                        <IconsButton
                            onpress={() => router.push("/player/addplayer")}
                            Icon={PlusIcon}
                            text={"Add Player"}
                        />
                    </View>
                )}

                <View className="px-4 mt-4">
                    <FlatList
                        renderItem={(renderItem, index) => {
                            return <PlayerCard key={index} />;
                        }}
                        data={DATA}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={(item) => (
                            <View key={item.id} className="py-2"></View>
                        )}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: 170,
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <Text> There no League </Text>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Players;
