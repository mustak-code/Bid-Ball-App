import { useMutation } from "convex/react";
import { useAssets } from "expo-asset";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
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
import Header from "../../components/Header";
import IconInput from "../../components/IconInput";
import IconsButton from "../../components/IconsButton";
import { api } from "../../convex/_generated/api";
import useStore from "../../store/store";
import { validateEmail, validatePhoneNumber } from "../../utils/getValidate";
import storeImageToDB from "../../utils/storeImageToDB";
import uplaodImage from "../../utils/uplaodImage";

const AddPlayer = () => {
    const [assets, error] = useAssets([
        require("../../assets/images/ball.png"),
        require("../../assets/images/Profile_avatar_placeholder_large.png"),
    ]);
    const router = useRouter();
    const { user } = useStore((state) => state);
    const generateImageUploadUrl = useMutation(
        api.imageupload.generateImageUploadUrl
    );
    const getImageUrl = useMutation(api.imageupload.getImageUrl);
    const createPlayer = useMutation(api.player.createPlayer);

    const [isLoading, setIsLoading] = useState(false);
    const [playerInfo, setPlayerInfo] = useState({
        profileImage: "",
        name: "",
        minimumAmount: "",
        age: "",
        location: "",
        phone: "",
        email: "",
        category: "",
        handed: "",
    });

    const handleProfileUpload = async () => {
        setIsLoading(true);

        try {
            const image = await uplaodImage();
            setPlayerInfo({
                ...playerInfo,
                profileImage: image,
            });

            const uploadUrl = await generateImageUploadUrl();
            const uplaodResponse = await storeImageToDB(image, uploadUrl);
            const { storageId } = await uplaodResponse.json();
            const imageUrl = await getImageUrl({ storageId });

            setPlayerInfo({
                ...playerInfo,
                profileImage: imageUrl,
            });
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (!playerInfo.name) {
                Alert.alert(
                    "Please enter Player's name",
                    "A name must be provided"
                );
                return;
            }
            if (
                parseInt(playerInfo.minimumAmount) < 500 ||
                !playerInfo.minimumAmount ||
                playerInfo.minimumAmount.trim().length === 0
            ) {
                Alert.alert(
                    "Enter Minimum Bidding amount",
                    "Minimum Bidding amount is 500"
                );
                return;
            }
            if (!playerInfo.age || playerInfo.age.trim().length === 0) {
                Alert.alert("Age is missing", "Please enter Age");
                return;
            }
            if (
                !playerInfo.location ||
                playerInfo.location.trim().length === 0
            ) {
                Alert.alert(
                    "Enter a location",
                    "Please enter player's location"
                );
                return;
            }
            if (!playerInfo.phone || !validatePhoneNumber(playerInfo.phone)) {
                Alert.alert(
                    "Please enter your valid Phone Number",
                    "A valid Phone number must be provided"
                );
                return;
            }

            if (!playerInfo.email || !validateEmail(playerInfo.email)) {
                Alert.alert(
                    "Please enter Player's valid email",
                    "A valid email must be provided"
                );
                return;
            }

            if (
                !playerInfo.category ||
                playerInfo.category.trim().length === 0
            ) {
                Alert.alert("Please Choose player's Category");
                return;
            }
            if (!playerInfo.handed || playerInfo.handed.trim().length === 0) {
                Alert.alert("Please Choose Player's Hand");
                return;
            }

            const player = await createPlayer({
                name: playerInfo.name,
                dp: playerInfo.profileImage,
                genre: playerInfo.category,
                handed: playerInfo.handed,
                age: playerInfo.age,
                location: playerInfo.location,
                totalMatchPlayed: 0,
                mobile: playerInfo.phone,
                email: playerInfo.email,
                minimunBidAmount: playerInfo.minimumAmount,
                addedBy: user._id,
            });

            if (player?.success) {
                Alert.alert("Player Added successfully", "", [
                    {
                        text: "Okay",
                        onPress: () => {
                            router.push("/players");
                        },
                    },
                ]);
            } else {
                Alert.alert("Player already Exists with this email");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <Header text="Add Player" />
            <ScrollView
                className="p-5"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row gap-3">
                    {assets &&
                        (isLoading ? (
                            <ActivityIndicator />
                        ) : (
                            <Image
                                source={{
                                    uri: playerInfo?.profileImage
                                        ? playerInfo?.profileImage
                                        : assets[1].uri,
                                }}
                                className="w-[100px] h-[100px] aspect-square rounded-md"
                            />
                        ))}
                    <View>
                        <Text className="font-Do text-xl text-textColor mb-3">
                            Add Image
                        </Text>
                        <TouchableOpacity
                            onPress={handleProfileUpload}
                            className="flex-row border border-primary py-3 px-3 rounded items-center gap-1"
                        >
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
                    <IconInput
                        Icon={ProfileIcon}
                        placeholder="Name"
                        type="text"
                        onType={(name) =>
                            setPlayerInfo({ ...playerInfo, name })
                        }
                    />
                    <IconInput
                        Icon={DollarIcon}
                        placeholder="Minimum Bidding amount"
                        type="text"
                        onType={(minimumAmount) =>
                            setPlayerInfo({ ...playerInfo, minimumAmount })
                        }
                    />
                    <IconInput
                        Icon={HashIcon}
                        placeholder="Age"
                        type="text"
                        onType={(age) => setPlayerInfo({ ...playerInfo, age })}
                    />
                    <IconInput
                        Icon={LocationBigIcon}
                        placeholder="Location"
                        type="text"
                        onType={(location) =>
                            setPlayerInfo({ ...playerInfo, location })
                        }
                    />
                    <IconInput
                        Icon={PhoneIcon}
                        placeholder="Phone"
                        type="text"
                        onType={(phone) =>
                            setPlayerInfo({ ...playerInfo, phone })
                        }
                    />
                    <IconInput
                        Icon={EmailIcon}
                        placeholder="Email"
                        type="text"
                        onType={(email) =>
                            setPlayerInfo({ ...playerInfo, email })
                        }
                    />
                </View>

                <Text className="font-Do text-xl text-textColor py-3">
                    Category
                </Text>

                <View className="gap-2">
                    <Checkbox
                        onClick={() => {
                            setPlayerInfo({
                                ...playerInfo,
                                category: "Batsman",
                            });
                        }}
                        text="Batsman"
                        value={playerInfo?.category}
                    />
                    <Checkbox
                        onClick={() => {
                            setPlayerInfo({
                                ...playerInfo,
                                category: "Bowler",
                            });
                        }}
                        text="Bowler"
                        value={playerInfo?.category}
                    />
                    <Checkbox
                        onClick={() => {
                            setPlayerInfo({
                                ...playerInfo,
                                category: "All Rounder",
                            });
                        }}
                        text="All Rounder"
                        value={playerInfo?.category}
                    />
                </View>
                <Text className="font-Do text-xl text-textColor py-3">
                    Handed
                </Text>

                <View className="gap-2">
                    <Checkbox
                        onClick={() => {
                            setPlayerInfo({
                                ...playerInfo,
                                handed: "Left Handed",
                            });
                        }}
                        text="Left Handed"
                        value={playerInfo?.handed}
                    />
                    <Checkbox
                        onClick={() => {
                            setPlayerInfo({
                                ...playerInfo,
                                handed: "Right Handed",
                            });
                        }}
                        text="Right Handed"
                        value={playerInfo?.handed}
                    />
                </View>

                <View className="pb-10">
                    <IconsButton
                        onpress={handleSubmit}
                        Icon={isLoading ? ActivityIndicator : PlusIcon}
                        isLoading={isLoading}
                        text="Add"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddPlayer;
