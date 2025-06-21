import { prisma } from '@/prisma/client';

export const getExistingUser = (email: string) =>  prisma.user.findUnique({ where: { email } });

export const createUser = (email: string, password: string) =>  prisma.user.create({
  data: {
    email,
    password,
  },
});
