import { useConvex, useMutation } from "convex/react";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { EmailIcon, PasswordIcon, ProfileIcon } from "../assets/icons/Icons";
import { api } from "../convex/_generated/api";
import useStore from "../store/store";
import generateUserName from "../utils/generateUserName";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { validateEmail, validatePassword } from "../utils/getValidate";
import Checkbox from "./Checkbox";
import FormBottomText from "./FormBottomText";
import IconInput from "./IconInput";
import PrimaryBtn from "./PrimaryBtn";

const Form = ({ type }) => {
    const [checkedValue, setCheckedValue] = useState("");
    const registerUser = useMutation(api.auth.createUser);
    const updateVerificationCode = useMutation(api.auth.updateVerificationCode);
    const { setUser } = useStore((state) => state);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const convex = useConvex();

    const handleCreateUser = async () => {
        setIsLoading(true);
        try {
            const username = generateUserName(formData.email);

            if (!checkedValue || checkedValue.trim().length === 0) {
                Alert.alert("Please Choose a Role");
                return;
            }
            if (!formData.name) {
                Alert.alert(
                    "Please enter your name",
                    "A name must be provided"
                );
                return;
            }
            if (!formData.email || !validateEmail(formData.email)) {
                Alert.alert(
                    "Please enter your valid email",
                    "A valid email must be provided"
                );
                return;
            }
            if (!formData.password || !validatePassword(formData.password)) {
                Alert.alert(
                    "Please enter a password",
                    "Password must Have \n At least one uppercase letter \nAt least one lowercase letter\nAt least one digit\nAt least one special character\nEnsures the password is at least 8 characters long"
                );
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                Alert.alert("Passwords do not match");
                return;
            }

            const user = await convex.query(api.auth.getUser, {
                email: formData.email,
            });

            if (user?._id) {
                Alert.alert("User already exists with that email");
                return;
            }

            const verificationCode = generateVerificationCode();

            await registerUser({
                userName: username,
                email: formData.email,
                name: formData.name,
                password: formData.password,
                role: checkedValue,
                VerificationCode: verificationCode,
                isVerified: false,
            });

            const sentEmail = await fetch(
                "https://cl4wch-8000.csb.app/send-mail",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        code: verificationCode,
                    }),
                }
            );
            const isSent = await sentEmail.json();

            if (isSent?.message) {
                Alert.alert(
                    "Registration Successfull",
                    "We sent an email to your account with OTP",
                    [
                        {
                            text: "Done",
                            onPress: () =>
                                router.push(`/verify/${formData.email}`),
                        },
                    ]
                );
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            if (!formData.email || !validateEmail(formData.email)) {
                Alert.alert(
                    "Please enter your valid email",
                    "A valid email must be provided"
                );
                return;
            }
            if (!formData.password || !validatePassword(formData.password)) {
                Alert.alert("Please enter Valid password");
                return;
            }
            const user = await convex.query(
                api.auth.getUserByEmailAndPassword,
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            if (!user) {
                Alert.alert("User Not Found Please Sign up");
                return;
            }
            if (user && !user.isVerified) {
                Alert.alert("You are not verified", "", [
                    {
                        text: "Verify now",
                        onPress: async () => {
                            setIsLoading(true);
                            try {
                                const verificationCode =
                                    generateVerificationCode();

                                await fetch(
                                    "https://cl4wch-8000.csb.app/send-mail",
                                    {
                                        method: "POST",
                                        headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            email: formData.email,
                                            code: verificationCode,
                                        }),
                                    }
                                );

                                await updateVerificationCode({
                                    email: formData.email,
                                    verificationCode: verificationCode,
                                });

                                router.push(`/verify/${formData.email}`);
                            } catch (e) {
                                console.log(e);
                            } finally {
                                setIsLoading(false);
                            }
                        },
                    },
                ]);
                return;
            }

            setUser(user);

            Alert.alert("LogIn Successfull", "", [
                {
                    text: "Done",
                    onPress: () => router.push("/home"),
                },
            ]);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="">
                <LottieView
                    source={require("../assets/lottie-files/signup.json")}
                    style={{
                        width: "100%",
                        height: 200,
                    }}
                    autoPlay={true}
                />
                <Text className="font-Do text-[32px] font-normal text-textColor text-center">
                    {type === "Sign Up" ? "Sign Up" : "Sign In"}
                </Text>

                <View className="w-full px-4 pt-10">
                    {type === "Sign Up" && (
                        <>
                            <Text className="font-dmBold font-base text-textColor mb-4">
                                Sign up as:
                            </Text>
                            <View className="flex-row items-center gap-5">
                                <Checkbox
                                    onClick={() => setCheckedValue("Authority")}
                                    text="Authority"
                                    value={checkedValue}
                                />
                                <Checkbox
                                    onClick={() =>
                                        setCheckedValue("Team Manager")
                                    }
                                    text="Team Manager"
                                    value={checkedValue}
                                />
                                <Checkbox
                                    onClick={() => setCheckedValue("Player")}
                                    text="Player"
                                    value={checkedValue}
                                />
                            </View>
                        </>
                    )}
                    <View className="gap-4 mt-4">
                        {type == "Sign Up" && (
                            <IconInput
                                onType={(name) =>
                                    setFormData({
                                        ...formData,
                                        name: name,
                                    })
                                }
                                Icon={ProfileIcon}
                                placeholder="Name"
                            />
                        )}
                        <IconInput
                            onType={(email) =>
                                setFormData({
                                    ...formData,
                                    email: email,
                                })
                            }
                            Icon={EmailIcon}
                            placeholder="Email"
                        />
                        <IconInput
                            onType={(password) =>
                                setFormData({
                                    ...formData,
                                    password: password,
                                })
                            }
                            Icon={PasswordIcon}
                            placeholder="Password"
                            type="password"
                        />
                        {type === "Sign Up" && (
                            <IconInput
                                onType={(confirmPassword) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword: confirmPassword,
                                    })
                                }
                                Icon={PasswordIcon}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        )}

                        <PrimaryBtn
                            onClick={
                                type === "Sign Up"
                                    ? handleCreateUser
                                    : handleSignIn
                            }
                            label={
                                type === "Sign Up" ? (
                                    isLoading ? (
                                        <ActivityIndicator />
                                    ) : (
                                        "Sign Up"
                                    )
                                ) : isLoading ? (
                                    <ActivityIndicator />
                                ) : (
                                    "Sign In"
                                )
                            }
                        />

                        {type === "Sign Up" ? (
                            <FormBottomText
                                link="/login"
                                text="Already have an account?"
                                label="Sign In"
                            />
                        ) : (
                            <FormBottomText
                                link="/signup"
                                text="Don't have any account?"
                                label="Sign up"
                            />
                        )}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Form;
