import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useConvex, usePaginatedQuery } from "convex/react";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    Text,
    View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingIcon, PlusIcon } from "../../assets/icons/Icons";
import Header from "../../components/Header";
import IconsButton from "../../components/IconsButton";
import InfoView from "../../components/InfoView";
import PlayerCard from "../../components/PlayerCard";
import { api } from "../../convex/_generated/api";
import useStore from "../../store/store";

const Players = () => {
    const { user, currentPlayerSelected } = useStore((state) => state);
    const [refreshing, setRefreshing] = useState(false);
    const [playerInfo, setPlayerInfo] = useState({});
    const convex = useConvex();

    const router = useRouter();
    const { results, status, loadMore, isLoading } = usePaginatedQuery(
        api.player.getPlayers,
        {},
        {
            initialNumItems: 2,
        }
    );
    const bottomSheetModalRef = useRef(null);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const handlePresentModalPress = useCallback(() => {
        const getPlayer = async () => {
            if (!currentPlayerSelected == "") {
                const player = await convex.query(api.player.getSinglePlayer, {
                    id: currentPlayerSelected,
                });

                setPlayerInfo(player);
            }
        };

        getPlayer();
        bottomSheetModalRef.current?.present();
    }, [currentPlayerSelected]);
    const snapPoints = useMemo(() => ["50%", "90%"], []);
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <SafeAreaView className="h-full w-full bg-white">
                    <Header text="Player’s Matrix" />
                    {user?.role === "Authority" && (
                        <View className="px-4">
                            <IconsButton
                                onpress={() => router.push("/player/addplayer")}
                                Icon={PlusIcon}
                                text={"Add Player"}
                            />
                        </View>
                    )}

                    <View>
                        <View className="px-4 mt-4">
                            <FlatList
                                renderItem={({ item }) => {
                                    return (
                                        <PlayerCard
                                            showBottomSheet={
                                                handlePresentModalPress
                                            }
                                            data={item}
                                            key={item._id}
                                        />
                                    );
                                }}
                                data={results}
                                keyExtractor={(item) => item._id}
                                ItemSeparatorComponent={(item) => (
                                    <View
                                        key={item._id}
                                        className="py-2"
                                    ></View>
                                )}
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: 165,
                                }}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() =>
                                    isLoading ? (
                                        <ActivityIndicator />
                                    ) : (
                                        <Text> There no Players </Text>
                                    )
                                }
                                ListFooterComponent={() =>
                                    status === "Exhausted" ? null : (
                                        <IconsButton
                                            isLoading={isLoading}
                                            Icon={LoadingIcon}
                                            text="Load More"
                                            onpress={() => loadMore(5)}
                                        />
                                    )
                                }
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                            />
                        </View>
                    </View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        // onChange={handleSheetChanges}
                        snapPoints={snapPoints}
                    >
                        <BottomSheetView className="flex-1 p-4">
                            <View className="flex-row gap-4">
                                <Image
                                    source={{ uri: playerInfo?.dp }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 6,
                                    }}
                                />
                                <View>
                                    <Text className="text-xl font-Do font-normal text-textColor mb-2">
                                        {playerInfo?.name}
                                    </Text>
                                    <Text className="text-base font-Do font-normal text-textColor mb-2">
                                        {playerInfo?.genre}
                                    </Text>
                                    <Text className="text-base font-Do font-normal text-textColor mb-2">
                                        {playerInfo?.handed}
                                    </Text>
                                </View>
                            </View>

                            <Text className="text-xl font-Do font-normal text-textColor my-3">
                                Information
                            </Text>

                            <View>
                                <InfoView label="Age" data={playerInfo?.age} />
                                <InfoView
                                    label="Location"
                                    data={playerInfo?.location}
                                />
                                <InfoView
                                    label="Total Match Played"
                                    data={playerInfo?.totalMatchPlayed}
                                />
                                <InfoView
                                    label="Phone Number"
                                    data={playerInfo?.mobile}
                                />
                                <InfoView
                                    label="Email"
                                    data={playerInfo?.email}
                                />
                                <InfoView
                                    label="Minimum Bid Amount"
                                    data={playerInfo?.minimunBidAmount}
                                />
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </SafeAreaView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

export default Players;
