import { Link } from 'react-router';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, ShoppingBag, Gift, Tag, X } from 'lucide-react';

export function Cart() {
  const { items, removeFromCart, updateQuantity, appliedPromo, applyPromo, removePromo, getPromoDiscount } = useCart();
  const { isAuthenticated } = useAuth();

  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const nonGiftItems = items.filter(item => !item.isGift);
  const giftItems = items.filter(item => item.isGift);

  const totalItems = isAuthenticated
    ? items.reduce((s, i) => s + i.quantity, 0)
    : nonGiftItems.reduce((s, i) => s + i.quantity, 0);

  const basePrice = nonGiftItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const giftSavings = isAuthenticated
    ? giftItems.reduce((s, i) => s + i.product.price * i.quantity, 0)
    : 0;

  const promoDiscount = getPromoDiscount();
  const totalSavings = giftSavings + promoDiscount;
  const finalPrice = basePrice - promoDiscount;

  const handleApplyPromo = () => {
    const ok = applyPromo(promoInput);
    setPromoStatus(ok ? 'success' : 'error');
  };

  const handleRemovePromo = () => {
    removePromo();
    setPromoInput('');
    setPromoStatus('idle');
  };

  const handlePromoInputChange = (value: string) => {
    setPromoInput(value);
    if (promoStatus !== 'idle') setPromoStatus('idle');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-semibold mb-4">Корзина пуста</h1>
            <p className="text-muted-foreground mb-8">
              Добавьте товары Tokuyama Dental из каталога, чтобы оформить заказ.
            </p>
            <Link
              to="/catalog"
              className="inline-flex px-8 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayItems = isAuthenticated ? items : nonGiftItems;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-2">Корзина</h1>
        <p className="text-muted-foreground mb-8">
          В корзине: {totalItems} {totalItems === 1 ? 'товар' : 'товаров'}
        </p>

        {!isAuthenticated && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <span className="text-blue-600 text-lg">🔒</span>
            <p className="text-blue-700">
              <Link to="/login" className="font-medium underline hover:no-underline">Войдите</Link>
              , чтобы увидеть персональные условия
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2 space-y-4">
            {displayItems.map((item) => {
              const { product, quantity, isGift } = item;
              return (
                <div
                  key={product.id}
                  className={`flex gap-4 p-4 bg-white border rounded-lg ${
                    isGift ? 'border-green-200 bg-green-50' : 'border-border'
                  }`}
                >
                  <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center shrink-0 relative">
                    <div className="text-xs text-muted-foreground">Фото</div>
                    {isGift && (
                      <div className="absolute -top-2 -right-2">
                        <Gift className="w-6 h-6 text-green-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-1">
                      <h3 className="font-medium">{product.name}</h3>
                      {isGift && (
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded shrink-0">
                          Подарок
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
                    {!isGift && <div className="text-sm text-muted-foreground">Арт. {product.article}</div>}
                    {isGift && (
                      <p className="text-sm text-green-700 mt-2">Подарок добавлен автоматически по акции</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    {!isGift && (
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}

                    <div className="text-xl font-semibold">
                      {isGift ? 'Бесплатно' : `${product.price.toLocaleString('ru-RU')} ₽`}
                    </div>

                    {!isGift ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-accent"
                        >
                          −
                        </button>
                        <span className="w-12 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-accent"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Количество: {quantity}</div>
                    )}

                    {!isGift && (
                      <div className="text-lg font-medium">
                        {(product.price * quantity).toLocaleString('ru-RU')} ₽
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Итоговый блок */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-lg p-6 sticky top-24 space-y-6">
              <h2 className="text-xl font-semibold">Итого</h2>

              {/* Промокод */}
              {isAuthenticated && (
                <div>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">{appliedPromo.code}</span>
                        <span className="text-sm text-green-600">−{appliedPromo.label}</span>
                      </div>
                      <button onClick={handleRemovePromo} className="text-green-600 hover:text-green-800">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => handlePromoInputChange(e.target.value)}
                          placeholder="Промокод"
                          className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:border-primary outline-none"
                          onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                        />
                        <button
                          onClick={handleApplyPromo}
                          disabled={!promoInput.trim()}
                          className="px-4 py-2 bg-[#0066FF] text-white rounded-lg text-sm hover:bg-[#0052CC] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                          Применить
                        </button>
                      </div>
                      {promoStatus === 'success' && (
                        <p className="text-sm text-green-600 mt-2">Промокод применён</p>
                      )}
                      {promoStatus === 'error' && (
                        <p className="text-sm text-red-600 mt-2">Промокод недействителен или не применим к этому заказу</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Расчёт */}
              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Товары ({nonGiftItems.reduce((s, i) => s + i.quantity, 0)})
                  </span>
                  <span className="font-medium">{basePrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                {isAuthenticated && giftSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Подарки по акции</span>
                    <span className="font-medium">−{giftSavings.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Скидка по промокоду</span>
                    <span className="font-medium">−{promoDiscount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
              </div>

              {/* Ваша выгода */}
              {isAuthenticated && totalSavings > 0 && (
                <div className="flex justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="font-medium text-green-700">Ваша выгода</span>
                  <span className="font-semibold text-green-700">−{totalSavings.toLocaleString('ru-RU')} ₽</span>
                </div>
              )}

              <div className="text-2xl font-semibold">
                {finalPrice.toLocaleString('ru-RU')} ₽
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center px-6 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
              >
                Оформить заказ
              </Link>

              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Доставка:</strong> от 1 дня после оформления заказа.</p>
                <p className="text-xs">
                  Заказ будет передан официальному дистрибьютору Tokuyama Dental. Дистрибьютор свяжется
                  с вами для подтверждения деталей заказа, оплаты и доставки.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
