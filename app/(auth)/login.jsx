import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../../components/Form";
import Header from "../../components/Header";

const login = () => {
    return (
        <SafeAreaView className="bg-white h-full">
            <Header text="Sign In" />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <Form type="Sign In" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default login;
