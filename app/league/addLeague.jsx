import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useConvex, useMutation } from "convex/react";
import { useAssets } from "expo-asset";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { useDebounce } from "../../hooks/useDebounce";
import useStore from "../../store/store";
import storeImageToDB from "../../utils/storeImageToDB";
import uplaodImage from "../../utils/uplaodImage";
const AddLeague = () => {
    const [assets, error] = useAssets([
        require("../../assets/images/ball.png"),
        require("../../assets/images/Profile_avatar_placeholder_large.png"),
    ]);
    const { user } = useStore((state) => state);
    const router = useRouter();
    const generateImageUploadUrl = useMutation(
        api.imageupload.generateImageUploadUrl
    );
    const getImageUrl = useMutation(api.imageupload.getImageUrl);
    const createNotification = useMutation(api.notification.createNotification);
    const createLeague = useMutation(api.leagues.createLeague);
    const updateAdminNotifications = useMutation(
        api.auth.updateAdminNotifications
    );
    // const getUserByRole = useQuery(api.auth.getUserByRole, {
    //     role: "Admin",
    // });
    const convex = useConvex();
    const [who, setWho] = useState("");
    const searchValue = useDebounce(who);
    const [isSearchEnabled, setIsSearchEnabled] = useState(false);
    const [selectePlayer, setSelectedPlayer] = useState([]);
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [leagueInfo, setLeagueInfo] = useState({
        leagueImage: "",
        leagueName: "",
        location: "",
        organizer: "",
        leagueFee: "",
        startingDate: "",
        endingDate: "",
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
    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);
            const data = await convex.query(api.player.searchPlayer, {
                name: searchValue,
            });
            setPlayers(data);
            // console.log(data);
            setIsLoading(false);
        };
        getUsers();
    }, [searchValue]);

    useEffect(() => {
        if (who !== "") {
            setIsSearchEnabled(true);
        } else {
            setIsSearchEnabled(false);
        }
    }, [who, setIsSearchEnabled]);

    const handleSelect = (player) => {
        const isExistsSelectedPlayer = selectePlayer.find(
            (p) => p._id === player._id
        );
        const isExistsLeagePlayer = leagueInfo.players.find(
            (p) => p === player._id
        );
        if (!isExistsSelectedPlayer) {
            setSelectedPlayer((prevPlayer) => [...prevPlayer, player]);
        }
        if (!isExistsLeagePlayer) {
            setLeagueInfo((prevLeageInfo) => ({
                ...prevLeageInfo,
                players: [...prevLeageInfo.players, player._id],
            }));
        }
    };

    const handleCancelPlayer = (playerId) => {
        const newSelectedPlayerArray = [...selectePlayer];
        const newLeagePlayerArray = [...leagueInfo.players];

        const newSelectedPlayer = newSelectedPlayerArray.filter(
            (p) => p._id !== playerId
        );
        const newLeagerPlayers = newLeagePlayerArray.filter(
            (id) => id !== playerId
        );
        setSelectedPlayer(newSelectedPlayer);
        setLeagueInfo((prevInfo) => ({
            ...prevInfo,
            players: newLeagerPlayers,
        }));
    };

    const handleApply = async () => {
        setIsLoading(true);
        try {
            if (leagueInfo.leagueName === "") {
                return Alert.alert("Put a league name");
            }
            if (leagueInfo.location === "") {
                return Alert.alert("Put a league Location");
            }
            if (leagueInfo.organizer === "") {
                return Alert.alert("please insert league organizer name");
            }
            if (leagueInfo.leagueFee === "") {
                return Alert.alert(
                    "please inster league fee and fee must be greater than 500"
                );
            }
            if (
                leagueInfo.startingDate === "" ||
                new Date(leagueInfo.startingDate) < new Date()
            ) {
                return Alert.alert(
                    "please select a Starting date and Starting date cannot be previous date"
                );
            }

            if (
                leagueInfo.endingDate === "" ||
                new Date(leagueInfo.startingDate) >
                    new Date(leagueInfo.endingDate)
            ) {
                return Alert.alert(
                    "please select a Ending date and ending date cannot be place before the starting date"
                );
            }

            if (selectePlayer.length === 0) {
                return Alert.alert("Please select some players");
            }
            if (leagueInfo.teamSize === "") {
                return Alert.alert("Please insert team size");
            }

            const league = await createLeague({
                leagueImage: leagueInfo.leagueImage || "",
                leagueName: leagueInfo.leagueName,
                leagueLocation: leagueInfo.location,
                organizer: leagueInfo.organizer,
                leagueFee: leagueInfo.leagueFee,
                startingDate: leagueInfo.startingDate.toString(),
                endingDate: leagueInfo.endingDate.toString(),
                players: leagueInfo.players,
                teamSize: leagueInfo.teamSize,
                createdBy: user._id,
                isPanding: true,
            });

            if (league.success) {
                const id = await createNotification({
                    userId: user._id,
                    LeagueId: league.leageId,
                    notificationText: `${user.name} Wants to create a league`,
                });
                await updateAdminNotifications({
                    notification: id.notificationId,
                });

                return Alert.alert(
                    "League created successfully",
                    "An Admin will approve the league please stay tuned",
                    [
                        {
                            text: "okay",
                            onPress: () => router.push(`/home`),
                        },
                    ]
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

        console.log(id);
    };

    return (
        <SafeAreaView>
            <Header text="Create a League" />

            <ScrollView
                className="p-5"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
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

                    <View className="relative">
                        <IconInput
                            Icon={ProfileIcon}
                            placeholder="Players"
                            type="text"
                            value={who}
                            // onBlur={() => isSearchEnabled()}
                            onType={(who) => setWho(who)}
                        />

                        {isSearchEnabled &&
                            (isLoading ? (
                                <ActivityIndicator />
                            ) : (
                                <View className="absolute top-full bg-white w-full z-20 h-auto max-h-[300px] p-4 mt-2">
                                    {players.length > 0 ? (
                                        <ScrollView
                                            contentContainerStyle={{
                                                flexGrow: 1,
                                            }}
                                            className=" h-[300px]"
                                            nestedScrollEnabled={true}
                                        >
                                            {players.map((player, i) => (
                                                <TouchableOpacity
                                                    key={player._id}
                                                    onPress={() =>
                                                        handleSelect(player)
                                                    }
                                                    className={`flex-row gap-3 justify-between bg-primary/10 p-2 rounded-lg mb-3 ${selectePlayer.find((p) => p._id === player._id) && "border border-red-300"}`}
                                                >
                                                    <View className="flex-row gap-3">
                                                        {assets &&
                                                            assets[0]?.uri && (
                                                                <Image
                                                                    source={{
                                                                        uri: player.dp,
                                                                    }}
                                                                    className="h-14 w-14 rounded-md"
                                                                />
                                                            )}
                                                        <View>
                                                            <Text className="font-Do text-base">
                                                                {player.name}
                                                            </Text>
                                                            <Text className="font-dmRegular text-sm">
                                                                {player.genre}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    ) : (
                                        <View>
                                            <Text>
                                                {searchValue} Not Found{" "}
                                            </Text>
                                            <Text className="text-sm">
                                                Please Add player first
                                            </Text>
                                            <IconsButton
                                                onpress={() =>
                                                    router.push(
                                                        "/player/addplayer"
                                                    )
                                                }
                                                isLoading={isLoading}
                                                Icon={PlusIcon}
                                                text="Add Player First"
                                            />
                                        </View>
                                    )}
                                </View>
                            ))}
                    </View>

                    {selectePlayer?.length > 0 && selectePlayer ? (
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            className="pl-6 h-auto max-h-[300px]"
                            nestedScrollEnabled={true}
                        >
                            {selectePlayer?.map((player, i) => (
                                <View
                                    key={i}
                                    className="flex-row gap-3 justify-between bg-primary/10 p-2 rounded-lg mb-3"
                                >
                                    <View className="flex-row gap-3">
                                        {assets && (
                                            <Image
                                                source={{
                                                    uri: player.dp,
                                                }}
                                                className=" h-14 w-14  rounded-md"
                                            />
                                        )}
                                        <View>
                                            <Text className="font-Do text-base">
                                                {player.name}
                                            </Text>
                                            <Text className="font-dmRegular text-sm">
                                                {player.genre}
                                            </Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() =>
                                            handleCancelPlayer(player._id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    ) : (
                        <View className="pl-6">
                            <Text className="font-dmRegular text-sm">
                                No Player Selected
                            </Text>
                        </View>
                    )}

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
                        onpress={handleApply}
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
