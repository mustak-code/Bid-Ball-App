import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const getAllNotifications = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const notifications = await ctx.db
            .query("notification")
            .filter((query) => query.neq(query.field("userId"), args.userId))
            .collect();
        const populatedUserIds = await Promise.all(
            notifications.map(async (notification) => {
                const user = await ctx.db.get(notification.userId);
                return { ...notification, user };
            })
        );
        return populatedUserIds;
    },
});
