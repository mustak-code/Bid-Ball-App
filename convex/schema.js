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
    })
        .index("by_email", ["email"])
        .index("by_email_password", ["password", "email"]),
});
