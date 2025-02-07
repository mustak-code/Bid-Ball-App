import { useConvex, useMutation } from "convex/react";
import { useAssets } from "expo-asset";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlusIcon } from "../../../assets/icons/Icons";
import Header from "../../../components/Header";
import IconsButton from "../../../components/IconsButton";
import { api } from "../../../convex/_generated/api";
import useStore from "../../../store/store";

const LeagueDetails = () => {
    const { leaguedetails } = useLocalSearchParams();
    const { user, setUser } = useStore((state) => state);
    const router = useRouter();
    const convex = useConvex();
    const updatePurchases = useMutation(api.auth.updatePurchase);

    const [leagueInfo, setLeagueInfo] = useState(null);
    const [updatetdUser, setUpdatetdUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [assets] = useAssets([
        require("../../../assets/images/ball.png"),
        require("../../../assets/images/Profile_avatar_placeholder_large.png"),
    ]);

    useEffect(() => {
        const getData = async () => {
            try {
                const league = await convex.query(api.leagues.getSingleLeague, {
                    leagueId: leaguedetails,
                });
                setLeagueInfo(league || {});
            } catch (error) {
                console.error("Error fetching league:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (leaguedetails) getData();
    }, [leaguedetails, convex]);

    useEffect(() => {
        if (!user?._id) return;
        const getUser = async () => {
            try {
                const upUser = await convex.query(api.auth.getUserbyId, {
                    userId: user._id,
                });
                setUpdatetdUser(upUser);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        getUser();
    }, [user?._id, convex]);

    const purchaseLeague = useCallback(async () => {
        if (!updatetdUser?._id) {
            Alert.alert("Please login to purchase this league");
            return;
        }

        if (!updatetdUser?.balance || updatetdUser.balance < 500) {
            Alert.alert("Not enough balance", "Deposit Now", [
                { text: "Deposit", onPress: () => router.push("/payment") },
            ]);
            return;
        }

        try {
            const converToInt = parseInt(leagueInfo?.leagueFee);

            const newUser = await updatePurchases({
                league: leaguedetails,
                userId: user._id,
                amount: converToInt,
            });

            if (newUser) {
                setUser(newUser);
                ToastAndroid.show(
                    "League purchase success",
                    ToastAndroid.BOTTOM
                );
                router.push("/profile");
            }
        } catch (error) {
            console.error("Error purchasing league:", error);
        }
    }, [updatetdUser, updatePurchases, leaguedetails, user, setUser, router]);

    const leagueImageUri = useMemo(() => {
        return leagueInfo?.leagueImage || assets?.[0]?.uri || "";
    }, [leagueInfo, assets]);

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
                        <Image
                            source={{ uri: leagueImageUri }}
                            className="h-[150px] w-full rounded-md"
                        />
                    </View>

                    <Text className="font-Do text-xl text-textColor py-3">
                        League Info
                    </Text>

                    <View>
                        {leagueInfo && (
                            <>
                                <Text className="font-Do text-base text-textColor">
                                    League Name: {leagueInfo?.leagueName}
                                </Text>
                                <Text className="font-Do text-base text-textColor">
                                    Organizer: {leagueInfo?.organizer}
                                </Text>
                                <Text className="font-Do text-base text-textColor">
                                    Location: {leagueInfo?.leagueLocation}
                                </Text>
                                <Text className="font-Do text-base text-textColor">
                                    Team Size: {leagueInfo?.teamSize}
                                </Text>
                                <Text className="font-Do text-base text-textColor">
                                    League Fee: {leagueInfo?.leagueFee}
                                </Text>
                                <Text className="font-Do text-base text-textColor">
                                    Starting Date:{" "}
                                    {new Date(
                                        leagueInfo?.startingDate
                                    ).toDateString()}
                                </Text>
                                <Text className="font-Do text-base text-textColor">
                                    Ending Date:{" "}
                                    {new Date(
                                        leagueInfo?.endingDate
                                    ).toDateString()}
                                </Text>

                                <Text className="font-Do text-base text-textColor">
                                    Players:
                                </Text>
                                <View className="mt-2">
                                    {leagueInfo?.populatedPlayers?.map(
                                        (player) => (
                                            <TouchableOpacity
                                                key={player._id}
                                                className="flex-row gap-3 justify-between bg-primary/10 p-2 rounded-lg mb-3"
                                            >
                                                <View className="flex-row gap-3">
                                                    <Image
                                                        source={{
                                                            uri: player?.dp,
                                                        }}
                                                        className="h-14 w-14 rounded-md"
                                                    />
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
                                        )
                                    )}
                                </View>
                            </>
                        )}
                    </View>

                    {user?.role === "Team Manager" && (
                        <View className="pb-10">
                            <IconsButton
                                onpress={purchaseLeague}
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

export default LeagueDetails;
