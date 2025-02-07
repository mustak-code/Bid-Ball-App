import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CashIcon, CashIconWhite, PhoneIcon } from "../../assets/icons/Icons";
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
            <View className="p-5 ">
                <Text className="font-Do text-2xl text-center">Deposite</Text>
                <View className="gap-3 mt-14">
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
                    />
                    <IconsButton
                        onpress={handlePayment}
                        isLoading={isLoading}
                        Icon={CashIconWhite}
                        text="Pay"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default index;
