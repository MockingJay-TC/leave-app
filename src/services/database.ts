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
  data: {
    status: string;
    startDate: string;
    requestedDays: number;
    leaveDays: number;
  }
) => {
  const user = doc(_collection, id);
  try {
    return await updateDoc(user, data);
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export const getUser = async (
  option: "firstName" | "email" | "lastName" | "role" | "status",
  value: string
) => {
  return getDocs(query(_collection, where(option, "==", value)));
};
