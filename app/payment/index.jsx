import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, ImageBackground, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CashIcon, CashIconWhite, PhoneIcon } from "../../assets/icons/Icons";
import bgImage from "../../assets/images/bg-image-1.png";
import IconInput from "../../components/IconInput";
import IconsButton from "../../components/IconsButton";
import { api } from "../../convex/_generated/api";
import useStore from "../../store/store";
import { validatePhoneNumber } from "../../utils/getValidate";

const index = () => {
    const [paymentInfo, setPaymentInfo] = useState({
        phoneNumber: "",
        amount: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const createPayment = useMutation(api.auth.updatePayment);
    const { user, setUser } = useStore((state) => state);
    const router = useRouter();

    const handlePayment = async () => {
        setIsLoading(true);

        try {
            if (!validatePhoneNumber(paymentInfo.phoneNumber)) {
                return Alert.alert("Invalid phone number");
            }
            const converAmountToInt = parseInt(paymentInfo.amount);
            if (isNaN(converAmountToInt) || converAmountToInt < 500) {
                return Alert.alert(
                    "Invalid amount. Amount should be at least 500"
                );
            }

            const newUser = await createPayment({
                userId: user._id,
                amount: converAmountToInt,
            });

            if (newUser) {
                setUser(newUser);
                ToastAndroid.show("Deposit Successfull", ToastAndroid.BOTTOM);
                router.push("/profile");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <ImageBackground source={bgImage} className="h-full ">
                <View className="p-5 flex-1 justify-center">
                    <Text className="font-Do text-3xl text-center text-white">
                        Payment
                    </Text>
                    <View className="gap-3 mt-5">
                        <IconInput
                            onType={(phone) => {
                                setPaymentInfo((prev) => ({
                                    ...prev,
                                    phoneNumber: phone,
                                }));
                            }}
                            placeholder="Phone Number"
                            Icon={PhoneIcon}
                            className="h-20"
                            background="bg-white/90"
                            value={paymentInfo.phoneNumber}
                        />
                        <IconInput
                            onType={(amount) => {
                                setPaymentInfo((prev) => ({
                                    ...prev,
                                    amount: amount,
                                }));
                            }}
                            placeholder="Amount"
                            Icon={CashIcon}
                            className="h-20"
                            background="bg-white/90"
                        />
                        <IconsButton
                            onpress={handlePayment}
                            isLoading={isLoading}
                            Icon={CashIconWhite}
                            text="Pay"
                        />
                    </View>
                </View>
            </ImageBackground>
            <StatusBar backgroundColor="#8a0083" style="light" />
        </SafeAreaView>
    );
};

export default index;
