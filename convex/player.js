import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createPlayer = mutation({
    args: {
        name: v.string(),
        dp: v.optional(v.string()),
        genre: v.string(),
        handed: v.string(),
        age: v.string(),
        location: v.string(),
        totalMatchPlayed: v.optional(v.number()),
        mobile: v.string(),
        email: v.string(),
        minimunBidAmount: v.string(),
        addedBy: v.id("users"),
    },
    handler: async (ctx, args) => {
        const existingPlayer = await ctx.db
            .query("players")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existingPlayer) {
            console.log("player already exists with this email");
            return {
                success: false,
                message: "Player already exists with this email",
            };
        }

        await ctx.db.insert("players", {
            name: args.name,
            dp: args.dp,
            genre: args.genre,
            handed: args.handed,
            age: args.age,
            location: args.location,
            totalMatchPlayed: args.totalMatchPlayed,
            mobile: args.mobile,
            email: args.email,
            minimunBidAmount: args.minimunBidAmount,
            addedBy: args.addedBy,
        });

        return {
            success: true,
            message: "Player Added successfully",
        };
    },
});

export const getPlayers = query({
    args: {
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        return ctx.db.query("players").paginate(args.paginationOpts);
    },
});
