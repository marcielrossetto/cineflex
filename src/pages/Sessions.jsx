import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../services/api";
import '../styles/style.css';


const SessionContainer = styled.div`
  padding: 20px;
  background-color: #1e1e22;
  width: 100% ;
   height: 100%; 
  display: flex;
  justify-content: center; 
  align-items: center; 
  flex-direction: column;
`;

const DayContainer = styled.div`
  margin-bottom: 10px;
  color: white;
  width: 80%;
height: 149px;
top: 145px;
left: 18px;
gap: 0px;
border-radius: 8px;
opacity: 0px;
background-color: #2B2D36;
border: 1px solid black;
align-items: center;
padding: 10px;

hr{
  border: 1px solid  #4E5A65; 
  margin:10px 0; 
}
h2{
  font-size: 20px;
}
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
  font-family: Sarala;
  font-size: 34px;
  color: #FFF;


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
  const { idFilme } = useParams();
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
       Selecione Horario
      </MovieDetails>

      {/* Lista de sessões por dia */}
      {movie.days.map((day) => (
        <DayContainer key={day.id}>
          <h2>{`${day.weekday} - ${day.date}`}</h2>
          <hr  />
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
