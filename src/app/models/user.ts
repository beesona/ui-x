export class User {
    id: number;
    userName: string;
    email: string;
    password: string;
    organization: string;
    createDate: Date;
  }

  export class RegisterUser {
    id: number;
    userName: string;
    email: string;
    password: string;
    organization: string;
    createDate: Date;
    error: boolean;
    response: string;
  }