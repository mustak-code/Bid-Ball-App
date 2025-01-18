import { useConvex, useMutation } from "convex/react";
import { useAssets } from "expo-asset";

import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { EditIcon, SignoutIcon } from "../assets/icons/Icons";
import { api } from "../convex/_generated/api";
import useStore from "../store/store";
import IconsButton from "./IconsButton";

const ProfileComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [phone, setPhone] = useState("N/A");
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
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (res.canceled) {
                console.log("Image picking canceled.");
                return;
            }

            // Set the selected image
            const image = res.assets[0];
            setProfileImage(image);

            // Get a signed upload URL from Convex
            const uploadUrl = await generateImageUploadUrl();

            // Fetch the image as a Blob
            const response = await fetch(image.uri);
            const blob = await response.blob();

            // Upload the image to Convex storage
            const uploadResponse = await fetch(uploadUrl, {
                method: "POST",
                headers: {
                    "Content-Type": blob.type, // Dynamically set the MIME type
                },
                body: blob, // Send the image blob
            });

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload image to storage.");
            }

            // Get the storage ID from the response
            const { storageId } = await uploadResponse.json();

            // Generate a public URL for the image
            const imageUrl = await getImageUrl({ storageId });

            // Save image details in the database
            await sendImageToDatabase({
                storageId: imageUrl,
                user: user?.email,
            });

            // Fetch updated user details from Convex
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
        phoneRef.current.focus();
        setIsFocused(true);
        setPhone("");
        if (isFocused) {
            phoneRef.current.blur();
            setIsFocused(false);
            if (phone === "") {
                setPhone("N/A");
            } else {
                if (phone !== "") {
                    const newUser = await updateUser({
                        phone: phone,
                        email: user?.email,
                    });
                    setUser(newUser);
                }
            }
        }
    };

    const handleOnChangePhone = (text) => {
        setPhone(text);
        console.log(text);
    };
    const onpress = () => {
        setIsFocused(true);
        setPhone("");
    };
    const handleonblur = () => {
        if (isFocused) {
            phoneRef.current.blur();
            setIsFocused(false);
            if (phone === "") {
                setPhone("N/A");
            }
        }
    };

    const handleSignOut = () => {
        setUser(null);
    };

    return (
        <View className="px-4">
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

                <TouchableOpacity className="p-2 bg-primary rounded-md">
                    <Text className="text-sm text-white font-dmRegular">
                        See Pending League’s (0)
                    </Text>
                </TouchableOpacity>
            </View>

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
                            onFocus={onpress}
                            onBlur={handleonblur}
                        />
                        <TouchableOpacity onPress={handlePhone}>
                            <Text className="text-base font-dmRegular text-primary">
                                Add Phone
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <IconsButton
                onpress={handleSignOut}
                Icon={SignoutIcon}
                text="Sign out"
            />
        </View>
    );
};

export default ProfileComponent;
