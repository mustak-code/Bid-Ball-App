import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import PlayerCard from "../../../components/PlayerCard";

const Data = new Array(6).fill("data");
const Players = () => {
    return (
        <SafeAreaView className="h-full w-full bg-white">
            <View>
                <Header text="Player’s Matrix" />

                <View className="px-4 mt-4">
                    <FlatList
                        renderItem={(renderItem) => {
                            return <PlayerCard key={renderItem.index} />;
                        }}
                        data={Data}
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
