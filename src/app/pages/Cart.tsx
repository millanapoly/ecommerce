import { Link } from 'react-router';
import { useCart } from '../contexts/CartContext';
import { Trash2, ShoppingBag, Gift } from 'lucide-react';

export function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-2">Корзина</h1>
        <p className="text-muted-foreground mb-8">
          В корзине: {totalItems} {totalItems === 1 ? 'товар' : 'товаров'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const { product, quantity, isGift, relatedPromoId } = item;

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
                      <p className="text-sm text-green-700 mt-2">
                        Подарок добавлен автоматически по акции
                      </p>
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
                      {product.price.toLocaleString('ru-RU')} ₽
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
                      <div className="text-sm text-muted-foreground">
                        Количество: {quantity}
                      </div>
                    )}

                    <div className="text-lg font-medium">
                      {(product.price * quantity).toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Итоговый блок */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Итого</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Товары ({totalItems})</span>
                  <span className="font-medium">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <div className="text-2xl font-semibold mb-6">
                {totalPrice.toLocaleString('ru-RU')} ₽
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center px-6 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors mb-6"
              >
                Оформить заказ
              </Link>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Доставка:</strong> от 1 дня после оформления заказа.
                </p>
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
