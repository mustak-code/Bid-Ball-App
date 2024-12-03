import { Resend } from "resend";

const resend = new Resend("re_EDmU2g1j_GQbQEfNrifvsZe8i877FhtmC");

const sendEmail = async (code, email) => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev", // Replace with your verified sender address
            to: email, // Dynamically set the recipient email
            subject: "Your Verification Code",
            html: `<p>Your code is <strong>${code}</strong>!</p>`, // Inject the code dynamically
        });
        console.log("Email sent successfully!");
        console.log(code);
        console.log(email);
    } catch (error) {
        console.error("Failed to send email:", error);
    }
};

export default sendEmail;
