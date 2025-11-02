
import React, { useState, useEffect } from 'react';
import { WP_API_URL } from '../config';

const DebugApi: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseData, setResponseData] = useState<any>(null);
  const [errorData, setErrorData] = useState<any>(null);

  const apiUrl = WP_API_URL;
  const testEndpoint = apiUrl ? `${apiUrl}/wp-json/wp/v2/posts?per_page=1` : '';

  const runTest = async () => {
    setStatus('loading');
    setResponseData(null);
    setErrorData(null);

    if (!apiUrl) {
      setStatus('error');
      setErrorData({
        title: 'Falha na Configuração',
        message: 'A variável WP_API_URL não está definida no arquivo `config.ts`.',
        details: 'Esta variável precisa ser configurada manualmente no código para que o site possa se conectar ao WordPress.'
      });
      return;
    }
    
    // **NOVO: Verificação de Mixed Content**
    const isMixedContent = window.location.protocol === 'https:' && apiUrl.startsWith('http:');
    if (isMixedContent) {
        setStatus('error');
        setErrorData({
            title: 'Erro Crítico de Conteúdo Misto (Mixed Content)',
            message: 'Seu site está em um endereço seguro (https://) mas está tentando buscar dados de um endereço inseguro (http://). Navegadores modernos bloqueiam isso por segurança.',
            details: (
                <div>
                    <p className="mb-2">Esta é a causa raiz da "Falha na Conexão".</p>
                    <p className="font-bold">Solução Definitiva (2 passos):</p>
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li><strong>Ative o SSL no WordPress:</strong> Peça ao seu provedor de hospedagem para instalar o certificado SSL (Let's Encrypt) no domínio <code className="bg-gray-700 text-amber-300 px-1 rounded">mranderson1.hospedagemdesites.ws</code>.</li>
                        <li><strong>Atualize a URL no WordPress:</strong> Após o SSL estar ativo, vá em <code className="bg-gray-700 text-amber-300 px-1 rounded">Configurações > Geral</code> no seu painel do WordPress e mude as duas URLs de <code className="bg-gray-700 text-amber-300 px-1 rounded">http://</code> para <code className="bg-gray-700 text-amber-300 px-1 rounded">https://</code>.</li>
                    </ol>
                    <p className="mt-3">O código do site (no arquivo `config.ts`) já foi atualizado para usar `https`. Assim que você ajustar o servidor, a conexão funcionará.</p>
                </div>
            )
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
          title: 'Erro na Resposta do Servidor',
          message: `O servidor respondeu com um erro: ${response.status} ${response.statusText}`,
          details: data,
        });
      }
    } catch (error: any) {
      setStatus('error');
      let errorTitle = 'Erro de Rede';
      let errorMessage = 'Ocorreu um erro de rede desconhecido.';
      let errorDetails: React.ReactNode = 'Verifique o console do navegador (F12) para mais detalhes.';

      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
          errorTitle = 'Erro de CORS (Cross-Origin Resource Sharing)';
          errorMessage = 'O servidor WordPress está bloqueando a requisição vinda do seu site.';
          errorDetails = (
             <div>
                <p>Isso geralmente ocorre porque o plugin de permissão (`mr-anderson-react-installer`) não está ativo no WordPress ou há um cache no servidor.</p>
                <p className="font-bold mt-2">Solução:</p>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>Verifique se o plugin "Mr. Anderson React Installer" está **instalado e ativado** no seu painel do WordPress.</li>
                    <li>Peça ao seu provedor de hospedagem para **limpar o cache do servidor** (Varnish, Nginx, etc.).</li>
                </ol>
             </div>
          );
      }
      
      setErrorData({
        title: errorTitle,
        message: errorMessage,
        details: errorDetails
      });
    }
  };

  useEffect(() => {
    runTest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">Diagnóstico da API</h1>
          <p className="mt-4 text-lg text-slate-300">
            Esta página testa a conexão entre o site e o seu WordPress. Versão 5.2 (Forçando Atualização de Build)
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-300">URL da API sendo testada:</h2>
            <p className="font-mono text-amber-400 break-all">{apiUrl ? testEndpoint : 'Não configurada em config.ts'}</p>
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
                <p className="text-green-400 text-sm mt-2">O site conseguiu buscar os dados do WordPress.</p>
                <pre className="mt-4 bg-black/50 p-2 rounded text-xs text-slate-300 overflow-auto max-h-60">
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-900/50 border border-red-700 rounded-md">
                <h3 className="font-bold text-red-300"><i className="fas fa-exclamation-triangle mr-2"></i>{errorData?.title || 'Falha na Conexão'}</h3>
                <p className="text-red-400 text-sm mt-2 font-semibold">{errorData?.message}</p>
                <div className="mt-4 bg-black/50 p-2 rounded text-xs text-slate-300 overflow-auto">
                    <div className="font-bold">Detalhes/Solução:</div>
                    <div>{typeof errorData?.details === 'string' ? <p>{errorData.details}</p> : errorData?.details}</div>
                </div>
              </div>
            )}
          </div>
          
           {/* New Diagnostics Section */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h2 className="text-lg font-semibold text-slate-300">Método de Configuração Atual</h2>
            <p className="text-sm text-slate-400 mb-4">
              A URL da API do WordPress está configurada diretamente no código como uma solução definitiva. O valor está centralizado no arquivo <code className="bg-gray-700 text-amber-300 px-1 rounded">config.ts</code>. Se precisar alterar a URL no futuro, edite apenas este arquivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugApi;
