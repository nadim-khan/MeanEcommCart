export interface User {
    token: string;
    user: {
      username: string;
      email: string;
      password: string;
      roles: any,
      repeatPassword?: string;
    };
  }
