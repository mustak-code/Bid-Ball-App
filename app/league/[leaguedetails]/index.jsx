import { useConvex } from "convex/react";
import { useAssets } from "expo-asset";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlusIcon } from "../../../assets/icons/Icons";
import Header from "../../../components/Header";
import IconsButton from "../../../components/IconsButton";
import { api } from "../../../convex/_generated/api";
import useStore from "../../../store/store";

const index = () => {
    const { leaguedetails } = useLocalSearchParams();
    const [leagueInfo, setLeagueInfo] = useState({});
    const [isLoading, setIsloading] = useState(false);
    const { user } = useStore((state) => state);
    const [assets, error] = useAssets([
        require("../../../assets/images/ball.png"),
        require("../../../assets/images/Profile_avatar_placeholder_large.png"),
    ]);

    const convex = useConvex();

    useEffect(() => {
        const getData = async () => {
            setIsloading(true);

            try {
                const league = await convex.query(api.leagues.getSingleLeague, {
                    leagueId: leaguedetails,
                });

                if (league) {
                    setLeagueInfo(league);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsloading(false);
            }
        };
        getData();
    }, [leaguedetails]);

    console.log(leagueInfo);

    return (
        <SafeAreaView>
            <Header text="League Details" />

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <ScrollView
                    className="p-5"
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                >
                    <View className="pb-3">
                        {assets &&
                            (isLoading ? (
                                <ActivityIndicator />
                            ) : (
                                <Image
                                    source={{
                                        uri: leagueInfo?.leagueImage
                                            ? leagueInfo.leagueImage
                                            : assets[0].uri,
                                    }}
                                    className=" h-[150px] w-full  rounded-md"
                                />
                            ))}
                    </View>

                    <Text className="font-Do text-xl text-textColor py-3">
                        League Info
                    </Text>

                    <View>
                        <Text className="font-Do text-base text-textColor">
                            League Name: {leagueInfo?.leagueName}
                        </Text>
                        <Text className="font-Do text-base text-textColor">
                            Organizer: {leagueInfo?.organizer}
                        </Text>
                        <Text className="font-Do text-base text-textColor">
                            League Location: {leagueInfo?.leagueLocation}
                        </Text>
                        <Text className="font-Do text-base text-textColor">
                            Team Size: {leagueInfo?.teamSize}
                        </Text>
                        <Text className="font-Do text-base text-textColor">
                            League Fee: {leagueInfo?.leagueFee}
                        </Text>
                        <Text className="font-Do text-base text-textColor">
                            Starting Date:{" "}
                            {new Date(leagueInfo?.startingDate).toDateString()}
                        </Text>
                        <Text className="font-Do text-base text-textColor">
                            Ending Date:{" "}
                            {new Date(leagueInfo?.endingDate).toDateString()}
                        </Text>

                        <Text className="font-Do text-base text-textColor">
                            Players:
                        </Text>
                        <View className="mt-2">
                            {leagueInfo?.populatedPlayers?.map((player) => (
                                <TouchableOpacity
                                    key={player._id}
                                    className={`flex-row gap-3 justify-between bg-primary/10 p-2 rounded-lg mb-3 `}
                                >
                                    <View className="flex-row gap-3">
                                        {assets && assets[0]?.uri && (
                                            <Image
                                                source={{
                                                    uri: player?.dp,
                                                }}
                                                className="h-14 w-14 rounded-md"
                                            />
                                        )}
                                        <View>
                                            <Text className="font-Do text-base">
                                                {player?.name}
                                            </Text>
                                            <Text className="font-dmRegular text-sm">
                                                {player?.genre}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {user?.role === "Team Manager" && (
                        <View className="pb-10">
                            <IconsButton
                                Icon={isLoading ? ActivityIndicator : PlusIcon}
                                isLoading={isLoading}
                                text="Apply"
                            />
                        </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default index;
