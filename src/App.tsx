import React, { useState } from 'react';
import { Search, Github } from 'lucide-react';

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUser(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('Nenhum perfil foi encontrado com esse nome de usuário.');
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Tente novamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-12 p-4"> {/* Adicionado p-4 para padding */}
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-6 animate-float mb-6">
            <Github size={72} className="text-blue-400" />
            <h1 className="text-7xl font-bold text-gradient">Perfil GitHub</h1>
          </div>
          <p className="text-white/100 text-2xl">Busque por um usuário do GitHub</p>
        </div>

        {/* Search Form */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-2xl mx-auto w-full flex justify-center">
            <form onSubmit={searchUser} className="relative flex items-center w-full max-w-lg">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite um usuário do GitHub"
                className="w-full px-8 py-6 pr-16 rounded-2xl glass-effect input-focus-ring transition-all duration-300 text-xl"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-blue-400 hover:text-blue-300 hover-glow disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                disabled={loading}
              >
                <Search size={32} />
              </button>
            </form>
          </div>
        </div>



        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="loading-spinner rounded-full h-24 w-24 border-4"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="glass-effect rounded-2xl p-12 text-center animate-fadeIn max-w-2xl mx-auto">
            <p className="text-red-400 text-3xl mb-4">{error}</p>
            <p className="text-white/70 text-xl">Tente novamente com outro usuário</p>
          </div>
        )}

        {/* User Profile */}
        {user && (
          <div className="glass-effect rounded-2xl p-16 animate-fadeIn">
            <div className="flex flex-col items-center space-y-8 mb-16">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-48 h-48 rounded-full border-4 border-white/20 hover:border-blue-400 transition-colors duration-300 shadow-2xl"
              />
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-bold text-gradient">{user.name}</h2>
                <p className="text-white/70 text-2xl">@{user.login}</p>
                {user.bio && (
                  <p className="text-white/80 text-2xl max-w-2xl mx-auto leading-relaxed">
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12"> {/* Ajuste para grid responsivo */}
              <div className="stat-card glass-effect rounded-2xl p-10 text-center">
                <p className="text-5xl font-bold text-blue-400 mb-4">{user.public_repos}</p>
                <p className="text-white/70 text-2xl">Repositórios</p>
              </div>
              <div className="stat-card glass-effect rounded-2xl p-10 text-center">
                <p className="text-5xl font-bold text-blue-400 mb-4">{user.followers}</p>
                <p className="text-white/70 text-2xl">Seguidores</p>
              </div>
              <div className="stat-card glass-effect rounded-2xl p-10 text-center">
                <p className="text-5xl font-bold text-blue-400 mb-4">{user.following}</p>
                <p className="text-white/70 text-2xl">Seguindo</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;