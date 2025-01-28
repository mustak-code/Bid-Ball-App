import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useMutation } from "convex/react";
import { useAssets } from "expo-asset";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    DeleteIcon,
    EndingIcon,
    LeagueFeeIcon,
    LeagueNameIcon,
    LocationBigIcon,
    OrganizerIcon,
    PlayIcon,
    PlusIcon,
    ProfileIcon,
    TeamSIzeIcon,
} from "../../assets/icons/Icons";
import AddImageBtn from "../../components/AddImageBtn";
import Header from "../../components/Header";
import IconInput from "../../components/IconInput";
import IconsButton from "../../components/IconsButton";
import { api } from "../../convex/_generated/api";
import storeImageToDB from "../../utils/storeImageToDB";
import uplaodImage from "../../utils/uplaodImage";
const AddLeague = () => {
    const [assets, error] = useAssets([
        require("../../assets/images/ball.png"),
        require("../../assets/images/Profile_avatar_placeholder_large.png"),
    ]);
    const generateImageUploadUrl = useMutation(
        api.imageupload.generateImageUploadUrl
    );
    const getImageUrl = useMutation(api.imageupload.getImageUrl);
    const [who, setWho] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [leagueInfo, setLeagueInfo] = useState({
        leagueImage: "",
        leagueName: "",
        location: "",
        organizer: "",
        leagueFee: "",
        startingDate: "",
        endingDate: "",
        players: [
            {
                id: 1,
                name: "Player1",
            },
        ],
        teamSize: "",
        createdBy: "",
    });
    const onStartingDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setLeagueInfo({
            ...leagueInfo,
            startingDate: currentDate,
        });
    };
    const onEndingDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setLeagueInfo({
            ...leagueInfo,
            endingDate: currentDate,
        });
    };

    const handleDatePicker = ({ f }) => {
        DateTimePickerAndroid.open({
            value: new Date(),
            onChange:
                f === "starting" ? onStartingDateChange : onEndingDateChange,
            mode: "date",
            is24Hour: true,
        });
    };

    const handleUploadCover = async () => {
        setIsLoading(true);

        try {
            const image = await uplaodImage();
            const uploadUrl = await generateImageUploadUrl();
            const uplaodResponse = await storeImageToDB(image, uploadUrl);
            const { storageId } = await uplaodResponse.json();
            const imageUrl = await getImageUrl({ storageId });
            setLeagueInfo({
                ...leagueInfo,
                leagueImage: imageUrl,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <Header text="Create a League" />

            <ScrollView
                className="p-5"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="pb-3">
                    {assets &&
                        (isLoading ? (
                            <ActivityIndicator />
                        ) : (
                            <Image
                                source={{
                                    uri: leagueInfo?.leagueImage
                                        ? leagueInfo.leagueImage
                                        : assets[0].uri,
                                }}
                                className=" h-[150px] w-full  rounded-md"
                            />
                        ))}
                </View>
                <AddImageBtn onpress={handleUploadCover} />
                <Text className="font-Do text-xl text-textColor py-3">
                    Add Info
                </Text>

                <View className="gap-3">
                    <IconInput
                        Icon={LeagueNameIcon}
                        placeholder="League Name"
                        type="text"
                        value={leagueInfo.leagueName}
                        onType={(leagueName) =>
                            setLeagueInfo({ ...leagueInfo, leagueName })
                        }
                    />
                    <IconInput
                        Icon={LocationBigIcon}
                        placeholder="Location"
                        type="text"
                        value={leagueInfo.location}
                        onType={(location) =>
                            setLeagueInfo({ ...leagueInfo, location })
                        }
                    />
                    <IconInput
                        Icon={OrganizerIcon}
                        placeholder="Organizer"
                        type="text"
                        value={leagueInfo.organizer}
                        onType={(organizer) =>
                            setLeagueInfo({ ...leagueInfo, organizer })
                        }
                    />

                    <IconInput
                        Icon={LeagueFeeIcon}
                        placeholder="League Fee"
                        type="text"
                        keyboardType="number-pad"
                        value={leagueInfo.leagueFee}
                        onType={(leagueFee) =>
                            setLeagueInfo({ ...leagueInfo, leagueFee })
                        }
                    />
                    <TouchableOpacity
                        onPress={() => handleDatePicker({ f: "starting" })}
                        className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3"
                    >
                        <View>
                            <PlayIcon />
                        </View>
                        <Text className="py-3 text-sm w-full text-textColor/80 font-dmBold">
                            {leagueInfo?.startingDate !== ""
                                ? leagueInfo?.startingDate?.toDateString()
                                : "Starting Date"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDatePicker({ f: "ending" })}
                        className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3"
                    >
                        <View>
                            <EndingIcon />
                        </View>
                        <Text className="py-3 text-sm w-full text-textColor/80 font-dmBold">
                            {leagueInfo?.endingDate !== ""
                                ? leagueInfo?.endingDate?.toDateString()
                                : "Ending Date"}
                        </Text>
                    </TouchableOpacity>

                    <IconInput
                        Icon={ProfileIcon}
                        placeholder="Players"
                        type="text"
                        value={who}
                        onType={(who) => setWho(who)}
                    />

                    <View className="pl-6">
                        <View className="flex-row gap-3 justify-between">
                            <View className="flex-row gap-3">
                                {assets && (
                                    <Image
                                        source={{
                                            uri: assets[0].uri,
                                        }}
                                        className=" h-14 w-14  rounded-md"
                                    />
                                )}
                                <View>
                                    <Text className="font-Do text-base">
                                        Mustak Ahmed Khan
                                    </Text>
                                    <Text className="font-dmRegular text-sm">
                                        All Rounder
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity>
                                <DeleteIcon />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <IconInput
                        Icon={TeamSIzeIcon}
                        placeholder="Team Size"
                        type="text"
                        keyboardType="number-pad"
                        value={leagueInfo.teamSize}
                        onType={(teamSize) =>
                            setLeagueInfo({ ...leagueInfo, teamSize })
                        }
                    />
                </View>
                <View className="pb-10">
                    <IconsButton
                        // onpress={handleSubmit}
                        Icon={isLoading ? ActivityIndicator : PlusIcon}
                        isLoading={isLoading}
                        text="Apply"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddLeague;
