export interface IUserToken {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string | null;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
