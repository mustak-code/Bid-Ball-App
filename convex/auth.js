import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
    args: {
        userName: v.string(),
        name: v.string(),
        email: v.string(),
        password: v.string(),
        role: v.string(),
        VerificationCode: v.number(),
        isVerified: v.boolean(),
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
            VerificationCode: args.VerificationCode,
            isVerified: args.isVerified,
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

export const verifyUser = mutation({
    args: {
        verificationCode: v.number(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_verificationCode_email", (q) =>
                q
                    .eq("VerificationCode", args.verificationCode)
                    .eq("email", args.email)
            )
            .first();

        if (!user) {
            return {
                success: false,
                message: "Problems verifying user",
            };
        }

        ctx.db.patch(user._id, {
            isVerified: true,
        });

        return {
            success: true,
            message: "You are Verified",
        };
    },
});

export const updateVerificationCode = mutation({
    args: {
        verificationCode: v.number(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (!user) {
            return {
                success: false,
                message: "user not found",
            };
        }

        ctx.db.patch(user._id, {
            VerificationCode: args.verificationCode,
        });

        return {
            success: true,
            message: "code updated",
        };
    },
});

export const updateUser = mutation({
    args: {
        phone: v.optional(v.string()),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (!user) {
            return {
                success: false,
                message: "user not found",
            };
        }

        await ctx.db.patch(user._id, {
            phone: args.phone,
        });
        const newUser = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();
        return newUser;
    },
});
