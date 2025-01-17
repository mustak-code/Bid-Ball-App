import React from "react";
import { Text, TouchableOpacity } from "react-native";

const IconsButton = ({ Icon, text, onpress }) => {
    return (
        <TouchableOpacity
            onPress={onpress}
            className="bg-primary flex-row items-center py-3 px-3 justify-center gap-[10px] mt-7 rounded-xl"
        >
            <Icon />
            <Text className="text-xl font-Do text-white">{text}</Text>
        </TouchableOpacity>
    );
};

export default IconsButton;
