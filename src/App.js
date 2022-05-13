import { BrowserRouter, Routes, Route } from "react-router-dom";

import Author from './pages/author'
import AuthorArticles from './pages/authorArticles'
import WritingArticle from './WritingArticle/WritingArticle'
import Dashboard from "./pages/dashboard";
import './App.css'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Dashboard/>}/>
        <Route path="/author" element = {<Author/>}/>
        <Route path="/author/Articles" element = {<AuthorArticles/>}/>
        <Route path="/writing" element = {<WritingArticle/>}/>
      </Routes>

    </BrowserRouter>
   
  );
}

export default App;
