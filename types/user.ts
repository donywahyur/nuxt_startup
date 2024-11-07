export interface User {
  id: number;
  name: string;
  email: string;
  image_url: string;
  occupation: string;
  role: string;
}
export interface LoginUserInput {
  email: string;
  password: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  occupation: string;
}
