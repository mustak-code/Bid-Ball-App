import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    users: defineTable({
        userName: v.string(),
        name: v.string(),
        email: v.string(),
        password: v.string(),
        role: v.string(),
        VerificationCode: v.optional(v.number()),
        isVerified: v.optional(v.boolean()),
        profile: v.optional(v.string()),
        phone: v.optional(v.string()),
    })
        .index("by_email", ["email"])
        .index("by_email_password", ["password", "email"])
        .index("by_verificationCode_email", ["VerificationCode", "email"]),
    players: defineTable({
        name: v.string(),
        dp: v.string(),
        genre: v.string(),
        handed: v.string(),
        age: v.string(),
        location: v.string(),
        totalMatchPlayed: v.number(),
        mobile: v.string(),
        email: v.string(),
        minimunBidAmount: v.number(),
        addedBy: v.id("users"),
    }),
    leagues: defineTable({
        leagueName: v.string(),
        leagueLocation: v.string(),
        organizer: v.string(),
        leagueFee: v.number(),
        startingDate: v.string(),
        endingDate: v.string(),
        players: v.array(v.id("players")),
        teamSize: v.number(),
        createdBy: v.id("users"),
    }),
});
