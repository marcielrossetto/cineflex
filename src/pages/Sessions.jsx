import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../services/api";
import '../styles/style.css';


const SessionContainer = styled.div`
  padding: 20px;
  background-color: #2B2D36;
  width: 450px ;
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
  border: 2px solid #EE897F;
  border-radius: 5px;
  background-color: #161413;
  color: #EE897F;
  font-size: 16px;
  cursor: pointer;
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
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api.get(`/movies/${idFilme}/showtimes`)
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
                onClick={() => (window.location.href = `/assentos/${time.id}`)}
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
