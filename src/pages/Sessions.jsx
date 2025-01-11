import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../services/api";
import "../styles/style.css";

const SessionContainer = styled.div`
  padding: 20px;
  background-color: #2b2d36;
  width: 450px;
  height: 100%; /* Ocupa 100% da altura da tela */
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  flex-direction: column;
  margin: 20%;
`;

const DayContainer = styled.div`
  margin-bottom: 20px;
  color: white;
`;

const Showtime = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: 2px solid #ee897f;
  border-radius: 5px;
  background-color: #161413;
  color: #ee897f;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #ee897f;
    color: #161413;
  }
`;

const MovieDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 100px;
    margin-right: 20px;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
`;

export default function Sessions() {
  const { idFilme } = useParams(); // Captura o ID do filme da URL
  const navigate = useNavigate(); // Hook para navegação programática
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api
      .get(`/movies/${idFilme}/showtimes`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error("Erro ao buscar sessões:", err));
  }, [idFilme]);

  if (!movie) {
    return <p>Carregando...</p>;
  }

  return (
    <SessionContainer>
      {/* Detalhes do filme */}
      <MovieDetails>
        <img src={movie.posterURL} alt={movie.title} />
        <h1>{movie.title}</h1>
      </MovieDetails>

      {/* Lista de sessões por dia */}
      {movie.days.map((day) => (
        <DayContainer key={day.id}>
          <h2>{`${day.weekday} - ${day.date}`}</h2>
          <div>
            {day.showtimes.map((time) => (
              <Showtime
                key={time.id}
                onClick={() => navigate(`/assentos/${time.id}`)} // Navegação programática
              >
                {time.name}
              </Showtime>
            ))}
          </div>
        </DayContainer>
      ))}
    </SessionContainer>
  );
}
