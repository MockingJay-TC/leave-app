import { collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

const _collection = collection(db, "users");

// const _doc = doc(_collection, )

export const updateUser = async (id: string, data: {}) => {
  const user = doc(_collection, id);
  return await updateDoc(user, data);
};
