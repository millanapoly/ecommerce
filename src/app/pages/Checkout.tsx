import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useCart } from '../contexts/CartContext';
import { useAuth, DeliveryAddress } from '../contexts/AuthContext';
import { createOrder } from '../data/orders';
import { ShoppingBag, Plus, Gift, LogIn, UserPlus } from 'lucide-react';

export function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart, appliedPromo, getPromoDiscount } = useCart();
  const { user, isAuthenticated, addAddress } = useAuth();

  const defaultAddress = user?.savedAddresses.find(a => a.isDefault);

  const [selectedAddressId, setSelectedAddressId] = useState<string>(defaultAddress?.id || 'new');
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    position: user?.position || '',
    inn: user?.inn || '',
    clinicName: user?.clinicName || '',
    clinicAddress: user?.clinicAddress || '',
    city: user?.city || 'Москва',
    deliveryCity: defaultAddress?.city || user?.city || 'Москва',
    deliveryStreet: defaultAddress?.street || '',
    deliveryBuilding: defaultAddress?.building || '',
    deliveryOffice: defaultAddress?.office || '',
    deliveryComment: '',
    deliveryMethod: 'delivery',
    paymentMethod: 'prepayment',
    orderComment: '',
    saveNewAddress: false
  });

  useEffect(() => {
    if (selectedAddressId !== 'new') {
      const address = user?.savedAddresses.find(a => a.id === selectedAddressId);
      if (address) {
        setFormData(prev => ({
          ...prev,
          deliveryCity: address.city,
          deliveryStreet: address.street,
          deliveryBuilding: address.building,
          deliveryOffice: address.office || ''
        }));
      }
    }
  }, [selectedAddressId, user]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-semibold mb-4">Корзина пуста</h1>
            <p className="text-muted-foreground mb-8">
              Добавьте товары для оформления заказа.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Если пользователь не авторизован, показать выбор авторизации/регистрации
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-semibold mb-8 text-center">Оформление заказа</h1>

          <div className="bg-white border border-border rounded-lg p-8 mb-6">
            <p className="text-lg text-center mb-8">
              Для оформления заказа необходимо войти в личный кабинет или зарегистрироваться
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Вход */}
              <Link
                to="/login?redirect=/checkout"
                className="flex flex-col items-center gap-4 p-6 border-2 border-border rounded-lg hover:border-[#0066FF] hover:bg-blue-50 transition-colors"
              >
                <LogIn className="w-12 h-12 text-[#0066FF]" />
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">Войти</h3>
                  <p className="text-sm text-muted-foreground">
                    У меня уже есть аккаунт
                  </p>
                </div>
              </Link>

              {/* Регистрация */}
              <Link
                to="/register?redirect=/checkout"
                className="flex flex-col items-center gap-4 p-6 border-2 border-[#0066FF] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <UserPlus className="w-12 h-12 text-[#0066FF]" />
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">Зарегистрироваться</h3>
                  <p className="text-sm text-muted-foreground">
                    Создать новый аккаунт
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Ваша корзина сохранена. После входа или регистрации вы сможете продолжить оформление заказа.
            </p>
            <Link
              to="/cart"
              className="text-[#0066FF] hover:underline"
            >
              ← Вернуться в корзину
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Сохранить новый адрес если выбрана опция
    if (selectedAddressId === 'new' && formData.saveNewAddress) {
      addAddress({
        city: formData.deliveryCity,
        street: formData.deliveryStreet,
        building: formData.deliveryBuilding,
        office: formData.deliveryOffice,
        isDefault: user?.savedAddresses.length === 0
      });
    }

    const order = createOrder({
      items: items.map(({ product, quantity, isGift, relatedPromoId }) => ({
        productId: product.id,
        productName: product.name,
        quantity,
        price: product.price,
        isGift,
        relatedPromoId
      })),
      total: getTotalPrice() - getPromoDiscount(),
      contactPerson: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        position: formData.position
      },
      deliveryAddress: {
        city: formData.deliveryCity,
        street: formData.deliveryStreet,
        building: formData.deliveryBuilding,
        office: formData.deliveryOffice
      },
      deliveryMethod: formData.deliveryMethod as 'delivery' | 'pickup',
      paymentMethod: formData.paymentMethod as 'prepayment' | 'deferred' | 'cash',
      comment: formData.orderComment
    });

    clearCart();
    navigate(`/order-success/${order.number}`);
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8">Оформление заказа</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Ваш заказ */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Ваш заказ</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              {items.map((item) => {
                const { product, quantity, isGift } = item;

                return (
                  <div key={product.id} className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.name}</span>
                        {isGift && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                            <Gift className="w-3 h-3" />
                            Подарок
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">Количество: {quantity}</div>
                    </div>
                    <div className="font-medium">
                      {(product.price * quantity).toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span>Скидка по промокоду ({appliedPromo.code} −{appliedPromo.label})</span>
                  <span className="font-medium">−{getPromoDiscount().toLocaleString('ru-RU')} ₽</span>
                </div>
              )}
              <div className="text-2xl font-semibold">
                Итого: {(getTotalPrice() - getPromoDiscount()).toLocaleString('ru-RU')} ₽
              </div>
            </div>
          </div>

          {/* Контактное лицо */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Контактное лицо</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-2">ФИО *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block mb-2">Телефон *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Должность *</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => updateField('position', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Данные клиники */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Данные клиники</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">ИНН клиники *</label>
                <input
                  type="text"
                  required
                  value={formData.inn}
                  onChange={(e) => updateField('inn', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block mb-2">Название клиники *</label>
                <input
                  type="text"
                  required
                  value={formData.clinicName}
                  onChange={(e) => updateField('clinicName', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Адрес клиники *</label>
                <input
                  type="text"
                  required
                  value={formData.clinicAddress}
                  onChange={(e) => updateField('clinicAddress', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block mb-2">Город *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Адрес доставки */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Адрес доставки</h2>

            {/* Выбор из сохраненных адресов */}
            {user && user.savedAddresses.length > 0 && (
              <div className="mb-6">
                <label className="block mb-3 font-medium">Выберите адрес</label>
                <div className="space-y-3">
                  {user.savedAddresses.map((address) => (
                    <label
                      key={address.id}
                      className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium mb-1">
                          {address.city}, {address.street}, д. {address.building}
                          {address.office && `, ${address.office}`}
                        </div>
                        {address.isDefault && (
                          <span className="text-xs text-green-600">По умолчанию</span>
                        )}
                      </div>
                    </label>
                  ))}
                  <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="address"
                      value="new"
                      checked={selectedAddressId === 'new'}
                      onChange={() => setSelectedAddressId('new')}
                      className="mt-1"
                    />
                    <div className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">Новый адрес</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Форма для нового адреса */}
            {selectedAddressId === 'new' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">Город</label>
                    <input
                      type="text"
                      value={formData.deliveryCity}
                      onChange={(e) => updateField('deliveryCity', e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Улица</label>
                    <input
                      type="text"
                      value={formData.deliveryStreet}
                      onChange={(e) => updateField('deliveryStreet', e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Дом</label>
                    <input
                      type="text"
                      value={formData.deliveryBuilding}
                      onChange={(e) => updateField('deliveryBuilding', e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Офис / кабинет</label>
                    <input
                      type="text"
                      value={formData.deliveryOffice}
                      onChange={(e) => updateField('deliveryOffice', e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                    />
                  </div>
                </div>
                {isAuthenticated && (
                  <label className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      checked={formData.saveNewAddress}
                      onChange={(e) => updateField('saveNewAddress', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Сохранить этот адрес для будущих заказов</span>
                  </label>
                )}
              </>
            )}

            <div>
              <label className="block mb-2">Комментарий к доставке</label>
              <textarea
                value={formData.deliveryComment}
                onChange={(e) => updateField('deliveryComment', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none resize-none"
              />
            </div>
          </div>

          {/* Способ получения */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Способ получения</h2>
            <div className="space-y-3 mb-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="delivery"
                  checked={formData.deliveryMethod === 'delivery'}
                  onChange={(e) => updateField('deliveryMethod', e.target.value)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Доставка</div>
                  <div className="text-sm text-muted-foreground">
                    от 1 дня после оформления заказа
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={formData.deliveryMethod === 'pickup'}
                  onChange={(e) => updateField('deliveryMethod', e.target.value)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Самовывоз</div>
                </div>
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              Финальные условия подтвердит поставщик.
            </p>
          </div>

          {/* Способ оплаты */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Способ оплаты</h2>
            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="prepayment"
                  checked={formData.paymentMethod === 'prepayment'}
                  onChange={(e) => updateField('paymentMethod', e.target.value)}
                />
                <span>Безналичный расчёт с предоплатой</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="deferred"
                  checked={formData.paymentMethod === 'deferred'}
                  onChange={(e) => updateField('paymentMethod', e.target.value)}
                />
                <span>Безналичный расчёт с отсрочкой</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={(e) => updateField('paymentMethod', e.target.value)}
                />
                <span>Наличные / оплата при получении</span>
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              Выбранный способ оплаты будет передан поставщику. Финальные условия оплаты
              поставщик подтвердит при обработке заказа.
            </p>
          </div>

          {/* Комментарий к заказу */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Комментарий к заказу</h2>
            <textarea
              value={formData.orderComment}
              onChange={(e) => updateField('orderComment', e.target.value)}
              placeholder="Например: нужна доставка до 15:00, нужен счёт перед отгрузкой, связаться с администратором."
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none resize-none"
            />
          </div>

          {/* Кнопка подтверждения */}
          <button
            type="submit"
            className="w-full px-8 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
          >
            Подтвердить заказ
          </button>
          <p className="text-sm text-muted-foreground text-center">
            Заказ будет передан официальному дистрибьютору. Финальные условия доставки и оплаты подтвердятся после связи с ним.
          </p>
        </form>
      </div>
    </div>
  );
}
