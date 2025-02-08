import LottieView from "lottie-react-native";
import { useRef } from "react";
import { ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

import { Redirect } from "expo-router";
import bgImage from "../assets/images/bg-image-2.png";
import footBallLottie from "../assets/lottie-files/football.json";
import useStore from "../store/store";

export default function Index() {
    const animateFootBall = useRef(null);
    const { user } = useStore((store) => store);

    if (user?.isVerified) {
        return <Redirect href="/home" />;
    }

    return (
        <SafeAreaView>
            <ImageBackground
                source={bgImage}
                resizeMode="cover"
                className="h-full"
            >
                <View className="items-center justify-between h-full ">
                    <LottieView
                        style={{
                            width: "100%",
                            height: 300,
                        }}
                        autoPlay={true}
                        ref={animateFootBall}
                        source={footBallLottie}
                    />
                    <View className="items-end justify-center w-full px-10 gap-5 pb-32">
                        <CustomButton
                            link="/login"
                            label="Continue as Authority"
                            className="opacity-90"
                        />
                        <CustomButton
                            link="/login"
                            label="Continue as Team Manager"
                            className="opacity-90"
                        />
                        <CustomButton
                            link="/home"
                            label="Continue as Guest"
                            className="opacity-90"
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
