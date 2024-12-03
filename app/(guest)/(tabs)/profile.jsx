import { Link, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";

const profile = () => {
    const router = useRouter();
    return (
        <SafeAreaView className="h-full bg-white">
            <Header text="Guest Mode" />
            <View className="h-full items-center justify-center px-4">
                <LottieView
                    source={require("../../../assets/lottie-files/action.json")}
                    autoPlay={true}
                    loop
                    style={{
                        width: "100%",
                        height: 200,
                    }}
                />
                <View className="">
                    <Text className="text-[32px] font-Do text-center text-textColor mb-3">
                        Sign up
                    </Text>
                    <Text className="font-Do font-normal text-base text-textColor text-center mb-9">
                        Sign up to Create League, Manage League or Bid any
                        players
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("/signup")}
                        className="bg-cardBg rounded-md py-3 mb-4"
                    >
                        <Text className="text-xl font-dmRegular font-normal text-center text-textColor">
                            Sign up
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row items-center justify-center">
                        <Text className="text-sm font-dmRegular text-textColor">
                            Already have an account?{" "}
                        </Text>
                        <Link
                            href="/login"
                            className="text-primary text-sm font-dmBold"
                        >
                            Login
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default profile;
