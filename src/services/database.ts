import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

const _collection = collection(db, "users");

export const updateUser = async (
  id: string,
  data: { staus: string; leaveDays: number; startDate: string }
) => {
  const user = doc(_collection, id);
  return await updateDoc(user, data);
};

export const getUser = async (
  option: "firstName" | "email" | "lastName",
  value: string
) => {
  return getDocs(query(_collection, where(option, "==", value)));
};
