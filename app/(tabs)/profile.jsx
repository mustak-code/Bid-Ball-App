import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormBottomText from "../../components/FormBottomText";
import Header from "../../components/Header";
import ProfileComponent from "../../components/profileComponent";
import useStore from "../../store/store";

const profile = () => {
    const router = useRouter();

    const { user } = useStore((state) => state);

    return (
        <SafeAreaView className="h-full bg-white">
            <Header
                text={
                    user?.role === "Authority" || user?.role === "Team Manager"
                        ? "Profile"
                        : "Guest Mode"
                }
            />
            {user?.role === "Authority" || user?.role === "Team Manager" ? (
                <ProfileComponent />
            ) : (
                <View className="h-full items-center justify-center px-4">
                    <LottieView
                        source={require("../../assets/lottie-files/action.json")}
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
                        <FormBottomText
                            link="/login"
                            text="Already have an account?"
                            label="Login"
                        />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default profile;
