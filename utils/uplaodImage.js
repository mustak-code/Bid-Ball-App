import * as ImagePicker from "expo-image-picker";

export default uploadImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (res.canceled) {
        console.log("Image picking canceled.");
        return;
    }

    const image = res.assets[0];
    return image;
};
