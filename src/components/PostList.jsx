import * as React from "react";
import Post from './Post'

export default function PostList() {
    const alim = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <>
    {
            alim.map(()=>{
                return <Post/>

            })
        }
     <Post/>
    </>
  );
}
