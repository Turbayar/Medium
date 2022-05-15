import { BrowserRouter, Routes, Route } from "react-router-dom";
import { db,auth } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  collection,
  setDoc,
  addDoc,
  onSnapshot,
  getDoc
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Author from "./pages/author";
import AuthorArticles from "./pages/authorArticles";
import WritingArticle from "./pages/WritingArticle/WritingArticle.jsx";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login/login.jsx";
import "./App.css";

function App() {
  const auth = getAuth();
  console.log('user',auth.currentUser)
 useEffect(() => {
  console.log(auth.currentUser)
  const getData = async () => {
    
    const docRef = doc(db, "current-users", auth.currentUser.uid)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  getData(); 
},[])

  

  // if (user.admin)
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Dashboard />} />
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
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/author" element={<Author />} />
        <Route path="/author/Articles" element={<AuthorArticles />} />
        <Route path="/writing" element={<WritingArticle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
