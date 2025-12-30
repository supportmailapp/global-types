export interface IUserToken {
  userId: string;
  accessToken: string;
  refreshToken: string | null;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
