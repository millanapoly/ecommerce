import { useParams, Link } from 'react-router';
import { CheckCircle, Mail, Phone } from 'lucide-react';

export function OrderSuccess() {
  const { orderNumber } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-semibold mb-4">Заказ создан</h1>
        </div>

        <div className="bg-white border border-border rounded-lg p-8 mb-6">
          <p className="text-lg mb-6">
            Ваш заказ №<strong>{orderNumber}</strong> передан официальному поставщику Tokuyama Dental.
          </p>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Поставщик примет заказ в обработку и свяжется с вами в ближайшее рабочее время, чтобы подтвердить детали заказа, оплату и доставку.
            </p>

            <p>
              Ориентировочный срок доставки — от 1 дня.
            </p>

            <p>
              Статус заказа можно отслеживать в личном кабинете.
            </p>
          </div>
        </div>

        {/* Контакты поддержки */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-sm text-muted-foreground mb-4">
            Если поставщик не связался с вами в течение рабочего дня, напишите или позвоните нам:
          </p>
          <div className="space-y-3">
            <a
              href="mailto:info@profisfera.ru"
              className="flex items-center gap-3 text-[#0066FF] hover:underline"
            >
              <Mail className="w-5 h-5" />
              <span>info@profisfera.ru</span>
            </a>
            <a
              href="tel:+79313181319"
              className="flex items-center gap-3 text-[#0066FF] hover:underline"
            >
              <Phone className="w-5 h-5" />
              <span>+7 (931) 318-13-19</span>
            </a>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/account"
            className="px-8 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors text-center font-medium"
          >
            Перейти к заказу
          </Link>
          <Link
            to="/catalog"
            className="px-8 py-3 border-2 border-border rounded-lg hover:bg-accent transition-colors text-center font-medium"
          >
            Вернуться в каталог
          </Link>
        </div>
      </div>
    </div>
  );
}
