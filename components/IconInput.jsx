import React from "react";
import { TextInput, View } from "react-native";

const IconInput = ({
    Icon,
    placeholder,
    type,
    onType,
    className,
    value,
    keyboardType,
    onpress,
}) => {
    return (
        <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
            <View>
                <Icon />
            </View>
            <TextInput
                onChangeText={onType}
                placeholder={placeholder}
                value={value}
                onPress={onpress}
                className={`py-3 text-sm w-full text-textColor font-dmBold ${className}`}
                secureTextEntry={type === "password" ? true : false}
                keyboardType={keyboardType ? keyboardType : "default"}
            />
        </View>
    );
};

export default IconInput;
