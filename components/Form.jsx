import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { EmailIcon, PasswordIcon, ProfileIcon } from "../assets/icons/Icons";
import Checkbox from "./Checkbox";
import FormBottomText from "./FormBottomText";
import IconInput from "./IconInput";
import PrimaryBtn from "./PrimaryBtn";

const Form = ({ type }) => {
    const [checkedValue, setCheckedValue] = useState("");
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
                            <IconInput Icon={ProfileIcon} placeholder="Name" />
                        )}
                        <IconInput Icon={EmailIcon} placeholder="Email" />
                        <IconInput Icon={PasswordIcon} placeholder="Password" />
                        {type === "Sign Up" && (
                            <IconInput
                                Icon={PasswordIcon}
                                placeholder="Confirm Password"
                            />
                        )}

                        <PrimaryBtn
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
