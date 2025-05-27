import { auth } from "./firebase";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { api } from "../api";
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  result.user.getIdToken().then(token => {
    localStorage.setItem("token", token);
  });

  await api.post("/api/user/newUser", {
    name: result.user.displayName,
    email: result.user.email,
    userId: result.user.uid,
  });
  //   const user = result.user;
  //add to firestore adding the user to the database
  //   result.user;
  return result;
};

export const signOut = async () => {
  localStorage.removeItem("token");
  await auth.signOut();
};
