import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";

const VerifyInput = ({ length, setCode }) => {
    const inputRef = useRef([]);
    const [otp, setOtp] = useState(new Array(length).fill(""));

    useEffect(() => {
        if (inputRef.current[0]) {
            inputRef.current[0].focus();
        }
    }, []);

    const handleOnChange = (i, text) => {
        if (isNaN(text)) return;

        const newOtp = [...otp];

        newOtp[i] = text.substring(text.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join("");

        if (combinedOtp.length === 4) {
            const intOtp = parseInt(combinedOtp);
            setCode(intOtp);
        }

        // move forward to the next
        if (text && i < otp.length - 1 && inputRef.current[i + 1]) {
            inputRef.current[i + 1].focus();
        }
    };

    const handleKeyPress = (i, e) => {
        if (
            e.key === "Backspace" &&
            !otp[i] &&
            i > 0 &&
            inputRef.current[i - 1]
        ) {
            inputRef.current[i - 1].focus();
        }
    };

    return otp.map((v, i) => (
        <TextInput
            key={i}
            ref={(input) => (inputRef.current[i] = input)}
            value={otp[i]}
            onChangeText={(e) => handleOnChange(i, e)}
            selection={{
                start: 1,
                end: 1,
            }}
            onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent)}
            keyboardType="number-pad"
            className="w-14 h-14 bg-white text-center focus:border focus:border-primary"
        />
    ));
};

export default VerifyInput;
