import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../services/api";
import '../styles/style.css';


const SeatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  font-size: 16px;

  @media (max-width: 600px) {
    padding: 10px;  // Reduz o padding em telas menores
  }
`;

const Seat = styled.button`
  width: 30px;
  height: 30px;
  margin: 5px;
  border: 1px solid ${({ selected }) => (selected ? "#FF4791" : "#7B8B99")};
  background-color: ${({ available, selected }) =>
    !available ? "#C3CFD9" : selected ? "#8DD7CF" : "#E8833A"};
  color: ${({ available }) => (!available ? "#C3CFD9" : "#000")};
  border-radius: 50%;
  font-size: 14px;
  cursor: ${({ available }) => (!available ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ available, selected }) =>
      available && !selected ? "#F3A68C" : ""};
  }

  @media (max-width: 600px) {
    width: 25px;  // Ajusta o tamanho dos assentos para telas pequenas
    height: 25px;
    font-size: 12px;  // Reduz o tamanho da fonte
  }
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  input {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    padding: 10px;
    background-color: #e8833a;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
  }

  @media (max-width: 600px) {
    max-width: 100%;  // Deixa o formulário ocupar 100% da tela em dispositivos pequenos
    input, button {
      font-size: 14px;  // Diminui o tamanho da fonte em telas pequenas
    }
  }
`;

export default function Seats() {
  const { idSessao } = useParams(); // Captura o ID da sessão da URL
  const [session, setSession] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [buyerName, setBuyerName] = useState("");
  const [buyerCpf, setBuyerCpf] = useState("");

  useEffect(() => {
    api.get(`/showtimes/${idSessao}/seats`)
      .then((res) => setSession(res.data))
      .catch((err) => console.error("Erro ao buscar assentos:", err));
  }, [idSessao]);

  const toggleSeat = (seat) => {
    if (!seat.isAvailable) {
      alert("Esse assento não está disponível");
      return;
    }

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSeats.length) {
      alert("Selecione pelo menos um assento.");
      return;
    }

    const payload = {
      ids: selectedSeats,
      name: buyerName,
      cpf: buyerCpf,
    };

    api.post("/seats/book-many", payload)
      .then(() => {
        alert("Assentos reservados com sucesso!");
        window.location.href = "/sucesso";
      })
      .catch((err) => console.error("Erro ao reservar assentos:", err));
  };

  if (!session) {
    return <p>Carregando...</p>;
  }

  return (
    <SeatsContainer>
      <h1>Selecione o(s) assento(s)</h1>
      <div>
        {session.seats.map((seat) => (
          <Seat
            key={seat.id}
            available={seat.isAvailable}
            selected={selectedSeats.includes(seat.id)}
            onClick={() => toggleSeat(seat)}
          >
            {seat.name}
          </Seat>
        ))}
      </div>

      <FormContainer onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do comprador"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF do comprador"
          value={buyerCpf}
          onChange={(e) => setBuyerCpf(e.target.value)}
          required
        />
        <button type="submit">Reservar assento(s)</button>
      </FormContainer>
    </SeatsContainer>
  );
}
