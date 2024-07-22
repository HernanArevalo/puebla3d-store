'use server';

import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
  try {
    const deletedAdress = await prisma.userAddress.delete({
      where: {
        userId: userId,
      },
    });

    return {
      ok: true,
      deletedAdress: deletedAdress,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error deleting userAddres',
    };
  }
};
