import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
    unsavedChangesWarning: false,
});

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Kalnia: require("../assets/fonts/Kalnia-Regular.ttf"),
        Do: require("../assets/fonts/DoHyeon-Regular.ttf"),
        dmBold: require("../assets/fonts/DMSans-Bold.ttf"),
        dmRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <ConvexProvider client={convex}>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar backgroundColor="#6C4BA4" animated />
        </ConvexProvider>
    );
}
