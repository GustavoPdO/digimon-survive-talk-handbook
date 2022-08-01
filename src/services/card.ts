import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { CardProps } from "../components/Card";
import { db } from "./firebase";

export async function createDigimon(payload: Omit<CardProps, "id">) {
  try {
    await addDoc(collection(db, "digimons"), {
      ...payload,
      created: Timestamp.now(),
    });
  } catch (err) {
    alert(err);
  }
}

export async function getDigimons() {
  const q = query(collection(db, "digimons"), orderBy("digimon", "desc"));
  const querySnapshot = await getDocs(q);
  const list: CardProps[] = [];
  querySnapshot.forEach((doc) => {
    list.push({ ...(doc.data() as CardProps), id: doc.id });
  });
  return list;
}

export async function updateDigimon(payload: CardProps) {
  const digimonDocRef = doc(db, "digimons", payload.id);
  try {
    await updateDoc(digimonDocRef, {
      ...payload,
    });
  } catch (err) {
    alert(err);
  }
}
