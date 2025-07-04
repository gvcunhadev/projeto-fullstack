import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  
  useEffect(() => {
    console.log("Estado 'errors' atualizado para:", errors);
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); 

    
    if (password.trim() === "") {
      setErrors(["A senha não pode ser vazia."]); 
      return;
    }


    try {
      await api.post("/register", { fullName, email, password });
      navigate("/login");
    } catch (err) {
      console.error("Erro na requisição de registro:", err);

     
      if (err.response && err.response.data) {
        if (err.response.data.errors && Array.isArray(err.response.data.errors)) {
          
          const backendErrors = err.response.data.errors.map(
            (errorDetail) => errorDetail.message
          );
          setErrors(backendErrors);
        } else if (err.response.data.message) {
          
          setErrors([err.response.data.message]);
        } else {
          
          setErrors(["Erro ao registrar. Resposta inesperada do servidor."]);
        }
      } else {
        
        setErrors(["Erro ao registrar. Verifique sua conexão."]);
      }
     
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>
        {}
        {errors.length > 0 && (
          <div className="mb-4">
            {errors.map((msg, index) => (
              <p key={index} className="text-red-500 text-center p-2 border border-red-500 rounded mb-2 last:mb-0">
                {msg}
              </p>
            ))}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Nome Completo
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Registrar
        </button>
        <p className="text-center mt-4">
          Já tem uma conta?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Logar-se
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;