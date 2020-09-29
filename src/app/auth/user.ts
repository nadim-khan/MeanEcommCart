export interface User {
  [x: string]: any;
  token: string;
  user: {
    username: string;
    email: string;
    password: string;
    roles: any,
    repeatPassword?: string;
  };
}

export interface AllUsers {
  _id: string;
  index: number;
  username: string;
  email: string;
  colcreatedAt: string;
  hashedPassword: string;
  roles: any;
}
