import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import {
    HomeIcon,
    HomeInactive,
    PlayerIcon,
    PlayerIconInactive,
    ProfileIcon,
    ProfileIconInactive,
} from "../../assets/icons/Icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 80,
                    paddingTop: 10,
                },
                animation: "shift",
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) =>
                        focused ? <HomeIcon /> : <HomeInactive />,
                    tabBarActiveTintColor: "#6C4BA4",
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: "medium",
                                fontFamily: "dmRegular",
                                lineHeight: 16,
                                color: focused ? "#6C4BA4" : "#D0D0D0",
                            }}
                        >
                            Home
                        </Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="players"
                options={{
                    title: "Player’s",
                    tabBarIcon: ({ focused }) =>
                        focused ? <PlayerIcon /> : <PlayerIconInactive />,
                    tabBarActiveTintColor: "#6C4BA4",
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: "medium",
                                fontFamily: "dmRegular",
                                lineHeight: 16,
                                color: focused ? "#6C4BA4" : "#D0D0D0",
                            }}
                        >
                            Player's
                        </Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) =>
                        focused ? <ProfileIcon /> : <ProfileIconInactive />,
                    tabBarActiveTintColor: "#6C4BA4",
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: "medium",
                                fontFamily: "dmRegular",
                                lineHeight: 16,
                                color: focused ? "#6C4BA4" : "#D0D0D0",
                            }}
                        >
                            Profile
                        </Text>
                    ),
                }}
            />
        </Tabs>
    );
}
