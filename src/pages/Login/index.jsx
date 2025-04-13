import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../../services/api";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      //Faz a API buscar o cadastro com o método POST
      //criando uma variável, onde pegamos apenas o conteúdo de DATA e renomeamos para token, utilizando os dois pontos
      const {data: token} = await api.post('/login', {
        //Insere os valores que o cadastro precisa através das variáveis que vem do formulário
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      //Armazenando o TOKEN do usuário no armazenamento local do navegador
      localStorage.setItem('token', token)

      navigate('/listar-usuarios')
      
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Senha ou email incorretos");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-grey-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input ref={emailRef} placeholder="Email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
        <input ref={passwordRef} placeholder="Senha" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-blue-400" type="submit">Login</button>
      </form>
      <Link to="/" className="text-blue-700 hover:underline mt-4 block text-center">
        Não tem uma conta? Cadastre-se
      </Link>
    </div>
  );
}

export default Login;
