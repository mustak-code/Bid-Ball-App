import React from "react";
import { Text } from "react-native";

const Heading = ({ text, className }) => {
    return <Text className={`font-Do text-2xl py-3 ${className}`}>{text}</Text>;
};

export default Heading;
