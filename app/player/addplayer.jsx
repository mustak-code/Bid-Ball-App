import { useAssets } from "expo-asset";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    AttachmentIcon,
    DollarIcon,
    EmailIcon,
    HashIcon,
    LocationBigIcon,
    PhoneIcon,
    PlusIcon,
    ProfileIcon,
} from "../../assets/icons/Icons";
import Checkbox from "../../components/Checkbox";
import IconInput from "../../components/IconInput";
import IconsButton from "../../components/IconsButton";

const AddPlayer = () => {
    const [assets, error] = useAssets(require("../../assets/images/ball.png"));

    return (
        <SafeAreaView>
            <ScrollView className="p-5" contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-row gap-3">
                    {assets && (
                        <Image
                            source={assets[0]}
                            className="w-[100px] h-[100px] aspect-square rounded-md"
                        />
                    )}
                    <View>
                        <Text className="font-Do text-xl text-textColor mb-3">
                            Add Image
                        </Text>
                        <TouchableOpacity className="flex-row border border-primary py-3 px-3 rounded items-center gap-1">
                            <AttachmentIcon />
                            <Text className="font-dmRegular text-sm text-black">
                                Attach Image (png, Jpeg)
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text className="font-Do text-xl text-textColor py-3">
                    Player Detail’s
                </Text>

                <View className="gap-3">
                    <IconInput Icon={ProfileIcon} placeholder="Name" />
                    <IconInput
                        Icon={DollarIcon}
                        placeholder="Minimum Bidding amount"
                    />
                    <IconInput Icon={HashIcon} placeholder="Age" />
                    <IconInput Icon={LocationBigIcon} placeholder="Location" />
                    <IconInput Icon={PhoneIcon} placeholder="Phone" />
                    <IconInput Icon={EmailIcon} placeholder="Email" />
                </View>

                <Text className="font-Do text-xl text-textColor py-3">
                    Category
                </Text>

                <View className="gap-2">
                    <Checkbox onClick={() => {}} text="Batsman" />
                    <Checkbox onClick={() => {}} text="Bowler" />
                    <Checkbox onClick={() => {}} text="All Rounder" />
                </View>
                <Text className="font-Do text-xl text-textColor py-3">
                    Handed
                </Text>

                <View className="gap-2">
                    <Checkbox onClick={() => {}} text="Left Handed" />
                    <Checkbox onClick={() => {}} text="Right Handed" />
                </View>

                <View className="pb-10">
                    <IconsButton Icon={PlusIcon} text="Add" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddPlayer;
