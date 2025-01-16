import { useEffect, useState } from "react";
import api from "../services/api";
import styled from 'styled-components';

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  background-color: #2b2d36;
  overflow-x: hidden;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
`;



const Header1 = styled.header`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  color: #FFF;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #2b2d36;
  max-width: 100%;
`;

const Movie = styled.div`
  flex: 1 1 145px;
  max-width: 145px;
  height: 210px;
  margin: 2px;
  border-radius: 18px;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex: 100%;
    max-width: 145px;
    margin: 0;
    padding: 5px;
  }
`;

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get("/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Erro ao buscar filmes:", err));
  }, []);

  return (
    <ParentContainer>
      <Header1>
        <h1>Em Cartaz</h1>
      </Header1>
      <MovieContainer>
        {movies.map((movie) => (
          <Movie key={movie.id} onClick={() => window.location.href = `/sessoes/${movie.id}`}>
            <img src={movie.posterURL} alt={movie.title} style={{ width: '100%', height: '100%', borderRadius: '18px' }} />
          </Movie>
        ))}
      </MovieContainer>
    </ParentContainer>
  );
}
