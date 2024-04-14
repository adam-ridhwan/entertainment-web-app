export const DEVELOPMENT_MODE = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

export const MEDIA_QUERY = {
  SM: 500,
  MD: 800,
  LG: 1100,
  XL: 1400,
};

export const TIMEOUT_DURATION = 700;
export const MINIMUM_TILE_COUNT = 6;

export const SLIDE_DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

export const RESIZE_DIRECTION = {
  MAXIMIZING: 'MAXIMIZING',
  MINIMIZING: 'MINIMIZING',
} as const;

export const authStrings = {
  signIn: 'Sign in',
  signUp: 'Sign up',
  signOut: 'Sign out',
  emailAddress: 'Email address',
  password: 'Password',
  repeatPassword: 'Repeat password',
  loginToYourAccount: 'Login to your account',
  dontHaveAnAccount: "Don't have an account?",
  createAnAccount: 'Create an account',
  alreadyHandAnAccount: 'Already have an account?',
  userCreatedSuccessfully: 'User created successfully',
  signedInSuccessfully: 'Signed in successfully',
} as const;

export const errorStrings = {
  allFieldsAreRequired: 'All fields are required',
  passwordIsTooShort: 'Password is too short',
  passwordsDoNotMatch: 'Passwords do not match',
  userDoesNotExists: 'User does not exist',
  userAlreadyExists: 'User already exists',
  invalidPassword: 'Invalid password',
} as const;

export const libraryStrings = {
  trending: 'Trending',
  recommendedForYou: 'Recommended for you',
} as const;
