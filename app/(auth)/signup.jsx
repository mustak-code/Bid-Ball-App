import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../../components/Form";
import Header from "../../components/Header";

const signup = () => {
    return (
        <SafeAreaView className="bg-white h-full">
            <Header text="Sign Up" />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <Form keyvalue="signup" type="Sign Up" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default signup;
