export interface IBotStats {
  guilds: number;
  tickets: number;
  createdAt: Date; // MongoDB will automatically set this
  updatedAt: Date; // MongoDB will automatically set this
}
