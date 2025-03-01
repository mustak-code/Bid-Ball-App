import { useAssets } from "expo-asset";

import { useRouter } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import {
    ArrowRight,
    Flag,
    LinkArrow,
    Location,
    Play,
} from "../assets/icons/Icons";

const League = ({ league, user }) => {
    const [assets, error] = useAssets([require("../assets/images/ball.png")]);
    const router = useRouter();

    return (
        <View className="bg-cardBg p-3 rounded-xl">
            <Pressable onPress={() => router.push(`/league/${league._id}`)}>
                {assets ? (
                    <Image
                        source={{ uri: league.leagueImage || assets[0].uri }}
                        contentFit="cover"
                        style={{
                            width: "100%",
                            height: 150,
                            borderRadius: 6,
                        }}
                    />
                ) : null}
            </Pressable>
            <Text className="text-xl font-Do py-3">{league.leagueName}</Text>

            <View className="p-3 bg-secondaryWhite rounded-md mb-3">
                <Text className="font-dmBold text-sm">
                    Organized by - {league.organizer}
                </Text>
            </View>

            <View className="flex-row items-center justify-between mb-3">
                <View className="p-3 bg-secondaryWhite rounded-md flex flex-row items-center">
                    <Play />
                    <Text className="ml-2 font-dmRegular font-normal text-base">
                        {new Date(league.startingDate).toDateString()}
                    </Text>
                </View>
                <ArrowRight />
                <View className="p-3 bg-secondaryWhite rounded-md flex flex-row items-center">
                    <Flag />
                    <Text className="ml-2 font-dmRegular font-normal text-base">
                        {new Date(league.endingDate).toDateString()}
                    </Text>
                </View>
            </View>
            <View className="flex-row gap-3">
                <View className="p-3 flex-1 bg-secondaryWhite rounded-md flex flex-row items-center">
                    <Location />
                    <Text className="ml-2 font-dmRegular font-normal text-base">
                        {league.leagueLocation}
                    </Text>
                </View>
                {user?.role === "Authority" &&
                user?._id === league.createdBy ? (
                    <TouchableOpacity className="bg-primary px-3 rounded-md flex-row items-center">
                        <Text className="font-dmBold font-normal text-base text-white">
                            Edit
                        </Text>
                        <LinkArrow />
                    </TouchableOpacity>
                ) : user?.role === "Team Manager" ? (
                    <TouchableOpacity
                        onPress={() => router.push(`/league/${league?._id}`)}
                        className="bg-primary px-3 rounded-md flex-row items-center"
                    >
                        <Text className="font-dmBold font-normal text-base text-white">
                            Apply
                        </Text>
                        <LinkArrow />
                    </TouchableOpacity>
                ) : (
                    user?.role === "Admin" && (
                        <TouchableOpacity className="bg-primary px-3 rounded-md flex-row items-center">
                            <Text className="font-dmBold font-normal text-base text-white">
                                Delete
                            </Text>

                            <LinkArrow />
                        </TouchableOpacity>
                    )
                )}
            </View>
        </View>
    );
};

export default League;
