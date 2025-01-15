import { useEffect, useState } from "react";
import api from "../services/api";
import styled from 'styled-components';

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;  /* Alinha para pegar toda a largura */
  justify-content: flex-start;
  height: 100%;  /* Faz o contêiner ocupar 100% da altura */
  width: 100%;  /* Faz o contêiner ocupar 100% da largura */
  background-color: #2b2d36;
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
  margin: 0 auto;
  background-color: #2b2d36;
  color: #ffffff;
  padding: 20px;
  box-sizing: border-box; /* Garantir que o padding não ultrapasse a largura da div */
  max-width: 100%; /* Garantir que a largura não ultrapasse a tela */

  @media (max-width: 768px) {
    align-items: center;
  }
`;


const Movie = styled.div`
  flex: 1 1 145px;
  max-width: 145px;
  height: 210px;
  margin: 2px;
  border-radius: 18px;
  cursor: pointer;
  padding: 10px;
  width: 145px;

  @media (max-width: 768px) {
    flex: 100%;
    max-width: 145px;
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
