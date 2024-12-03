import React from "react";
import { Text, TouchableOpacity } from "react-native";

const PrimaryBtn = ({ label, onClick }) => {
    return (
        <TouchableOpacity onPress={onClick} className="bg-primary rounded-md">
            <Text className="font-dmBold text-sm text-white text-center py-3">
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default PrimaryBtn;
