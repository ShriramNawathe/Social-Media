import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import { useParams } from "react-router-dom";

// Create context for the app state
const AppContext = createContext();

// Home page component
function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log("Url fetched");
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <div className="page">
        {posts.map((post) => (
          <div className="container" key={post.id}>
            <Link to={`/item/${post.id}`}>
              <img
                src={`https://picsum.photos/200?random=${post.id}`}
                alt={post.title}
              />
              <div>
                <p>User ID: {post.id}</p>
              </div>
              <div>
                <p>Title: {post.title}</p>
              </div>
              <div>
                <p>Body: {post.body}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Detail page component

function Detail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  console.log("id>>", id);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data>>>>>", data);
        setPost(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }
  // console.log("post>>",post);

  return (
    <div className="post">
      <div>Details Page For Post With ID: {post.id}</div>
      <div>
        <img
          src={`https://picsum.photos/200?random=${post.id}`}
          alt={post.title}
        />
      </div>
      <div>
        <p>User ID:{post.id}</p>
      </div>
      <div>
        <p>Title: {post.title}</p>
      </div>
      <div>
        <p>Body: {post.body}</p>
      </div>
    </div>
  );
}

// App component
function App() {
  const [state, setState] = useState({});

  return (
    <AppContext.Provider value={[state, setState]}>
      <Router>
        <div>
          <nav className="navbar">
            <Link to="/">Social Media App</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<Detail />} />
          </Routes>

        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
