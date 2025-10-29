import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

// Simple JWT decoder
function jwtDecode(token: string) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  // State for login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // State for registration
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/area-exclusiva';

  // --- Google Sign-In Logic ---
  useEffect(() => {
    const handleGoogleCallback = async (response: any) => {
        setIsSubmitting(true);
        setError('');
        const userObject = jwtDecode(response.credential);
        
        if (userObject) {
            const result = await auth.loginWithGoogle({
                name: userObject.name,
                email: userObject.email,
                picture: userObject.picture,
                sub: userObject.sub
            });
            if (result.user) {
                navigate(from, { replace: true });
            } else {
                 setError(result.error || 'Ocorreu um erro ao entrar com o Google.');
            }
        } else {
             setError('Não foi possível verificar as informações do Google.');
        }
        setIsSubmitting(false);
    };

    const initializeGoogleSignIn = () => {
        try {
          const google = (window as any).google;
          if (google && google.accounts && google.accounts.id) {
            google.accounts.id.initialize({
              // Replace with your actual Google Client ID
              client_id: '107469628172-2q5g1219m19vnmba1q3h141p2482t70q.apps.googleusercontent.com',
              callback: handleGoogleCallback,
            });
            google.accounts.id.renderButton(
              document.getElementById('googleSignInButton'),
              { theme: 'outline', size: 'large', type: 'standard', text: 'continue_with', shape: 'rectangular' }
            );
          } else {
            console.error("Google Identity Services script not loaded yet.");
          }
        } catch (e) {
          console.error("Error initializing Google Sign-In", e);
          setError("Não foi possível carregar o login com Google.");
        }
    };
    
    // Check if the script has loaded, otherwise wait a bit
    if ((window as any).google) {
        initializeGoogleSignIn();
    } else {
        setTimeout(initializeGoogleSignIn, 500); // Retry after 500ms
    }

  }, [auth, navigate, from]);
  // --- End Google Sign-In Logic ---


  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const result = await auth.login(loginEmail, loginPassword);
    
    setIsSubmitting(false);

    if (result.user) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Credenciais inválidas. Tente novamente ou cadastre-se.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await auth.register(regName, regEmail, regPassword, regWhatsapp);
    
    setIsSubmitting(false);
    
    if (result.user) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Ocorreu um erro no cadastro.');
    }
  };

  const toggleForm = () => {
      setError('');
      setIsRegistering(!isRegistering);
  }

  return (
    <div className="py-16 md:py-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl shadow-amber-500/10">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-slate-100">
                {isRegistering ? 'Crie sua Conta' : 'Área de Membros'}
            </h1>
            <p className="mt-2 text-slate-400">
                {isRegistering 
                    ? 'Junte-se à comunidade e tenha acesso a conteúdos exclusivos.'
                    : 'Acesse os conteúdos bônus do livro.'
                }
            </p>
          </div>

          <div className="mt-8 mb-6 flex justify-center">
            <div id="googleSignInButton"></div>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-gray-500 uppercase">OU</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>


          {isRegistering ? (
            // Registration Form
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-slate-300">Nome Completo</label>
                <input type="text" id="reg-name" value={regName} onChange={(e) => setRegName(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-slate-300">Email</label>
                <input type="email" id="reg-email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
              </div>
               <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-slate-300">Senha</label>
                <input type="password" id="reg-password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label htmlFor="reg-whatsapp" className="block text-sm font-medium text-slate-300">WhatsApp (Opcional)</label>
                <input type="tel" id="reg-whatsapp" value={regWhatsapp} onChange={(e) => setRegWhatsapp(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="(XX) XXXXX-XXXX"/>
              </div>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <div>
                <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Cadastrando...' : 'Cadastrar e Entrar'}
                </Button>
              </div>
            </form>
          ) : (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                <input type="email" id="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="seuemail@exemplo.com" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">Senha</label>
                <input type="password" id="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="********" />
              </div>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <div>
                <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Entrando...' : 'Entrar com Email'}
                </Button>
              </div>
            </form>
          )}
          
          <div className="mt-6 text-center">
              <button onClick={toggleForm} className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                  {isRegistering ? 'Já tem uma conta? Faça login com email' : 'Não tem uma conta? Cadastre-se com email'}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;