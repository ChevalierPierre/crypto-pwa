import { User } from "@auth0/auth0-react";

export interface IUser {
  email: string,
  email_verified: boolean,
  family_name: string,
  given_name: string,
  locale: string,
  name: string,
  nickname: string,
  picture?: string,
  sub: string,
  updated_at: Date,
  pushTokens: any[],
  refCurrency: string,
  enabledNotif: boolean,
}

export interface IAuthenticationContext {
  user: IUser | undefined;

  setLoggedUser: TSetLoggedUserFC;
  createUserIfNeeded: TCreateUserIfNeededFC;
  suscribeToNotifications: TSuscribeToNotificationFC ;
  getUser: TGetUserFC;
  deleteNotifSubscription: TDeleteNotifSubscriptionFC;
  updateProfilePic: TUpdateProfilePicFC;
}

export type TSetLoggedUserFC = (payload: User) => Promise<any>;
export type TCreateUserIfNeededFC = () => Promise<any>;
export type TSuscribeToNotificationFC = () => Promise<any>;
export type TGetUserFC = () => Promise<any>;
export type TDeleteNotifSubscriptionFC = () => Promise<any>;
export type TUpdateProfilePicFC = (payload: FormData) => Promise<any>;

export const defaultAuthenticationValue: IAuthenticationContext = {
  user: undefined,

  setLoggedUser: () => Promise.reject(null),
  createUserIfNeeded: () => Promise.reject(null),
  suscribeToNotifications: () => Promise.reject(null),
  getUser: () => Promise.reject(null),
  deleteNotifSubscription: () => Promise.reject(null),
  updateProfilePic: () => Promise.reject(null),
};
