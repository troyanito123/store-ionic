export interface AuthReponse {
  data: User;
  access_token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
