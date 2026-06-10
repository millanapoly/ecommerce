import { Link, useLocation } from 'react-router';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const totalItems = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Логотип */}
          <Link to="/home" className="flex items-center gap-2 shrink-0">
            <div className="text-xl font-semibold">
              <span className="text-[#0066FF]">PROFISFERA</span>
              
            </div>
          </Link>

          {/* Навигация */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className={`transition-colors ${
                isActive('/home') || isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Главная
            </Link>
            <Link
              to="/catalog"
              className={`transition-colors ${
                isActive('/catalog') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Каталог
            </Link>
            <Link
              to="/loyalty"
              className={`transition-colors ${
                isActive('/loyalty') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Программа лояльности
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isActive('/about') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              О компании
            </Link>
            <Link
              to="/delivery"
              className={`transition-colors ${
                isActive('/delivery') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Доставка и оплата
            </Link>
          </nav>

          {/* Поиск */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-input-background border border-transparent focus:border-primary outline-none transition-colors"
              />
            </div>
          </form>

          {/* Действия */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 hover:bg-accent rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0066FF] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline">
                {isAuthenticated ? 'Кабинет' : 'Войти'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
