import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
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
import { PlusIcon, ProfileIcon } from "../../assets/icons/Icons";
import AddImageBtn from "../../components/AddImageBtn";
import Header from "../../components/Header";
import IconInput from "../../components/IconInput";
import IconsButton from "../../components/IconsButton";
const AddLeague = () => {
    const [assets, error] = useAssets([
        require("../../assets/images/ball.png"),
        require("../../assets/images/Profile_avatar_placeholder_large.png"),
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [leagueInfo, setLeagueInfo] = useState({
        leagueImage: "",
        leagueName: "",
        organizer: "",
        leagueFee: "",
        startingDate: new Date(),
        endingDate: new Date(),
        players: [],
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
            startingDate: currentDate,
        });
    };

    const handleDatePicker = ({ f }) => {
        DateTimePickerAndroid.open({
            value:
                f === "starting"
                    ? leagueInfo.startingDate
                    : leagueInfo.endingDate,
            onChange:
                f === "starting" ? onStartingDateChange : onEndingDateChange,
            mode: "date",
            is24Hour: true,
        });
    };

    console.log(new Date(leagueInfo?.startingDate).toLocaleDateString());

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
                                        ? leagueInfo?.leagueImage
                                        : assets[0].uri,
                                }}
                                className=" h-[150px] w-full  rounded-md"
                            />
                        ))}
                </View>
                <AddImageBtn />
                <Text className="font-Do text-xl text-textColor py-3">
                    Add Info
                </Text>

                <View className="gap-3">
                    <IconInput
                        Icon={ProfileIcon}
                        placeholder="League Name"
                        type="text"
                        value={leagueInfo.name}
                        onType={(name) =>
                            setLeagueInfo({ ...leagueInfo, name })
                        }
                    />
                    <IconInput
                        Icon={ProfileIcon}
                        placeholder="Location"
                        type="text"
                        value={leagueInfo.name}
                        onType={(name) =>
                            setLeagueInfo({ ...leagueInfo, name })
                        }
                    />
                    <IconInput
                        Icon={ProfileIcon}
                        placeholder="Organizer"
                        type="text"
                        value={leagueInfo.name}
                        onType={(name) =>
                            setLeagueInfo({ ...leagueInfo, name })
                        }
                    />

                    <IconInput
                        Icon={ProfileIcon}
                        placeholder="League Fee"
                        type="text"
                        keyboardType="number-pad"
                        value={leagueInfo.name}
                        onType={(name) =>
                            setLeagueInfo({ ...leagueInfo, name })
                        }
                    />
                    <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
                        <View>
                            <ProfileIcon />
                        </View>
                        <TouchableOpacity
                            onPress={() => handleDatePicker({ f: "staring" })}
                        >
                            <Text className="py-3 text-sm w-full text-textColor/80 font-dmBold">
                                Starting Date
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="bg-primary/10 px-3 rounded-xl flex-row items-center gap-3">
                        <View>
                            <ProfileIcon />
                        </View>
                        <TouchableOpacity
                            onPress={() => handleDatePicker({ f: "ending" })}
                        >
                            <Text className="py-3 text-sm w-full text-textColor/80 font-dmBold">
                                Ending Date
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <IconInput
                        Icon={ProfileIcon}
                        placeholder="Players"
                        type="text"
                        value={leagueInfo.name}
                        onType={(name) =>
                            setLeagueInfo({ ...leagueInfo, name })
                        }
                    />
                    <IconInput
                        Icon={ProfileIcon}
                        placeholder="Team Size"
                        type="text"
                        keyboardType="number-pad"
                        value={leagueInfo.name}
                        onType={(name) =>
                            setLeagueInfo({ ...leagueInfo, name })
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
