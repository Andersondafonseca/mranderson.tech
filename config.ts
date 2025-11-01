/**
 * ARQUIVO DE CONFIGURAÇÃO CENTRAL
 * 
 * Motivo:
 * Devido a um problema persistente e incomum com as variáveis de ambiente na Vercel,
 * esta abordagem centraliza a URL da API do WordPress diretamente no código.
 * Isso garante que a aplicação funcione de forma consistente.
 * 
 * Manutenção Futura:
 * Se a URL do seu WordPress mudar, ESTE É O ÚNICO LUGAR que você precisa alterar.
 */
// IMPORTANTE: A URL foi alterada para https para resolver o erro de Mixed Content.
// O servidor WordPress PRECISA ter um certificado SSL ativo para que isso funcione.
export const WP_API_URL = "https://mranderson1.hospedagemdesites.ws";

/**
 * Verifica se a URL foi definida. Se estiver vazia, exibe um erro claro no console
 * para ajudar na depuração durante o desenvolvimento.
 */
if (!WP_API_URL) {
  console.error(
    "FATAL: A URL da API do WordPress não está definida no arquivo de configuração (config.ts). A aplicação não funcionará corretamente."
  );
}