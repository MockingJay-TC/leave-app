import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => await signInWithEmailAndPassword(auth, email, password);

export const logout = async () => await signOut(auth);
