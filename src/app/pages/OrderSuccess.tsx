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
          <p className="text-lg mb-6">Заказ №<strong>{orderNumber}</strong> создан и передан официальным дистрибьюторам по территории доставки. Дистрибьютор свяжется с вами в течение 2 часов в рабочее время для подтверждения деталей, оплаты и доставки.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 text-sm font-semibold">1</div>
              <p className="text-muted-foreground pt-0.5">Заказ создан</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 text-sm font-semibold">2</div>
              <p className="text-muted-foreground pt-0.5">Заказ передан официальному дистрибьютору</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center shrink-0 text-sm font-semibold">3</div>
              <p className="text-muted-foreground pt-0.5">Дистрибьютор свяжется с вами в течение 2 часов в рабочее время</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center shrink-0 text-sm font-semibold">4</div>
              <p className="text-muted-foreground pt-0.5">Вы согласуете оплату и доставку</p>
            </div>
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
