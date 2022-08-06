import { User } from "firebase/auth";

export function isAdmin(user: User | null | undefined) {
  return user?.uid === process.env.REACT_APP_USER_ID
}