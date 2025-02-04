import { useConvex } from "convex/react";
import { useAssets } from "expo-asset";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { api } from "../../convex/_generated/api";
import useStore from "../../store/store";

const Notification = () => {
    const convex = useConvex();
    const [notifications, setNotifications] = useState([]);
    const router = useRouter();
    const { user } = useStore();
    const [assets, error] = useAssets([
        require("../../assets/images/Profile_avatar_placeholder_large.png"),
        require("../../assets/images/ball.png"),
    ]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await convex.query(
                api.notification.getAllNotifications,
                {
                    userId: user?._id,
                }
            );

            setNotifications(response);
        };
        fetchNotifications();
    }, []);

    return (
        <SafeAreaView>
            <Header text="Notifications" hideIcon />

            <View className="p-5">
                <FlatList
                    data={notifications}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                router.push(`/leagueapproval/${item.LeagueId}`)
                            }
                            className={`flex-row gap-3 items-center justify-between bg-primary/10 p-2 rounded-lg mb-3`}
                        >
                            <View className="flex-row gap-3">
                                {assets && (
                                    <Image
                                        source={{
                                            uri: assets[1].uri,
                                        }}
                                        className="h-14 w-14 rounded-md"
                                    />
                                )}
                                <View>
                                    <Text className="font-Do text-base">
                                        {item.notificationText}
                                    </Text>
                                    <Text className="font-dmRegular text-sm">
                                        {notifications?.user?.organizar}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 165,
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default Notification;
