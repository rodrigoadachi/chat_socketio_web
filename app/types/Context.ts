import { Dispatch, SetStateAction } from "react";
import { UserDto } from "./User";

export interface ContextDto {
  user: UserDto;
  setUser: Dispatch<SetStateAction<UserDto>>;
}
