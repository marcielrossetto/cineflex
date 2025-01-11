import { useEffect, useState } from "react";
import api from "../services/api";
import '../styles/style.css';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get("/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Erro ao buscar filmes:", err));
  }, []);

  return (
    <div>
      <div className="movie-container">
        <h1>Escolha o filme</h1>
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={movie.posterURL}
            alt={movie.title}
            className="movie"
            onClick={() => window.location.href = `/sessoes/${movie.id}`}
          />
        ))}
      </div>
    </div>
  );
}
