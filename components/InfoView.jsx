import React from "react";
import { Text, View } from "react-native";

const InfoView = ({ label, data }) => {
    return (
        <View className="flex-row">
            <Text className="text-base font-Do font-normal text-textColor mb-2">
                {label} :{" "}
            </Text>
            <Text className="text-base font-dmRegular font-normal text-textColor mb-2">
                {data}
            </Text>
        </View>
    );
};

export default InfoView;
