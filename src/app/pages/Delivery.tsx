export function Delivery() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-semibold mb-8">Доставка и оплата</h1>

        <div className="space-y-6">
          <div className="bg-white border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Доставка</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ориентировочный срок доставки составляет <strong>1 сутки</strong> после создания
                заказа.
              </p>
              <p>
                Заказ передаётся официальному поставщику Tokuyama Dental. Поставщик свяжется с вами
                для подтверждения деталей заказа и согласования точного времени доставки.
              </p>
              <p>
                Доступны следующие способы получения:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Доставка курьером по указанному адресу</li>
                <li>Самовывоз со склада поставщика</li>
              </ul>
              <p className="text-sm">
                Финальные условия доставки подтверждаются поставщиком при обработке заказа.
              </p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Оплата</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Доступны следующие способы оплаты:</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong>Безналичный расчёт с предоплатой</strong>
                    <p className="text-sm mt-1">
                      Оплата по счёту до отгрузки товара
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong>Безналичный расчёт с отсрочкой</strong>
                    <p className="text-sm mt-1">
                      Для постоянных клиников с согласованными условиями
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong>Наличные / оплата при получении</strong>
                    <p className="text-sm mt-1">
                      Оплата наличными курьеру при получении заказа
                    </p>
                  </div>
                </li>
              </ul>
              <p className="text-sm pt-4 border-t border-border">
                Выбранный способ оплаты будет передан поставщику. Финальные условия оплаты
                поставщик подтвердит при обработке заказа.
              </p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Документы</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                После оформления заказа поставщик предоставит необходимые документы:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Счёт на оплату</li>
                <li>Товарная накладная</li>
                <li>Счёт-фактура (при необходимости)</li>
                <li>Сертификаты качества на продукцию</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#F5F7FA] border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground">
              Если у вас возникли вопросы по доставке или оплате, свяжитесь с нами:{' '}
              <a href="mailto:info@profisfera.ru" className="text-[#0066FF] hover:underline">
                info@profisfera.ru
              </a>{' '}
              или{' '}
              <a href="tel:+79313181319" className="text-[#0066FF] hover:underline">
                +7 (931) 318-13-19
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
