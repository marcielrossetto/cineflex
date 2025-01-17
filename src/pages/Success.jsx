import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SuccessContainer = styled.div`
  padding: 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #2b2d36;
  width:100%;
  margin: auto;
  height: 100vh;
  

  h1 {
    color:#9DB899;
    text-align: center;
  }

  .info-block {
    margin: 15px 0;
    padding: 10px;
    background-color: #2B2D36;
    border-radius: 5px;

    strong{
      color: #EE897F;
      font-family: Sarala;
font-size: 22px;
font-weight: 700;
line-height: 35.87px;
letter-spacing: 0.04em;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;

    }
    p {
      margin: 5px 0;
      font-family: Sarala;
font-size: 20px;
font-weight: 400;
line-height: 32.61px;
letter-spacing: 0.04em;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;


    }

  }

  button {
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    background-color: #EE897F;
    color: #000000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: Sarala;
font-size: 18px;
font-weight: 700;
line-height: 29.35px;
letter-spacing: 0.04em;
text-align: center;
text-underline-position: from-font;
text-decoration-skip-ink: none;

  }
`;

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionInfo, buyerInfo } = location.state || {};

  if (!sessionInfo || !buyerInfo) {
    return <p>Erro: Informações não foram carregadas corretamente.</p>;
  }

  const { movieTitle, sessionDate, sessionTime, seats } = sessionInfo;
  const { name, cpf } = buyerInfo;

  return (
    <SuccessContainer>
      <h1>Pedido finalizado!</h1>
      <div className="info-block">
        <strong>Filme e sessão</strong>
        <hr />
        <p>{movieTitle}</p>
        <p>
          {sessionDate} às {sessionTime}
        </p>
      </div>
      <div className="info-block">
        <strong>Ingressos</strong>
        <hr />
        {seats.map((seat, index) => (
          <p key={index}>Assento {seat}</p>
        ))}
      </div>
      <div className="info-block">
        <strong>Comprador(a)</strong>
        <hr />
        <p>Nome: {name}</p>
        <p>CPF: {cpf}</p>
      </div>
      <button onClick={() => navigate("/")}>Voltar para tela inicial</button>
    </SuccessContainer>
  );
}
