import { useConvex, useMutation } from "convex/react";
import { useAssets } from "expo-asset";

import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { EditIcon, SignoutIcon } from "../assets/icons/Icons";
import { api } from "../convex/_generated/api";
import useStore from "../store/store";
import { validatePhoneNumber } from "../utils/getValidate";
import storeImageToDb from "../utils/storeImageToDB";
import uplaodImage from "../utils/uplaodImage";
import IconsButton from "./IconsButton";

const ProfileComponent = ({ approvedLeages, pendingLEagues }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [phone, setPhone] = useState("");
    const convex = useConvex();
    const generateImageUploadUrl = useMutation(
        api.imageupload.generateImageUploadUrl
    );
    const sendImageToDatabase = useMutation(
        api.imageupload.sendImageToDatabase
    );
    const getImageUrl = useMutation(api.imageupload.getImageUrl);
    const updateUser = useMutation(api.auth.updateUser);

    const [assets, error] = useAssets([
        require("../assets/images/Profile_avatar_placeholder_large.png"),
    ]);
    const phoneRef = useRef(null);

    const { user, setUser } = useStore((state) => state);

    const handleProfile = async () => {
        setIsLoading(true);
        try {
            const image = await uplaodImage();
            setProfileImage(image);

            const uploadUrl = await generateImageUploadUrl();

            const uploadResponse = await storeImageToDb(image, uploadUrl);
            const { storageId } = await uploadResponse.json();

            const imageUrl = await getImageUrl({ storageId });

            await sendImageToDatabase({
                storageId: imageUrl,
                user: user?.email,
            });

            const newUser = await convex.query(
                api.auth.getUserByEmailAndPassword,
                {
                    email: user?.email,
                    password: user?.password,
                }
            );

            setUser(newUser);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhone = async () => {
        setIsLoading(true);
        try {
            phoneRef.current.focus();
            // setPhone("");
            setIsFocused(!isFocused);

            if (isFocused) {
                if (phone.trim() !== "" && validatePhoneNumber(phone)) {
                    const newUser = await updateUser({
                        phone: phone,
                        email: user?.email,
                    });
                    setUser(newUser);
                } else {
                    Alert.alert("Invalid phone number");
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOnChangePhone = (text) => {
        setPhone(text);
    };

    const handleSignOut = () => {
        setUser(null);
    };

    console.log(pendingLEagues.length);

    return (
        <ScrollView className="px-4">
            <View className="flex-row items-center w-[100px] h-[100px] justify-center mt-12 relative mx-auto">
                {assets ? (
                    isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <Image
                            source={{
                                uri: user?.profile
                                    ? user?.profile
                                    : profileImage?.uri
                                      ? profileImage?.uri
                                      : assets[0]?.uri,
                            }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100,
                            }}
                        />
                    )
                ) : null}
                <TouchableOpacity
                    onPress={handleProfile}
                    className="absolute bottom-1 right-0 w-8 h-8 z-20 bg-white p-1 rounded-full"
                >
                    <EditIcon />
                </TouchableOpacity>
            </View>

            <View className="py-5">
                <Text className="text-2xl text-primary font-Do text-center font-bold ">
                    {user?.name}
                </Text>
                <Text className="text-base text-primary font-dmRegular text-center">
                    @{user?.userName}
                </Text>
            </View>
            <View className="flex-row justify-between items-start">
                <View>
                    <Text className="text-base font-Do">You'r an:</Text>
                    <Text className="text-base font-Do text-primary">
                        {user?.role}
                    </Text>
                </View>

                {user?.role === "Authority" && (
                    <View>
                        <TouchableOpacity className="p-2 bg-primary rounded-md mb-1">
                            <Text className="text-sm text-white font-dmRegular">
                                ({pendingLEagues?.length}) Pending League’s
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 bg-primary rounded-md">
                            <Text className="text-sm text-white font-dmRegular">
                                ({approvedLeages?.length}) Approved League’s
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {user?.role === "Admin" ? null : (
                <View className="mt-5">
                    <Text className="font-Do text-xl py-2">Info:</Text>
                    <Text className="font-dmRegular text-base">
                        Email: {user?.email}
                    </Text>
                    {user?.phone ? (
                        <Text className="font-dmRegular text-base">
                            Phone: {user?.phone}
                        </Text>
                    ) : (
                        <View className="flex-row items-center">
                            <Text className="font-dmRegular text-base">
                                Phone:{" "}
                            </Text>
                            <TextInput
                                value={phone}
                                className="text-base font-dmRegular"
                                ref={phoneRef}
                                onChangeText={handleOnChangePhone}
                            />
                            {isLoading ? (
                                <ActivityIndicator />
                            ) : (
                                <TouchableOpacity onPress={handlePhone}>
                                    <Text className="text-base font-dmRegular text-primary">
                                        Add Phone
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                    {!user?.phone && (
                        <Text className="text-xs text-textColor">
                            Please Add phone number carefully you can't change
                            it again
                        </Text>
                    )}
                </View>
            )}

            <IconsButton
                onpress={handleSignOut}
                Icon={SignoutIcon}
                text="Sign out"
            />
        </ScrollView>
    );
};

export default ProfileComponent;
