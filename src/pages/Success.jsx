import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import InputMask from "react-input-mask"; // Biblioteca para máscara de CPF

const Seats = () => {
  const [session, setSession] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userName, setUserName] = useState("");
  const [userCpf, setUserCpf] = useState("");
  const { sessionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se a sessionId está disponível antes de fazer a requisição
    if (sessionId) {
      axios
        .get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessionId}/seats`)
        .then((response) => {
          console.log(response.data); // Verifique os dados aqui
          setSession(response.data);
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao carregar os dados dos assentos.");
        });
    }
  }, [sessionId]);

  const handleSeatClick = (seat) => {
    if (!seat.isAvailable) {
      alert("Este assento não está disponível!");
      return;
    }
    const alreadySelected = selectedSeats.find((s) => s.id === seat.id);
    if (alreadySelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservationData = {
      ids: selectedSeats.map((seat) => seat.id),
      name: userName,
      cpf: userCpf,
    };

    axios
      .post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", reservationData)
      .then(() => {
        navigate("/sucesso", {
          state: {
            movie: session.movie,
            date: session.day.date,
            time: session.name,
            seats: selectedSeats.map((seat) => seat.name),
            buyer: { name: userName, cpf: userCpf },
          },
        });
      })
      .catch((err) => {
        console.error("Erro ao reservar assentos:", err);
        alert("Ocorreu um erro ao tentar reservar os assentos. Tente novamente.");
      });
  };

  // Verifica se os dados da sessão estão carregados
  if (!session || !session.seats) {
    return <p>Carregando...nao para de carregar</p>;
  }

  return (
    <Page>
      <h1>Selecione os assentos</h1>
      <SeatsGrid>
        {session.seats.map((seat) => (
          <SeatButton
            key={seat.id}
            isAvailable={seat.isAvailable}
            isSelected={selectedSeats.some((s) => s.id === seat.id)}
            onClick={() => handleSeatClick(seat)}
          >
            {seat.name}
          </SeatButton>
        ))}
      </SeatsGrid>
      <Form onSubmit={handleSubmit}>
        <label>
          Nome do comprador:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        <label>
          CPF do comprador:
          <InputMask
            mask="999.999.999-99"
            value={userCpf}
            onChange={(e) => setUserCpf(e.target.value)}
            required
          >
            {(inputProps) => <input {...inputProps} />}
          </InputMask>
        </label>
        <button type="submit">Reservar assento(s)</button>
      </Form>
    </Page>
  );
};

export default Seats;

// Estilização
const Page = styled.div`
  padding: 20px;
`;

const SeatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  margin: 20px 0;
`;

const SeatButton = styled.button`
  background-color: ${({ isAvailable, isSelected }) =>
    !isAvailable ? "#FBE192" : isSelected ? "#8DD7CF" : "#C3CFD9"};
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: ${({ isAvailable }) => (isAvailable ? "pointer" : "not-allowed")};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 16px;
  }

  input {
    padding: 8px;
    font-size: 14px;
  }

  button {
    padding: 10px;
    background-color: #e8833a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #d3722a;
    }
  }
`;
