import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../../components/Form";
import Header from "../../components/Header";

const login = () => {
    return (
        <SafeAreaView className="bg-white h-full">
            <Header text="Sign In" />
            <Form type="Sign In" />
        </SafeAreaView>
    );
};

export default login;
