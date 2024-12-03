import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const FormBottomText = ({ text, label, link }) => {
    return (
        <View className="flex-row items-center justify-center">
            <Text className="font-dmRegular text-sm text-textColor">
                {text}{" "}
            </Text>
            <Link
                href={link}
                style={{
                    fontFamily: "dmRegular",
                    fontSize: 14,
                    color: "#6d4ca4",
                }}
            >
                {label}
            </Link>
        </View>
    );
};

export default FormBottomText;
