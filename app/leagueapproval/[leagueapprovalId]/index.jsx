import { useConvex } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import { api } from "../../../convex/_generated/api";

const LeagueApproval = () => {
    const { leagueapprovalId } = useLocalSearchParams();
    const convex = useConvex();
    const [league, setLeague] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getLeague = async () => {
            setIsLoading(true);
            try {
                const league = await convex.query(api.leagues.getSingleLeague, {
                    leagueId: leagueapprovalId,
                });

                setLeague(league);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getLeague();
    }, [convex, leagueapprovalId]);

    return (
        <SafeAreaView>
            <Header text="League Approval" />
            <Text>{leagueapprovalId}</Text>
        </SafeAreaView>
    );
};

export default LeagueApproval;
