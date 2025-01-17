import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../services/api";
import "../styles/style.css";

const SeatsContainer = styled.div`
  margin-top: 0;
  width: 100%;
  font-size: 16px;
  background-color: #2b2d36;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh - 90px);

  @media (max-width: 768px) {
    padding: 10px;
    width: 100%;
  }
`;

const Seat = styled.button`
  width: 30px;
  height: 30px;
  margin: 5px;
  border: 1px solid ${({ selected }) => (selected ? "#EE897F" : "#7B8B99")};
  background-color: ${({ available, selected }) =>
    !available ? "#C3CFD9" : selected ? "#FADBC5" : "#9DB899"};
  color: ${({ available }) => (!available ? "#C3CFD9" : "#000")};
  border-radius: 50%;
  font-size: 14px;
  cursor: ${({ available }) => (!available ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${({ available, selected }) =>
      available && !selected ? "#F3A68C" : ""};
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    font-size: 12px;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  input {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;

    @media (max-width: 768px) {
      padding: 8px;
      font-size: 14px;
    }
  }

  button {
    padding: 10px;
    background-color: #e8833a;
    color: #000000;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    font-family: Sarala;
font-size: 18px;
font-weight: 700;
line-height: 29.35px;
letter-spacing: 0.04em;
text-align: center;
text-underline-position: from-font;
text-decoration-skip-ink: none;


    @media (max-width: 768px) {
      padding: 8px;
      font-size: 14px;
    }
  }
`;

function validateCpf(cpf) {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf[i - 1]) * (11 - i);
  }

  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf[i - 1]) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;

  return remainder === parseInt(cpf[10]);
}

export default function Seats() {
  const { idSessao } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [buyerName, setBuyerName] = useState("");
  const [buyerCpf, setBuyerCpf] = useState("");
  const [isCpfValid, setIsCpfValid] = useState(true);

  useEffect(() => {
    api
      .get(`/showtimes/${idSessao}/seats`)
      .then((res) => setSession(res.data))
      .catch((err) => console.error("Erro ao buscar assentos:", err));
  }, [idSessao]);

  const toggleSeat = (seat) => {
    if (!seat.isAvailable) {
      alert("Esse assento não está disponível.");
      return;
    }

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handleCpfChange = (e) => {
    const value = e.target.value;
    setBuyerCpf(value);

    // Valida CPF ao digitar
    if (value.length === 14) {
      setIsCpfValid(validateCpf(value));
    } else {
      setIsCpfValid(true); // Reseta validação enquanto digita
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSeats.length) {
      alert("Selecione pelo menos um assento.");
      return;
    }

    if (!validateCpf(buyerCpf)) {
      alert("CPF inválido. Verifique os dados e tente novamente.");
      return;
    }

    const payload = {
      ids: selectedSeats,
      name: buyerName.trim(),
      cpf: buyerCpf.trim(),
    };

    api
      .post("/seats/book-many", payload)
      .then(() => {
        const sessionInfo = {
          movieTitle: session.movie.title,
          sessionDate: session.day.date,
          sessionTime: session.name,
          seats: selectedSeats.map((id) =>
            session.seats.find((seat) => seat.id === id)?.name
          ),
        };

        const buyerInfo = {
          name: buyerName,
          cpf: buyerCpf,
        };

        navigate("/sucesso", { state: { sessionInfo, buyerInfo } });
      })
      .catch((err) => {
        console.error("Erro ao reservar assentos:", err);
        alert("Erro ao tentar reservar os assentos. Tente novamente.");
      });
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
          onChange={handleCpfChange}
          required
          style={{ borderColor: isCpfValid ? "#ccc" : "red" }}
        />
        {!isCpfValid && <p style={{ color: "red" }}>CPF inválido</p>}
        <button type="submit">Reservar assento(s)</button>
      </FormContainer>
    </SeatsContainer>
  );
}
