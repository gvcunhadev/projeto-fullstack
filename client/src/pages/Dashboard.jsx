import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"; 

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Meu Perfil
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-5 py-2.5 text-base font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" /> {}
            <span>Sair</span>
          </button>
        </div>

        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3 mt-4"></div>
          </div>
        ) : user ? (
          <div>
            <p className="text-lg text-gray-700 mb-3">
              <strong className="font-semibold text-gray-900">Nome:</strong>{" "}
              {user.fullName}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-gray-900">Email:</strong>{" "}
              {user.email}
            </p>
            {}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p className="mb-2">Não foi possível carregar os dados do usuário.</p>
            <button
              onClick={() => window.location.reload()} 
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;