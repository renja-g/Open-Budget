import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


export const depositRouter = createTRPCRouter({
  // Get all deposits from the current user
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      const deposits = await ctx.prisma.deposit.findMany({
        where: {
          userId: ctx.session.user.id
        },
      });
      return deposits;
    }),

  // Get a deposit by id from the current user
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const deposit = await ctx.prisma.deposit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
      return deposit;
    }),

  // Create a deposit for the current user
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(16),
        description: z.string().min(1).max(100).optional(),
        balance: z.number(),
        deposit_type: z.enum(["CURRENT", "CASH", "CREDIT", "OTHER"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deposit = await ctx.prisma.deposit.create({
        data: {
          name: input.name,
          description: input.description,
          balance: input.balance,
          deposit_type: input.deposit_type,
          userId: ctx.session.user.id,
        },
      });
      return deposit;
    }),

  // Update a deposit by id for the current user
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        deposit_type: z.enum(["CURRENT", "CASH", "CREDIT", "OTHER"]),
        name: z.string(),
        description: z.string().optional(),
        balance: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const deposit = await ctx.prisma.deposit.updateMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          ...input,
        },
      });
      return deposit;
    }),

  // Delete a deposit by id for the current user
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const deposit = await ctx.prisma.deposit.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
      return deposit;
    }),
});
