import { v } from "convex/values";
import { mutation } from "./_generated/server";
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
