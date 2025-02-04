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
    const [leagueInfo, setLeagueInfo] = useState(null);
    const approveLeague = useMutation(api.leagues.approveLeage);
    const createNotification = useMutation(api.notification.createNotification);
    const deleteLeague = useMutation(api.leagues.deleteLeague);
    const updateAuthorityNotification = useMutation(
        api.auth.updateAuthorityNotifications
    );
    const router = useRouter();
    const { user } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [assets] = useAssets([require("../../../assets/images/ball.png")]);

    useEffect(() => {
        const fetchLeague = async () => {
            try {
                setIsLoading(true);
                const league = await convex.query(api.leagues.getSingleLeague, {
                    leagueId: leagueapprovalId,
                });

                if (league) {
                    setLeagueInfo(league);
                } else {
                    console.warn("No league data found.");
                }
            } catch (error) {
                console.error("Error fetching league:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (leagueapprovalId) {
            fetchLeague();
        }
    }, [leagueapprovalId]);

    const handleApproval = async (isApproved) => {
        if (!leagueapprovalId || !user?._id) {
            Alert.alert("Error", "Invalid league or user data.");
            return;
        }

        setIsLoading(true);
        try {
            const action = isApproved ? approveLeague : deleteLeague;
            const result = await action({ leagueId: leagueapprovalId });

            if (!result?.success) {
                Alert.alert("Error", "Failed to process the request.");
                return;
            }

            const notificationId = await createNotification({
                userId: user._id,
                LeagueId: leagueapprovalId,
                notificationText: `${user.name} ${
                    isApproved ? "approved" : "declined"
                } your league`,
            });

            await updateAuthorityNotification({
                authId: leagueInfo?.createdBy,
                notification: notificationId.notificationId,
            });

            Alert.alert(result.message, "", [
                { text: "Done", onPress: () => router.push(`/profile`) },
            ]);
        } catch (error) {
            console.error("Approval Error:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <Header text="League Approval" />
            <ScrollView
                className="p-5"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
                showsVerticalScrollIndicator={false}
            >
                {leagueInfo ? (
                    <>
                        <View className="pb-3">
                            <Image
                                source={{
                                    uri:
                                        leagueInfo.leagueImage ||
                                        assets?.[0]?.uri,
                                }}
                                className="h-[150px] w-full rounded-md"
                            />
                        </View>

                        <Text className="font-Do text-xl text-textColor py-3">
                            Information
                        </Text>

                        {[
                            {
                                icon: <LeagueNameIcon />,
                                text: `League Name: ${leagueInfo.leagueName}`,
                            },
                            {
                                icon: <LocationBigIcon />,
                                text: `Location: ${leagueInfo.leagueLocation}`,
                            },
                            {
                                icon: <OrganizerIcon />,
                                text: `Organizer: ${leagueInfo.organizer}`,
                            },
                            {
                                icon: <LeagueFeeIcon />,
                                text: `League Fee: ${leagueInfo.leagueFee}`,
                            },
                            {
                                icon: <PlayIcon />,
                                text: `Starting Date: ${new Date(leagueInfo.startingDate).toDateString()}`,
                            },
                            {
                                icon: <EndingIcon />,
                                text: `Ending Date: ${new Date(leagueInfo.endingDate).toDateString()}`,
                            },
                            { icon: <ProfileIcon />, text: `Players: TODO` },
                            {
                                icon: <TeamSIzeIcon />,
                                text: `Team Size: ${leagueInfo.teamSize}`,
                            },
                        ].map(({ icon, text }, index) => (
                            <View
                                key={index}
                                className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3 mb-3"
                            >
                                <View>{icon}</View>
                                <Text className="py-3 text-sm text-textColor font-dmBold">
                                    {text}
                                </Text>
                            </View>
                        ))}

                        {user?.role === "Admin" && (
                            <View className="pb-10 flex-row gap-3 w-full">
                                <IconsButton
                                    onpress={() => handleApproval(true)}
                                    Icon={
                                        isLoading ? ActivityIndicator : PlusIcon
                                    }
                                    isLoading={isLoading}
                                    text="Approve"
                                />
                                <IconsButton
                                    onpress={() => handleApproval(false)}
                                    Icon={
                                        isLoading ? ActivityIndicator : PlusIcon
                                    }
                                    isLoading={isLoading}
                                    text="Decline"
                                />
                            </View>
                        )}
                    </>
                ) : (
                    <Text>InValid Id</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default LeagueApproval;
