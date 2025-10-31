
import React, { useState, useEffect } from 'react';

const DebugApi: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseData, setResponseData] = useState<any>(null);
  const [errorData, setErrorData] = useState<any>(null);

  const apiUrl = process.env.REACT_APP_WP_API_URL;
  const testEndpoint = `${apiUrl}/wp-json/wp/v2/posts?per_page=1`;

  const runTest = async () => {
    setStatus('loading');
    setResponseData(null);
    setErrorData(null);

    if (!apiUrl) {
      setStatus('error');
      setErrorData({
        message: 'A variável de ambiente REACT_APP_WP_API_URL não está definida.',
        details: 'Esta variável precisa ser configurada no seu ambiente de hospedagem (ex: Vercel) para que o site possa se conectar ao WordPress.'
      });
      return;
    }

    try {
      const response = await fetch(testEndpoint);
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setResponseData(data);
      } else {
        setStatus('error');
        setErrorData({
          message: `O servidor respondeu com um erro: ${response.status} ${response.statusText}`,
          details: data,
        });
      }
    } catch (error: any) {
      setStatus('error');
      let errorMessage = 'Ocorreu um erro de rede desconhecido.';
      let errorDetails = 'Verifique o console do navegador (F12) para mais detalhes. Isso geralmente indica um problema de CORS ou "Mixed Content".';

      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
          errorMessage = 'Erro de CORS (Cross-Origin Resource Sharing) ou Conteúdo Misto (Mixed Content).';
          errorDetails = 'O servidor WordPress (`http://mranderson1...`) está bloqueando a requisição vinda do seu site (`https://mranderson.tech`). Siga as instruções para adicionar o código de permissão (header `Access-Control-Allow-Origin`) ao arquivo `functions.php` do seu tema no WordPress.';
      }
      
      setErrorData({
        message: errorMessage,
        details: errorDetails
      });
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">Diagnóstico da API</h1>
          <p className="mt-4 text-lg text-slate-300">
            Esta página testa a conexão entre o site (Vercel) e o seu WordPress (Locaweb). Versão 2.0
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-300">URL da API sendo testada:</h2>
            <p className="font-mono text-amber-400 break-all">{apiUrl ? testEndpoint : 'Não configurada'}</p>
          </div>

          <div className="text-center mb-6">
            <button 
              onClick={runTest} 
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Testando...' : 'Executar Teste Novamente'}
            </button>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-300 mb-2">Resultado:</h2>
            {status === 'loading' && (
              <div className="p-4 bg-gray-800 rounded-md text-center text-slate-400">
                <i className="fas fa-spinner fa-spin mr-2"></i> Carregando...
              </div>
            )}
            {status === 'success' && (
              <div className="p-4 bg-green-900/50 border border-green-700 rounded-md">
                <h3 className="font-bold text-green-300"><i className="fas fa-check-circle mr-2"></i>Conexão bem-sucedida!</h3>
                <p className="text-green-400 text-sm mt-2">O site conseguiu buscar os dados do WordPress. Se o conteúdo ainda não aparece, tente fazer um "Redeploy" na Vercel.</p>
                <pre className="mt-4 bg-black/50 p-2 rounded text-xs text-slate-300 overflow-auto max-h-60">
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-900/50 border border-red-700 rounded-md">
                <h3 className="font-bold text-red-300"><i className="fas fa-exclamation-triangle mr-2"></i>Falha na Conexão</h3>
                <p className="text-red-400 text-sm mt-2 font-semibold">{errorData?.message}</p>
                <div className="mt-4 bg-black/50 p-2 rounded text-xs text-slate-300 overflow-auto">
                    <p className="font-bold">Detalhes/Solução:</p>
                    <p>{typeof errorData?.details === 'string' ? errorData.details : JSON.stringify(errorData?.details, null, 2)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugApi;