import { useState, ChangeEvent } from "react";
import logofull from "../../assets/logofull.svg";
import arrowRightImage from "../../assets/arrow-right.svg";
import { loginService } from '../../service/login'

import './index.css'
import { useNavigate } from "react-router-dom";

function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleAuth() {

    const payload = { cpf: cpf, password: password}

    const response = await loginService.login(payload)

    if (response.data.token) {
      sessionStorage.setItem('authToken', response.data.token)
      navigate('/List')
    }
  };


  return (
    <main className="login" id="login" >
      <img src={logofull} alt="Cora" title="Cora" />
      <h1 className="loginh1">Fazer Login</h1>
      <input id="cpf" placeholder="Insira seu email ou CPF" onChange={(e) => setCpf(e.target.value)} />
      <input
        id="password"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth} className="loginbutton">
        <span>
        Continuar
        </span>
        <img src={arrowRightImage} />
      </button>
    </main>
  );
}

export { Login };
