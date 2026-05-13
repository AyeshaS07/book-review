import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const addReview = async () => {

    const data = {
      book,
      author,
      review,
      rating
    };

    await fetch("http://localhost:5000/addReview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    getReviews();
  };

  const getReviews = async () => {
    const res = await fetch("http://localhost:5000/reviews");
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="container">

      <h1>📚 Book Review System</h1>

      <input
        placeholder="Book Name"
        onChange={(e) => setBook(e.target.value)}
      />

      <input
        placeholder="Author"
        onChange={(e) => setAuthor(e.target.value)}
      />

      <textarea
        placeholder="Write your review..."
        onChange={(e) => setReview(e.target.value)}
      />

      <h3>Rating</h3>

      <div className="stars">
        {[1,2,3,4,5].map((star)=>(
          <span
            key={star}
            className={star <= rating ? "star filled" : "star"}
            onClick={()=>setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <button onClick={addReview}>Add Review</button>

      <h2>Reviews</h2>

      {reviews.map((r,i)=>(
        <div className="card" key={i}>  
          <h3>{r.book}</h3>
          <p><b>Author:</b> {r.author}</p>
          <p>{r.review}</p>

          <p className="reviewStars">
            {"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}
          </p>
        </div>
      ))}

    </div>
  );
}

export default App;