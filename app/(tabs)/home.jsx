import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlusIcon } from "../../assets/icons/Icons";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import IconsButton from "../../components/IconsButton";
import League from "../../components/League";

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

export default function Guesthome() {
    return (
        <SafeAreaView className="bg-white h-full w-full">
            <Header text="Bid Ball" />

            <View className="px-4">
                <IconsButton Icon={PlusIcon} text={"Create a League"} />

                <FlatList
                    renderItem={(renderItem) => {
                        return <League key={renderItem.item.id} />;
                    }}
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={() => (
                        <Heading text="On Going League’s" />
                    )}
                    ItemSeparatorComponent={(item) => (
                        <View key={item} className="py-2"></View>
                    )}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 90,
                    }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => <Text> There no League </Text>}
                />
            </View>
        </SafeAreaView>
    );
}
