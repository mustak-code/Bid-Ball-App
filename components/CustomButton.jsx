import { useRouter } from "expo-router";
import { Text, TouchableHighlight } from "react-native";

export default function CustomButton({ label, link, className }) {
    const router = useRouter();

    return (
        <TouchableHighlight
            onPress={() => router.push(link)}
            className={`bg-primary w-full py-5 px-10 rounded-full ${className}`}
        >
            <Text className="text-white font-medium text-base text-center">
                {label}
            </Text>
        </TouchableHighlight>
    );
}
