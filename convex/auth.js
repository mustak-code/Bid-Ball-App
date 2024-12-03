import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
    args: {
        userName: v.string(),
        name: v.string(),
        email: v.string(),
        password: v.string(),
        role: v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();
        if (existingUser) {
            console.log("User already exists); creating");
            return;
        }

        await ctx.db.insert("users", {
            userName: args.userName,
            name: args.name,
            email: args.email,
            password: args.password,
            role: args.role,
        });
    },
});

export const getUser = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();
        return user;
    },
});
export const getUserByEmailAndPassword = query({
    args: {
        email: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_email_password", (q) =>
                q.eq("password", args.password).eq("email", args.email)
            )
            .first();
        return user;
    },
});
