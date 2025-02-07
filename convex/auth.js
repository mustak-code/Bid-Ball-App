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

export const getUserByRole = query({
    args: {
        role: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_role", (q) => q.eq("role", args.role))
            .collect();
        return user;
    },
});

export const updateAdminNotifications = mutation({
    args: {
        notification: v.id("notification"),
    },
    handler: async (ctx, args) => {
        const admins = await ctx.db
            .query("users")
            .withIndex("by_role", (q) => q.eq("role", "Admin"))
            .collect();

        for (const admin of admins) {
            await ctx.db.patch(admin._id, {
                notifications: [
                    ...(admin.notifications ?? []),
                    args.notification,
                ],
            });
        }

        return {
            success: true,
            message: `${admins.length} admin notifications updated successfully`,
        };
    },
});

export const updateAuthorityNotifications = mutation({
    args: {
        notification: v.id("notification"),
        authId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const authority = await ctx.db
            .query("users")
            .withIndex("by_id", (q) => q.eq("_id", args.authId))
            .first();

        await ctx.db.patch(authority._id, {
            notifications: [
                ...(authority.notifications ?? []),
                args.notification,
            ],
        });

        return {
            success: true,
            message: `authority notifications updated successfully`,
        };
    },
});

export const getUserbyId = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_id", (q) => q.eq("_id", args.userId))
            .first();
        return user;
    },
});
export const updatePayment = mutation({
    args: {
        userId: v.id("users"),
        amount: v.number(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_id", (q) => q.eq("_id", args.userId))
            .first();
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }
        await ctx.db.patch(user._id, {
            balance: args.amount,
        });
        const newUser = await ctx.db
            .query("users")
            .withIndex("by_id", (q) => q.eq("_id", args.userId))
            .first();
        return newUser;
    },
});

export const updatePurchase = mutation({
    args: {
        userId: v.id("users"),
        league: v.id("leagues"),
        amount: v.number(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_id", (q) => q.eq("_id", args.userId))
            .first();
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }
        await ctx.db.patch(user._id, {
            myLeagues: args.league,
            balance: user.balance - args.amount,
        });
        const newUser = await ctx.db
            .query("users")
            .withIndex("by_id", (q) => q.eq("_id", args.userId))
            .first();
        return newUser;
    },
});
