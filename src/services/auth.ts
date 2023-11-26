import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { getUser } from "./database";
import { app } from "./firebase";

const auth = getAuth(app);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  await signInWithEmailAndPassword(auth, email, password).then(
    async (response) => {
      let user = { user: {}, ...response.user };
      await getUser("email", email).then(
        (response: QuerySnapshot<DocumentData>) => {
          let _user: DocumentData = {};
          response.forEach((u) => (_user = u.data()));
          user = { ...user, user: _user };
          localStorage.setItem("user", JSON.stringify(user));
        }
      );
    }
  );

export const logout = async () =>
  await signOut(auth).then(() => {
    localStorage.clear();
  });
