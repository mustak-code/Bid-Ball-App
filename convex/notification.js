import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createNotification = mutation({
    args: {
        userId: v.id("users"),
        LeagueId: v.id("leagues"),
        notificationText: v.string(),
    },
    handler: async (ctx, args) => {
        const notificationId = await ctx.db.insert("notification", {
            LeagueId: args.LeagueId,
            userId: args.userId,
            notificationText: args.notificationText,
        });

        return { notificationId };
    },
});
