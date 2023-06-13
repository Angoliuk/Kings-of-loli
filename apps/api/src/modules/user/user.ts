import { SortOrder } from '@api/interfaces';
import { exclude, redisUtils } from '@api/services';
import { protectedProcedure, publicProcedure, router } from '@api/trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { io } from '../../configs/sockets';
import { IoEvent } from '@kol/shared-game/interfaces';

const emptyInput = z.undefined();

const updateUserInput = z.object({
  userId: z.string().min(1),
  values: z.object({
    name: z.string().min(1).max(256).optional(),
    sound: z.number().min(0).max(100).optional(),
  }),
});

const deleteUser = z.object({
  userId: z.string().min(1),
});

const getUserById = z.object({ id: z.string().min(1) });

const getAllUsers = z.object({
  offset: z.number().min(0).default(0),
  limit: z.number().min(1).max(50).default(20),
  orderBy: z
    .object({
      key: z.nativeEnum(exclude(Prisma.UserScalarFieldEnum, ['password'])),
      order: z.nativeEnum(SortOrder),
    })
    .optional(),
});

const userRouter = router({
  getUserGamesStatus: protectedProcedure.input(emptyInput).query(async ({ ctx }) => {
    if (!ctx.user?.id)
      return {
        isInGame: false,
        isSearching: false,
        searchFrom: 0,
      };

    const gameSearch = await redisUtils.gameSearch.get(ctx.user?.id);

    return {
      isInGame: Boolean(await redisUtils.userActiveGame.get(ctx.user?.id)),
      isSearching: Boolean(await redisUtils.gameSearch.get(ctx.user?.id)),
      searchFrom: gameSearch?.timestamp ?? 0,
    };
  }),
  updateUser: protectedProcedure.input(updateUserInput).mutation(
    async ({
      ctx,
      input: {
        userId,
        values: { name, sound },
      },
    }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          sound: sound && Number(sound.toFixed(0)),
          name: name?.trim(),
        },
      });
      io.to(userId).emit(IoEvent.USER_UPDATE, { name, sound });
      return exclude(updatedUser, ['password']);
    },
  ),
  deleteUser: protectedProcedure.input(deleteUser).mutation(async ({ ctx, input: { userId } }) => {
    const deletedUser = await ctx.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    io.to(userId).emit(IoEvent.USER_DELETE, { deletedUserId: userId });
    return deletedUser.id;
  }),
  getUserById: publicProcedure.input(getUserById).query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });
    return user ? exclude(user, ['password']) : {};
  }),
  getAllUsers: publicProcedure.input(getAllUsers).query(async ({ ctx, input: { limit, offset, orderBy } }) => {
    const users = await ctx.prisma.user.findMany({
      skip: offset,
      take: limit,
      orderBy: orderBy && {
        [orderBy.key]: orderBy.order,
      },
    });
    return users.map((user) => exclude(user, ['password']));
  }),
});

export { deleteUser, getAllUsers, getUserById, updateUserInput, userRouter };
