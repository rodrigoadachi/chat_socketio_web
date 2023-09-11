import { UserType } from "./User";

export type ChatType = {
  id: string;
  chatId: string;
  author?: UserType;
  authorId: string;
  text?: string;
  timestamp?: Date;
};
