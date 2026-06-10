import { Outlet, Link } from 'react-router';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">ProfiSfera</h3>
              <p className="text-sm text-muted-foreground">Официальные материалы Tokuyama Dental для стоматологических клиник</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <a href="mailto:info@profisfera.ru" className="hover:text-primary">
                    info@profisfera.ru
                  </a>
                </p>
                <p>
                  <a href="tel:+79313181319" className="hover:text-primary">
                    +7 (931) 318-13-19
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Информация</h3>
              <div className="space-y-2 text-sm">
                <Link to="/loyalty" className="block text-muted-foreground hover:text-primary">
                  Условия программы лояльности
                </Link>
                <a href="#" className="block text-muted-foreground hover:text-primary">
                  Политика обработки персональных данных
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary">
                  Пользовательское соглашение
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © Profisfera, 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
