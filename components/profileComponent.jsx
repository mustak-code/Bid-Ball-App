import { useConvex, useMutation } from "convex/react";
import { useAssets } from "expo-asset";

import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
    const [allLeagues, setAllLeagues] = useState([]);
    const convex = useConvex();
    const router = useRouter();
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
        require("../assets/images/ball.png"),
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

    useEffect(() => {
        const getAllLeagues = async () => {
            const allLeagues = await convex.query(api.leagues.getAllLeagues);

            const pendingLeagues = allLeagues.reduce((prev, curr) => {
                if (curr.isPanding) {
                    prev.push(curr);
                }
                return prev;
            }, []);

            setAllLeagues(pendingLeagues);
        };
        getAllLeagues();
    }, []);

    console.log(allLeagues.length);

    return (
        <ScrollView className="px-4 h-full" nestedScrollEnabled={true}>
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
                <Text className="text-2xl text-white font-Do text-center font-bold ">
                    {user?.name}
                </Text>
                <Text className="text-base text-white/70 font-dmRegular text-center">
                    @{user?.userName}
                </Text>
            </View>
            <View className="flex-row justify-between items-start">
                <View>
                    <Text className="text-base text-white font-Do">Role: </Text>
                    <Text className="text-base font-Do text-white/70">
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
                {user?.role === "Admin" && (
                    <TouchableOpacity
                        onPress={handleSignOut}
                        className="p-2 bg-primary rounded-md mb-1"
                    >
                        <Text className="text-sm text-white font-dmRegular">
                            Sign out
                        </Text>
                    </TouchableOpacity>
                )}
                {user?.role === "Team Manager" && (
                    <View>
                        <Text className="text-base text-white font-Do">
                            Balance
                        </Text>
                        <Text className="text-base text-white/70">
                            {user?.balance} ৳
                        </Text>
                    </View>
                )}
            </View>

            {user?.role === "Admin" ? (
                <View>
                    <Text className="text-base text-black font-Do my-3">
                        ({allLeagues?.length}) Pending League’s Request
                    </Text>
                    {allLeagues.map((allLeague) => (
                        <View
                            key={allLeague._id}
                            className={`flex-row gap-3 items-center justify-between bg-primary/10 p-2 rounded-lg mb-3`}
                        >
                            <View className="flex-row gap-3">
                                {assets && (
                                    <Image
                                        source={{
                                            uri: allLeague?.leagueImage
                                                ? allLeague.leagueImage
                                                : assets[1].uri,
                                        }}
                                        className="h-14 w-14 rounded-md"
                                    />
                                )}
                                <View>
                                    <Text className="font-Do text-base">
                                        {allLeague.leagueName}
                                    </Text>
                                    <Text className="font-dmRegular text-sm">
                                        {allLeague.organizer}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() =>
                                    router.push(
                                        `/leagueapproval/${allLeague._id}`
                                    )
                                }
                                className="p-2 bg-primary rounded-md mb-1"
                            >
                                <Text className="text-sm text-white font-dmRegular">
                                    Approve
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ) : (
                <View className="mt-5">
                    <Text className="font-Do text-xl py-2 text-white/70">
                        Information:
                    </Text>
                    <Text className="font-dmRegular text-base text-white mb-2">
                        Email: {user?.email}
                    </Text>
                    {user?.phone ? (
                        <Text className="font-dmRegular text-base text-white">
                            Phone: {user?.phone}
                        </Text>
                    ) : (
                        <View className="flex-row items-center">
                            <Text className="font-dmRegular text-base text-white">
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
            {user?.role === "Team Manager" && (
                <TouchableOpacity className="p-2 bg-primary rounded-md mb-1 mt-3">
                    <Text className="text-sm text-white font-dmRegular">
                        {user?.myLeagues?.length} My Leagues
                    </Text>
                </TouchableOpacity>
            )}

            {user?.role !== "Admin" && (
                <IconsButton
                    onpress={handleSignOut}
                    Icon={SignoutIcon}
                    text="Sign out"
                />
            )}
        </ScrollView>
    );
};

export default ProfileComponent;
