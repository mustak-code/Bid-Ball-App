import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Bell from "../assets/icons/Bell";

const Header = ({ text }) => {
    return (
        <View className="flex-row items-center justify-between bg-primary py-6 rounded-b-xl shadow">
            <Text className="text-[32px] pl-4 font-Kalnia font-normal text-white">
                {text}
            </Text>
            <TouchableOpacity className="pr-4">
                <Bell />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
