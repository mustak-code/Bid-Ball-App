import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../../components/Form";
import Header from "../../components/Header";

const signup = () => {
    return (
        <SafeAreaView className="bg-white h-full">
            <Header text="Sign Up" />

            <Form type="Sign Up" />
        </SafeAreaView>
    );
};

export default signup;
