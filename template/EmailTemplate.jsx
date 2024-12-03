import { Html, Text } from "@react-email/components";

const EmailTemplate = ({ code }) => {
    return (
        <Html lang="en">
            <Text>Your Code is {code}</Text>
        </Html>
    );
};

export default EmailTemplate;
