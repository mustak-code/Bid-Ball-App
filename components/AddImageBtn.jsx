import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AttachmentIcon } from "../assets/icons/Icons";

const AddImageBtn = ({ onpress }) => {
    return (
        <View>
            <Text className="font-Do text-xl text-textColor mb-3">
                Add Image
            </Text>
            <TouchableOpacity
                onPress={onpress}
                className="flex-row border border-primary py-3 px-3 rounded items-center gap-1"
            >
                <AttachmentIcon />
                <Text className="font-dmRegular text-sm text-black">
                    Attach Image (png, Jpeg)
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddImageBtn;
