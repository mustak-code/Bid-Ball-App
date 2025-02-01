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
        notifications: v.optional(v.array(v.id("notification"))),
    })
        .index("by_email", ["email"])
        .index("by_email_password", ["password", "email"])
        .index("by_verificationCode_email", ["VerificationCode", "email"])
        .index("by_role", ["role"]),
    players: defineTable({
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
    })
        .index("by_email", ["email"])
        .searchIndex("search_by_name", {
            searchField: "name",
        }),
    leagues: defineTable({
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
    })
        .index("by_approval", ["isPanding"])
        .index("by_author", ["createdBy"]),
    notification: defineTable({
        userId: v.id("users"),
        LeagueId: v.id("leagues"),
        notificationText: v.string(),
    }),
});
