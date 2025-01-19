import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { ArrowUp } from "../assets/icons/Icons";

const PlayerCard = ({ data }) => {
    const [assets, error] = useAssets([require("../assets/images/player.png")]);
    return (
        <View className="p-3 bg-cardBg rounded-xl">
            <View className="flex-row items-start gap-3">
                {assets ? (
                    <Image
                        source={data?.dp ? data.dp : assets[0]}
                        style={{ width: 100, height: 100, borderRadius: 6 }}
                    />
                ) : null}

                <View className="flex-1">
                    <Text className="text-xl font-Do font-normal text-textColor mb-2">
                        {data?.name}
                    </Text>
                    <Text className="font-dmRegular text-sm font-normal text-black mb-2">
                        Lord Association
                    </Text>
                    <View className="bg-secondaryWhite w-full flex-row items-center justify-between p-3 rounded-md">
                        <Text className="font-dmBold text-sm font-bold">
                            25000৳
                        </Text>
                        <ArrowUp />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PlayerCard;
