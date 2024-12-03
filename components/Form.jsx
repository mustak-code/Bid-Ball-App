import { useConvex, useMutation } from "convex/react";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import {
    Alert,
    Keyboard,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { EmailIcon, PasswordIcon, ProfileIcon } from "../assets/icons/Icons";
import { api } from "../convex/_generated/api";
import generateUserName from "../utils/generateUserName";
import { validateEmail, validatePassword } from "../utils/getValidate";
import Checkbox from "./Checkbox";
import FormBottomText from "./FormBottomText";
import IconInput from "./IconInput";
import PrimaryBtn from "./PrimaryBtn";

const Form = ({ type }) => {
    const [checkedValue, setCheckedValue] = useState("");
    const registerUser = useMutation(api.auth.createUser);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const convex = useConvex();

    const handleCreateUser = async () => {
        const username = generateUserName(formData.email);

        if (!checkedValue || checkedValue.trim().length === 0) {
            Alert.alert("Please Choose a Role");
            return;
        }
        if (!formData.name) {
            Alert.alert("Please enter your name", "A name must be provided");
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

        registerUser({
            userName: username,
            email: formData.email,
            name: formData.name,
            password: formData.password,
            role: checkedValue,
        });

        Alert.alert("Registration Successfull", "", [
            {
                text: "Done",
                onPress: () => router.push("/login"),
            },
        ]);
    };

    const handleSignIn = async () => {
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
        const user = await convex.query(api.auth.getUserByEmailAndPassword, {
            email: formData.email,
            password: formData.password,
        });

        if (!user) {
            Alert.alert("User Not Found Please Sign up");
            return;
        }

        console.log(user);

        Alert.alert("LogIn Successfull", "", [
            {
                text: "Done",
                onPress: () => router.push("/home"),
            },
        ]);
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
                            label={type === "Sign Up" ? "Sign up" : "Sign In"}
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
