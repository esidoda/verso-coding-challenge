export interface TableHeader {
  title: string;
  value: string;
  sortable?: boolean;
  valueLevelOne?: string;
  valueLevelTwo?: string;
}

export enum NOTIFICATION_TYPE {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export interface NotificationState {
  type: NOTIFICATION_TYPE;
  message: string;
  show: boolean;
}
