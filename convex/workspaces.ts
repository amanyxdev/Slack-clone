import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";


export const create = mutation({
    args: {
        name: v.string()
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)

        if (!userId) {
            throw new Error("Unauthorized")
        }
        // TODO: Create a proper method later
        const joinCode = "123456";

        const workspacesId = await ctx.db.insert("workspaces", {
            name: args.name,
            userId,
            joinCode,
        });


        return workspacesId;
    }
});

export const get = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx)

        if (!userId) {
            throw new Error("Unauthorized")
        }

        return await ctx.db
            .query("workspaces")
            .filter((q) => q.eq(q.field("userId"), userId))
            .collect()
    }
})

export const getById = query({
    args: {
        id: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)

        if (!userId) return null;

        // return await ctx.db.get(args.id);
        const workspace = await ctx.db.get(args.id);

        if (!workspace) return null;

        if (workspace.userId !== userId) return null;

        return workspace;
    }
})
