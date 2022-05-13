import { BrowserRouter, Routes, Route } from "react-router-dom";
import { db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  collection,
  setDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Author from "./pages/author";
import AuthorArticles from "./pages/authorArticles";
import WritingArticle from "./pages/WritingArticle/WritingArticle.jsx";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login/login.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const docRef = async () => {
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            displayName: user.displayName,
            admin: false,
            role: "read",
          });
        };
        setUser({
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          displayName: user.displayName,
          admin: false,
        });
      }
    });
  }, []);

  // if (user.admin)
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Dashboard user={user} />} />
  //         {/* <Route path="/login" element={<Login />} /> */}
  //         {/* <Route path="/author" element={<Author />} /> */}
  //         {/* <Route path="/author/Articles" element={<AuthorArticles />} /> */}
  //         {/* <Route path="/writing" element={<WritingArticle />} /> */}
  //       </Routes>
  //     </BrowserRouter>
  //   );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/login" element={<Login user = {user} />} />
        <Route path="/author" element={<Author />} />
        <Route path="/author/Articles" element={<AuthorArticles />} />
        <Route path="/writing" element={<WritingArticle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
