import React, { useEffect, useState } from "react";
import Post from "./Post";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const myList = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setPosts(myList.filter((cur) => cur.status));
    };
    getData();
    // db.collection("posts")
    //   .orderBy("createdDate", "desc")
    //   .onSnapshot((snapshot) => {
    // const myList = snapshot.docs.map((doc) => {
    //   return {
    //     id: doc.id,
    //     ...doc.data(),
    //   };
    // });
    // console.log(myList);
    //   });
  }, []);

  return (
    <div>
      {posts.map((cur, index) => {
        return <Post key={`post-${index}`} data={cur} />;
      })}
    </div>
  );
}
