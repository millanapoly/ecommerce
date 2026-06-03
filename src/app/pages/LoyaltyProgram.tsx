import { Link } from 'react-router';
import { Gift, ShoppingBag, Award } from 'lucide-react';

export function LoyaltyProgram() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold mb-6">Программа лояльности</h1>
          <p className="text-xl text-muted-foreground mb-4">
            Покупайте Tokuyama Dental и получайте бонусы за каждый заказ.
          </p>
          <p className="text-lg text-muted-foreground">
            Программа лояльности Tokuyama Dental помогает клиникам экономить на расходных материалах: за покупки у официальных дистрибьюторов начисляются бонусы, которые можно обменивать на призы в личном кабинете.
          </p>
        </div>

        {/* Как это работает */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h3 className="font-semibold mb-2">Покупайте продукцию</h3>
              <p className="text-sm text-muted-foreground">
                заказывайте материалы Tokuyama Dental у официальных дистрибьюторов.
              </p>
            </div>

            <div className="bg-white border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Копите бонусы</h3>
              <p className="text-sm text-muted-foreground">
                все покупки автоматически учитываются, бонусы начисляются за каждый заказ.
              </p>
            </div>

            <div className="bg-white border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Получайте призы</h3>
              <p className="text-sm text-muted-foreground">
                обменивайте бонусы на материалы для клиники.
              </p>
            </div>
          </div>
        </div>

        {/* Условия программы */}
        <div className="bg-white border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Условия программы</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-[#0066FF] mt-1">•</span>
              <span>
                Участвуют клиники, закупающие продукцию у официальных дистрибьюторов Tokuyama Dental.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0066FF] mt-1">•</span>
              <span>
                Размер начисления — от 2% до 7% в зависимости от среднемесячного объёма закупок.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0066FF] mt-1">•</span>
              <span>
                В качестве призов доступны композитные материалы, адгезивные системы и материалы для ортопедии.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0066FF] mt-1">•</span>
              <span>Бонусы и призы не заменяются деньгами.</span>
            </li>
          </ul>
        </div>

        {/* Призыв к действию */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-8">
            Все действия доступны в личном кабинете: там можно следить за прогрессом, зачислять бонусы и выбирать призы.
          </p>
          <Link
            to="/register"
            className="inline-flex px-8 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors text-lg font-medium"
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}
