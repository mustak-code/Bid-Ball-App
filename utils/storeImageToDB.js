export default storeImageToDb = async (image, uploadUrl) => {
    // Fetch the image as a Blob
    const response = await fetch(image.uri);
    const blob = await response.blob();

    // Upload the image to Convex storage
    const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
            "Content-Type": blob.type, // Dynamically set the MIME type
        },
        body: blob, // Send the image blob
    });

    if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to storage.");
    }
    return uploadResponse;
};
