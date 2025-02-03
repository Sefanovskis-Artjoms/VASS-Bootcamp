export interface ITodo {
  id: string;
  status: string;
  title: string;
  description: string;
  date: string;
  type: string;
  assignedTo: string;
}

export interface TodoFormInputs {
  title: string;
  status: string;
  description: string;
  type: string;
  assignedTo: string;
}

export interface IUser {
  id: string;
  username: string;
  name: string;
  surname: string;
  password?: string;
  role: string;
}

export type IResponse<T = unknown> =
  | {
      success: true;
      data: T;
      error?: never;
    }
  | {
      success: false;
      data?: never;
      error: {
        type: string;
        field?: string;
        message: string;
      };
    };
