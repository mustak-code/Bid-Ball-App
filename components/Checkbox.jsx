import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Checkbox = ({ onClick, text, value }) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <View className="flex-row gap-3">
                <View
                    className={`h-6 w-6 border-primary ${value === text ? "bg-primary" : ""} border-2 rounded-full`}
                ></View>
                <Text className="font-dmBold text-sm">{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Checkbox;
