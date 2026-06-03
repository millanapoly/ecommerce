export function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-semibold mb-8">О компании</h1>

        <div className="prose max-w-none space-y-6">
          <div className="bg-white border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">ProfiSfera × Tokuyama Dental</h2>
            <p className="text-muted-foreground mb-4">
              Мы предоставляем стоматологическим клиникам доступ к официальным материалам
              Tokuyama Dental через удобную онлайн-платформу.
            </p>
            <p className="text-muted-foreground mb-4">
              Наша миссия — сделать процесс заказа профессиональных стоматологических материалов
              максимально простым и прозрачным.
            </p>
          </div>

          <div className="bg-white border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Почему выбирают нас</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <strong>Официальный поставщик</strong> — работаем напрямую с Tokuyama Dental
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <strong>Быстрая доставка</strong> — ориентировочный срок 1 сутки после создания
                  заказа
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <strong>Прозрачные условия</strong> — все детали согласовываются с поставщиком
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <strong>Удобный формат</strong> — заказывайте онлайн в любое время
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Контакты</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:info@profisfera.ru" className="text-[#0066FF] hover:underline">
                  info@profisfera.ru
                </a>
              </p>
              <p>
                <strong>Телефон:</strong>{' '}
                <a href="tel:+79313181319" className="text-[#0066FF] hover:underline">
                  +7 (931) 318-13-19
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
