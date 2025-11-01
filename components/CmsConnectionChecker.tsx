
import React from 'react';

const CmsConnectionChecker: React.FC = () => {
  // Check if the environment variable is missing.
  // This variable is crucial for the app to connect to the WordPress backend.
  const isApiUrlMissing = !process.env.REACT_APP_WORDPRESS_API_ENDPOINT;

  // Render the warning banner only if the URL is missing.
  if (!isApiUrlMissing) {
    return null;
  }

  return (
    <div 
      className="bg-red-800 text-white text-center p-3 font-semibold text-sm"
      role="alert"
    >
      <i className="fas fa-exclamation-triangle mr-2"></i>
      <strong>Atenção:</strong> A conexão com o WordPress não foi configurada. O site está exibindo dados de exemplo.
      Por favor, defina a variável de ambiente `REACT_APP_WORDPRESS_API_ENDPOINT` nas configurações de sua hospedagem.
    </div>
  );
};

export default CmsConnectionChecker;
