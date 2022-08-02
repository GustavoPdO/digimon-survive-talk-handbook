import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase"

const googleProvider = new GoogleAuthProvider();

export async function login() {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0 && user.email === process.env.REACT_APP_MY_EMAIL) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email
      })
      return true;
    }
    return false
  } catch (error: any) {
      console.error(error)
      alert(error.message)
    }
}
