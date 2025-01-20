import { usePaginatedQuery } from "convex/react";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingIcon, PlusIcon } from "../../assets/icons/Icons";
import Header from "../../components/Header";
import IconsButton from "../../components/IconsButton";
import PlayerCard from "../../components/PlayerCard";
import { api } from "../../convex/_generated/api";
import useStore from "../../store/store";

const Players = () => {
    const { user } = useStore((state) => state);
    const [refreshing, setRefreshing] = useState(false);

    const router = useRouter();
    const { results, status, loadMore, isLoading } = usePaginatedQuery(
        api.player.getPlayers,
        {},
        {
            initialNumItems: 2,
        }
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
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
                            return <PlayerCard data={item} key={item._id} />;
                        }}
                        data={results}
                        keyExtractor={(item) => item._id}
                        ItemSeparatorComponent={(item) => (
                            <View key={item._id} className="py-2"></View>
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
        </SafeAreaView>
    );
};

export default Players;
