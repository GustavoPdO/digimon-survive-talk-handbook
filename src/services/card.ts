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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CardProps } from "../components/Card";
import { db, storage } from "./firebase";

async function uploadImage(image: File | null) {
  if (image === null) return;
  const imageRef = ref(storage, `images/${image.name}`);
  const url = await uploadBytes(imageRef, image)
    .then(async (response) => await getDownloadURL(response.ref))
    .catch((error) => {
      console.error(error);
      return "";
    });
  return url;
}

export async function createDigimon(
  payload: Omit<CardProps, "id" | "img"> & { img: File | string | null }
) {
  payload.img = (await uploadImage(payload.img as File)) || "";
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
  console.log("getting");
  const q = query(collection(db, "digimons"), orderBy("digimon", "asc"));
  const querySnapshot = await getDocs(q);
  const list: CardProps[] = [];
  querySnapshot.forEach((doc) => {
    list.push({ ...(doc.data() as CardProps), id: doc.id });
  });
  return list;
}

export async function updateDigimon(
  payload: Omit<CardProps, "img"> & { img: File | string | null }
) {
  const digimonDocRef = doc(db, "digimons", payload.id);
  if (payload.img instanceof File) {
    payload.img = (await uploadImage(payload.img as File)) || payload.img;
  }
  try {
    await updateDoc(digimonDocRef, {
      ...payload,
    });
  } catch (err) {
    alert(err);
  }
}
