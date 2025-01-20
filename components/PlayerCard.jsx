import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ArrowUp, EditIcon } from "../assets/icons/Icons";
import useStore from "../store/store";

const PlayerCard = ({ data, showBottomSheet }) => {
    const [assets, error] = useAssets([require("../assets/images/player.png")]);

    const { user, setCurrectPlayerSelected } = useStore((state) => state);
    const router = useRouter();

    const handleEditRouter = () => {
        router.push(`/player/${data._id}`);
    };

    const handleShowBottomSheet = () => {
        showBottomSheet();
        setCurrectPlayerSelected(data._id);
    };

    return (
        <View className="p-3 bg-cardBg rounded-xl relative">
            {user?.role === "Authority" && data.addedBy === user?._id ? (
                <TouchableOpacity
                    onPress={handleEditRouter}
                    className="w-8 h-8 p-2 bg-white rounded-full absolute top-1 right-1 z-40"
                >
                    <EditIcon />
                </TouchableOpacity>
            ) : null}
            <View className="flex-row items-start gap-3">
                {assets ? (
                    <Image
                        source={data?.dp ? data.dp : assets[0]}
                        style={{ width: 100, height: 100, borderRadius: 6 }}
                    />
                ) : null}

                <View className="flex-1">
                    <TouchableOpacity onPress={handleShowBottomSheet}>
                        <Text className="text-xl font-Do font-normal text-textColor mb-2">
                            {data?.name}
                        </Text>
                    </TouchableOpacity>
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
