
import React from 'react';
import { WP_API_URL } from '../config';

const CmsConnectionChecker: React.FC = () => {
  // Check if the URL from the config file is missing.
  const isApiUrlMissing = !WP_API_URL;

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
      <strong>Atenção Desenvolvedor:</strong> A conexão com o WordPress não foi configurada. O site está exibindo dados de exemplo.
      Por favor, defina a variável `WP_API_URL` no arquivo `config.ts`.
    </div>
  );
};

export default CmsConnectionChecker;