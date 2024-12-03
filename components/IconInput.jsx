import React from "react";
import { TextInput, View } from "react-native";

const IconInput = ({ Icon, placeholder, type, onType }) => {
    return (
        <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
            <View>
                <Icon />
            </View>
            <TextInput
                onChangeText={onType}
                placeholder={placeholder}
                className="py-3 text-sm w-full text-textColor font-dmBold "
                secureTextEntry={type === "password" ? true : false}
            />
        </View>
    );
};

export default IconInput;
