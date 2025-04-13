import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function ListarUsuarios() {
	const [allUsers, setAllUsers] = useState([]);
	//É chamado toda vez que a tela carrega

	useEffect(() => {
		async function loadUsers() {
			const token = localStorage.getItem("token");
			const {
				data: { users },
			} = await api.get("/listar-usuarios", {
				//aqui o useEffect permite enviar ao backend alguma informação
				headers: { Authorization: `Bearer ${token}` },
				//headers.authorization
			});
			//Pega os valores chegando na API e colocando dentro do array
			setAllUsers(users);
		}

		loadUsers();
	}, []);

	return (
		<div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg">
			<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Lista de Usuários</h2>
			<ul className="space-y-2">
				{allUsers && allUsers.length > 0 && allUsers.map((user) => (
          //React pede que cada item tenha um ID, então colocamos key = user.id
					<li key={user.id} className="bg-gray-100 p-4 rounded-md">
						<p className="font-semibold">ID: {user.id}</p>
						<p className="font-semibold">Nome: {user.name}</p>
						<p className="font-semibold">Email: {user.email}</p>
					</li>
				))}
              <Link to="/" className="text-blue-700 hover:underline mt-4 block text-center">
        Retornar
      </Link>
			</ul>

		</div>
	);
}

export default ListarUsuarios;
