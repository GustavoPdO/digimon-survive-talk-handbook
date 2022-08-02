import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function login() {
  try {
    signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}
