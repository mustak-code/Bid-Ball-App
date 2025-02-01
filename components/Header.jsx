import { useConvex } from "convex/react";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Bell from "../assets/icons/Bell";
import { api } from "../convex/_generated/api";
import useStore from "../store/store";

const Header = ({ text }) => {
    const { user } = useStore((state) => state);
    const [userInfo, setUserInfo] = useState({});
    const convex = useConvex();
    const router = useRouter();

    useEffect(() => {
        const getNotifications = async () => {
            if (!user?._id) return;

            const notification = await convex.query(api.auth.getUserbyId, {
                userId: user._id,
            });

            setUserInfo(notification);
        };

        getNotifications();
    }, [convex, user?._id]);

    return (
        <View className="flex-row items-center justify-between bg-primary py-6 rounded-b-xl shadow">
            <Text className="text-[32px] pl-4 font-Kalnia font-normal text-white">
                {text}
            </Text>
            <TouchableOpacity
                onPress={() => router.push("/notification")}
                className="pr-4 relative"
            >
                <Text className="bg-red-400 absolute rounded-full w-5 h-5 items-center justify-center -top-3 -left-3 text-center">
                    {userInfo?.notifications?.length || 0}
                </Text>
                <Bell />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
