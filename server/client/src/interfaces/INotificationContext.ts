export interface INotificationContext {
  notifications: Array<INotification> | undefined;
  loadNotif: boolean;
  getNotifications: TGetNotificationsFC;
  createNotification: TCreateNotificationFC;
  editNotification: TEditNotificationFC;
  // getNotificationById: TGetNotificationByIdFC;
  // getUserNotifications: TGetUserNotificationsFC;
  deleteNotification: TDeleteNotificationFC;
}

export interface INotification {
  id: string;
  // pushToken: any;
  email: string,
  crypto: string;
  operator: string;
  value: string;
  currency: string;
}

export interface INotificationForm {
  crypto: string;
  operator: string;
  value: string;
  currency: string;
}

export interface ICreateNotification {
  // pushToken: any;
  email: string,
  crypto: string;
  operator: string;
  value: string;
  currency: string;
}

export interface IEditNotification {
  id: string;
  // pushToken: any;
  email: string,
  crypto: string;
  operator: string;
  value: string;
  currency: string;
}

export interface IFilterNotification {
  crypto: string;
  operator: string;
  value: string;
  currency: string;
}

export type TGetNotificationsFC = (payload?: IFilterNotification) => Promise<any>;
export type TCreateNotificationFC = (payload: INotificationForm) => Promise<any>;
export type TEditNotificationFC = (payload: INotification) => Promise<any>;
export type TGetNotificationByIdFC = (payload: string) => Promise<any>;
export type TGetUserNotificationsFC = () => Promise<any>;
export type TDeleteNotificationFC = (payload: string) => Promise<any>;

export const defaultNotificationValue: INotificationContext = {
  notifications: [],
  loadNotif: false,
  getNotifications: () => Promise.reject(null),
  // getNotificationById: () => Promise.reject(null),
  createNotification: () => Promise.reject(null),
  editNotification: () => Promise.reject(null),
  // getUserNotifications: () => Promise.reject(null),
  deleteNotification: () => Promise.reject(null),
};
