'use server';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { authStrings, errorStrings } from '@/lib/constants';
import { FormResponse, userSchema } from '@/lib/types';

const prisma = new PrismaClient();

export async function signIn({
  email,
  password,
}: {
  email: string | undefined;
  password: string | undefined;
}): Promise<FormResponse> {
  if (!email || !password) {
    return {
      success: false,
      message: errorStrings.allFieldsAreRequired,
    };
  }

  const parsedResult = userSchema.safeParse({
    email,
    password,
  });
  if (!parsedResult.success) {
    const { message, code } = parsedResult.error.issues[0];

    if (code === 'too_small') {
      return {
        success: false,
        message: errorStrings.passwordIsTooShort,
      };
    }

    return {
      success: false,
      message: message,
    };
  }

  const { email: parsedEmail, password: parsedPassword } = parsedResult.data;

  const existingUser = await prisma.user.findUnique({
    where: { email: parsedEmail },
    select: {
      password: true,
    },
  });

  if (!existingUser) {
    return {
      success: false,
      message: errorStrings.userDoesNotExists,
    };
  }

  const passwordsMatched = await bcrypt.compare(parsedPassword, existingUser.password);
  if (!passwordsMatched) {
    return {
      success: false,
      message: errorStrings.invalidPassword,
    };
  }

  prisma.$disconnect();

  return {
    success: true,
    message: authStrings.signedInSuccessfully,
    user: existingUser,
  };
}
