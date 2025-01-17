import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateImageUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const sendImageToDatabase = mutation({
    args: {
        storageId: v.string(),
        user: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.user))
            .first();

        if (!user) {
            return {
                success: false,
                message: "image upload failed",
            };
        }

        ctx.db.patch(user._id, {
            profile: args.storageId,
        });

        return {
            success: true,
            message: "image upload successfull",
        };
    },
});

export const getImageUrl = mutation({
    args: {
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        const url = await ctx.storage.getUrl(args.storageId);
        return url;
    },
});
