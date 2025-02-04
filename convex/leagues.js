import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const createLeague = mutation({
    args: {
        leagueImage: v.optional(v.string()),
        leagueName: v.string(),
        leagueLocation: v.string(),
        organizer: v.string(),
        leagueFee: v.string(),
        startingDate: v.string(),
        endingDate: v.string(),
        players: v.array(v.id("players")),
        teamSize: v.string(),
        createdBy: v.id("users"),
        isPanding: v.boolean(),
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("leagues", {
            leagueImage: args.leagueImage,
            leagueName: args.leagueName,
            leagueLocation: args.leagueLocation,
            organizer: args.organizer,
            leagueFee: args.leagueFee,
            startingDate: args.startingDate,
            endingDate: args.endingDate,
            players: args.players,
            teamSize: args.teamSize,
            createdBy: args.createdBy,
            isPanding: args.isPanding,
        });

        return {
            success: true,
            message: "League Created Successfully",
            leageId: id,
        };
    },
});

export const getAllLeagues = query(async (ctx, args) => {
    const allLeagues = await ctx.db.query("leagues").collect();
    return allLeagues;
});

export const getLeagues = query(async (ctx, args) => {
    const leagues = await ctx.db
        .query("leagues")
        .withIndex("by_approval", (q) => q.eq("isPanding", false))
        .collect();
    return leagues;
});
export const getLeaguesByAuthor = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const league = await ctx.db
            .query("leagues")
            .withIndex("by_author", (q) => q.eq("createdBy", args.userId))
            .collect();
        return league;
    },
});

export const getSingleLeague = query({
    args: {
        leagueId: v.id("leagues"),
    },
    handler: async (ctx, args) => {
        const league = await ctx.db
            .query("leagues")
            .withIndex("by_id", (q) => q.eq("_id", args.leagueId))
            .first();
        return league;
    },
});

export const approveLeage = mutation({
    args: {
        leagueId: v.id("leagues"),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.leagueId, {
            isPanding: false,
        });

        return {
            success: true,
            message: "League Approved Successfully",
        };
    },
});
