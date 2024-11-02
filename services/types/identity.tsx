export type CreateAccountForm = {
  firstName: string;
  lastName?: string;
  username: string;
  usernameType?: "email" | "phoneNumber";
  password: string;
};

export type ConfirmAccountForm = {
  username: string;
  usernameType?: "email" | "phoneNumber";
  code?: string;
  process: "sendCode" | "verifyCode";
};

export type ChangeAccountForm = {
  newUsernameType?: "email" | "phoneNumber";
  newUsername: string;
  code?: string;
  process: "sendCode" | "verifyCode";
};

export type ChangePasswordForm = {
  oldPassword?: string;
  newPassword: string;
  confirmPassword: string;
};

export type SendResetPasswordCodeForm = {
  username: string;
  usernameType?: "email" | "phoneNumber";
};

export type ResetPasswordForm = {
  username: string;
  usernameType?: "email" | "phoneNumber";
  code: string;
  newPassword: string;
  confirmPassword: string;
};

export type SignInForm = {
  username: string;
  usernameType?: "email" | "phoneNumber";
  password: string;
};

export type SignInWithProvider = "Google" | "Facebook";

export type RefreshTokenForm = {
  refreshToken: string;
};

export type SignOutForm = {
  refreshToken: string;
};

// User Profile Model
export type UserProfileModel = {
  id: string;
  firstName: string;
  lastName?: string;
  userName: string;
  email?: string;
  emailConfirmed: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  passwordConfigured: boolean;
  roles: string[];
};

// Subscription Model
export interface SubscriptionType {
  plan: string; // e.g., 'Basic', 'Pro', etc.
  expires: Date; // Subscription expiration date
  daysLeft?: number; // Optional days left until expiration
}
// User Session Model with Subscription
export type UserSessionModel = UserProfileModel & {
  tokenType: string;
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  subscription?: SubscriptionType; // Optional subscription property
};
