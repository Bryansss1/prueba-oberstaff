export type SigninBody = {
  password: string;
  email: string;
  username: string;
  phone_number?: string;
};

export type FilterOptionsUser = {
  email?: string;
  username?: string;
};
