import { useMutation } from "convex/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VerifyInput from "../../../components/verifyInput";
import { api } from "../../../convex/_generated/api";

const verify = () => {
    const [enteredCode, setEnteredCode] = useState(0);
    const { userEmail } = useLocalSearchParams();
    const verifyUser = useMutation(api.auth.verifyUser);
    const router = useRouter();

    const onVerification = async () => {
        const data = await verifyUser({
            email: userEmail,
            verificationCode: enteredCode,
        });

        if (data?.success) {
            Alert.alert("Thanks for verification", "", [
                {
                    text: "Done",
                    onPress: () => router.push(`/login`),
                },
            ]);
        }
    };

    return (
        <SafeAreaView>
            <LottieView
                source={require("../../../assets/lottie-files/verifyOtp.json")}
                style={{
                    width: "100%",
                    height: 200,
                }}
                autoPlay={true}
            />

            <Text className="text-2xl font-bold font-Do text-center">
                Please Enter OTP
            </Text>

            <View className="flex-row gap-3 items-center justify-center mt-10">
                <VerifyInput length={4} setCode={setEnteredCode} />
            </View>

            <TouchableOpacity
                onPress={onVerification}
                className="bg-primary w-1/2 py-5 px-10 rounded-full ml-auto mr-auto mt-10"
            >
                <Text className="text-white font-medium text-base text-center">
                    Verify
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default verify;
