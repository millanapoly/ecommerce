import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const redirectTo = searchParams.get('redirect') || '/account';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    innOrPhone: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(formData.innOrPhone, formData.password);

    if (success) {
      navigate(redirectTo);
    } else {
      setError('Неверный ИНН/телефон или пароль');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-2xl font-semibold mb-2">
            <span className="text-[#0066FF]">PROFISFERA</span>
          </div>
          <div className="text-sm text-muted-foreground">× Tokuyama Dental</div>
        </div>

        <div className="bg-white border border-border rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-center mb-8">Авторизация</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="ИНН или телефон"
                value={formData.innOrPhone}
                onChange={(e) => setFormData({ ...formData, innOrPhone: e.target.value })}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary outline-none"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && <div className="text-sm text-destructive text-center">{error}</div>}

            <Link to="/forgot-password" className="block text-sm text-[#0066FF] hover:underline">
              Не помню пароль
            </Link>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
            >
              Войти
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Нет аккаунта?{' '}
            <Link to={`/register${redirectTo !== '/account' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`} className="text-[#0066FF] hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
