import { useConvex } from "convex/react";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlusIcon } from "../../assets/icons/Icons";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import IconsButton from "../../components/IconsButton";
import League from "../../components/League";
import { api } from "../../convex/_generated/api";
import useStore from "../../store/store";
export default function Home() {
    const { user } = useStore((store) => store);
    const router = useRouter();
    const [leagues, setLeauges] = useState([]);
    const convex = useConvex();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getLeagues = async () => {
            setIsLoading(true);
            try {
                const eachLeague = await convex.query(api.leagues.getLeagues);
                setLeauges(eachLeague);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getLeagues();
    }, [convex, api.leagues.getLeagues]);

    return (
        <SafeAreaView className="bg-white h-full w-full">
            <Header text="Bid Ball" />
            <View className="px-4">
                {user?.role === "Authority" && (
                    <IconsButton
                        Icon={PlusIcon}
                        onpress={() => router.push("/league/addLeague")}
                        text={"Create a League"}
                    />
                )}
            </View>
            <View className="px-4 mt-4">
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={leagues}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <League user={user} league={item} />
                        )}
                        ListHeaderComponent={() => (
                            <Heading text="On Going League’s" />
                        )}
                        ItemSeparatorComponent={() => (
                            <View className="py-2"></View>
                        )}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: 165,
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => <Text>There no League</Text>}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
