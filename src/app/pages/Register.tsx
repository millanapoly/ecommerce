import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, isAuthenticated } = useAuth();
  const redirectTo = searchParams.get('redirect') || '/account';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    inn: '',
    email: '',
    phone: '',
    fullName: '',
    position: '',
    clinicAddress: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const validatePassword = (password: string): boolean => {
    const hasMinLength = password.length >= 8;
    const hasLetters = /[A-Za-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return hasMinLength && hasLetters && hasNumbers;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Минимум 8 символов, обязательны буквы A-Z / a-z и цифры';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (!agreedToTerms || !agreedToPrivacy) {
      newErrors.agreements = 'Необходимо согласиться с условиями';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = register({
      inn: formData.inn,
      email: formData.email,
      phone: formData.phone,
      fullName: formData.fullName,
      position: formData.position,
      clinicAddress: formData.clinicAddress,
      password: formData.password
    });

    if (success) {
      navigate(redirectTo);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <Link
          to={`/login${redirectTo !== '/account' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>

        <div className="text-center mb-8">
          <div className="text-2xl font-semibold mb-2">
            <span className="text-[#0066FF]">PROFISFERA</span>
          </div>
          <div className="text-sm text-muted-foreground">× Tokuyama Dental</div>
        </div>

        <div className="bg-white border border-border rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-center mb-4">Регистрация</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Все поля обязательны для заполнения
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="ИНН клиники"
                value={formData.inn}
                onChange={(e) => updateField('inn', e.target.value)}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary outline-none"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary outline-none"
              />
            </div>

            <div>
              <input
                type="tel"
                placeholder="Телефон"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary outline-none"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="ФИО"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary outline-none"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Должность"
                value={formData.position}
                onChange={(e) => updateField('position', e.target.value)}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary outline-none"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Адрес клиники"
                value={formData.clinicAddress}
                onChange={(e) => updateField('clinicAddress', e.target.value)}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary outline-none"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
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

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Подтверждение пароля"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Минимум 8 символов, обязательны буквы (A-Z и a-z) и цифры
            </p>

            {Object.values(errors).map((error, index) => (
              <div key={index} className="text-sm text-destructive">
                {error}
              </div>
            ))}

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm">
                  Согласен с{' '}
                  <a href="#" className="text-[#0066FF] hover:underline">
                    условиями программы лояльности
                  </a>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm">
                  Согласен с{' '}
                  <a href="#" className="text-[#0066FF] hover:underline">
                    политикой обработки персональных данных
                  </a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
            >
              Зарегистрироваться
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Есть аккаунт?{' '}
            <Link to={`/login${redirectTo !== '/account' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`} className="text-[#0066FF] hover:underline">
              Войдите
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Если возникли вопросы, напишите нам{' '}
            <a href="mailto:info@profisfera.ru" className="text-[#0066FF] hover:underline">
              info@profisfera.ru
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
