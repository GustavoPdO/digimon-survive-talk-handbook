import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}
