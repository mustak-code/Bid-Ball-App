import LottieView from "lottie-react-native";
import { useRef } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

import footBallLottie from "../assets/lottie-files/football.json";

export default function Index() {
    const animateFootBall = useRef(null);
    return (
        <SafeAreaView>
            <View className="items-center justify-center ">
                <LottieView
                    style={{
                        width: "100%",
                        height: 300,
                    }}
                    autoPlay={true}
                    ref={animateFootBall}
                    source={footBallLottie}
                />
                <View className="items-center justify-center w-full px-10 gap-5">
                    <CustomButton
                        link="/signup"
                        label="Continue as Authority"
                    />
                    <CustomButton
                        link="/signup"
                        label="Continue as Team Manager"
                    />
                    <CustomButton
                        link="/(guest)/guesthome"
                        label="Continue as Guest"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
