import { useConvex, useMutation } from "convex/react";
import { useAssets } from "expo-asset";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    EndingIcon,
    LeagueFeeIcon,
    LeagueNameIcon,
    LocationBigIcon,
    OrganizerIcon,
    PlayIcon,
    PlusIcon,
    ProfileIcon,
    TeamSIzeIcon,
} from "../../../assets/icons/Icons";
import Header from "../../../components/Header";
import IconsButton from "../../../components/IconsButton";
import { api } from "../../../convex/_generated/api";
import useStore from "../../../store/store";

const LeagueApproval = () => {
    const { leagueapprovalId } = useLocalSearchParams();
    const convex = useConvex();
    const [leagueInfo, setLeagueInfo] = useState({});
    const approveLeague = useMutation(api.leagues.approveLeage);
    const createNotification = useMutation(api.notification.createNotification);
    const updateAuthorityNotification = useMutation(
        api.auth.updateAuthorityNotifications
    );
    const router = useRouter();
    const { user } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [assets, error] = useAssets([
        require("../../../assets/images/ball.png"),
    ]);

    useEffect(() => {
        const getLeague = async () => {
            setIsLoading(true);
            try {
                const league = await convex.query(api.leagues.getSingleLeague, {
                    leagueId: leagueapprovalId,
                });

                setLeagueInfo(league);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getLeague();
    }, [convex, leagueapprovalId]);

    const handleOnApprove = async () => {
        const approve = await approveLeague({
            leagueId: leagueapprovalId,
        });

        const notificationId = await createNotification({
            userId: user._id,
            LeagueId: leagueapprovalId,
            notificationText: `${user.name} approved your league`,
        });

        const isSucces = await updateAuthorityNotification({
            authId: leagueInfo.createdBy,
            notification: notificationId.notificationId,
        });

        if (!isSucces.success) {
            return;
        }

        if (approve.success) {
            Alert.alert(approve.message, "", [
                {
                    text: "Done",
                    onPress: () => router.push(`/profile`),
                },
            ]);
        }
    };

    return (
        <SafeAreaView>
            <Header text="League Approval" />
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
                    Information
                </Text>

                <View className="gap-3">
                    <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
                        <View>
                            <LeagueNameIcon />
                        </View>
                        <Text className="py-3 text-sm w-full text-textColor font-dmBold">
                            League Name: {leagueInfo.leagueName}
                        </Text>
                    </View>

                    <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
                        <View>
                            <LocationBigIcon />
                        </View>
                        <Text className="py-3 text-sm w-full text-textColor font-dmBold">
                            Location {leagueInfo.leagueLocation}
                        </Text>
                    </View>
                    <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
                        <View>
                            <OrganizerIcon />
                        </View>
                        <Text className="py-3 text-sm w-full text-textColor font-dmBold">
                            Organizer: {leagueInfo.organizer}
                        </Text>
                    </View>
                    <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
                        <View>
                            <LeagueFeeIcon />
                        </View>
                        <Text className="py-3 text-sm w-full text-textColor font-dmBold">
                            League Fee: {leagueInfo.leagueFee}
                        </Text>
                    </View>
                    <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
                        <View>
                            <PlayIcon />
                        </View>
                        <Text className="py-3 text-sm w-full text-textColor font-dmBold">
                            Starting Date:{" "}
                            {new Date(leagueInfo.startingDate).toDateString()}
                        </Text>
                    </View>
                    <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
                        <View>
                            <EndingIcon />
                        </View>
                        <Text className="py-3 text-sm w-full text-textColor font-dmBold">
                            Ending Date:{" "}
                            {new Date(leagueInfo.endingDate).toDateString()}
                        </Text>
                    </View>
                    <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
                        <View>
                            <ProfileIcon />
                        </View>
                        <Text className="py-3 text-sm w-full text-textColor font-dmBold">
                            Playes TODO::
                        </Text>
                    </View>
                    <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
                        <View>
                            <TeamSIzeIcon />
                        </View>
                        <Text className="py-3 text-sm w-full text-textColor font-dmBold">
                            Team Size: {leagueInfo.teamSize}
                        </Text>
                    </View>
                </View>
                <View className="pb-10 flex-row gap-3 w-full ">
                    <IconsButton
                        onpress={handleOnApprove}
                        Icon={isLoading ? ActivityIndicator : PlusIcon}
                        isLoading={isLoading}
                        text="Approve"
                    />
                    <IconsButton
                        Icon={isLoading ? ActivityIndicator : PlusIcon}
                        isLoading={isLoading}
                        text="Decline"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LeagueApproval;
