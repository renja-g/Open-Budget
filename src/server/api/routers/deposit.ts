import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
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
      const deposit = await ctx.prisma.deposit.findUnique({
        where: {
          id: input.id,
        },
      });
      return deposit;
    }),
});
