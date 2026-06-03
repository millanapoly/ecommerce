import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Package, MapPin, Plus, Trash2, X, CheckCircle, Clock } from 'lucide-react';
import { mockOrders, Order } from '../data/orders';

type OrderStatus = 'all' | 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export function Account() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');
  const [orderFilter, setOrderFilter] = useState<OrderStatus>('all');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    city: '',
    street: '',
    building: '',
    office: ''
  });
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const statusLabels: Record<string, string> = {
    all: 'Все заказы',
    processing: 'В обработке',
    confirmed: 'Подтверждённые',
    shipped: 'Переданные в доставку',
    delivered: 'Доставленные',
    cancelled: 'Отменённые'
  };

  const statusColors: Record<string, string> = {
    processing: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800'
  };

  const filteredOrders = orderFilter === 'all'
    ? mockOrders
    : mockOrders.filter(order => order.status === orderFilter);

  const toggleOrderExpand = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const canCancelOrder = (status: string) => {
    return status === 'processing' || status === 'confirmed';
  };

  const handleCancelOrder = (orderId: string) => {
    if (!cancellationReason.trim()) {
      alert('Пожалуйста, укажите причину отмены');
      return;
    }

    // В реальном приложении здесь был бы API запрос
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      order.status = 'cancelled';
      order.cancellationReason = cancellationReason;
      order.history.push({
        status: 'cancelled',
        date: new Date().toISOString(),
        comment: cancellationReason
      });
    }

    setCancellingOrderId(null);
    setCancellationReason('');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      ...newAddress,
      isDefault: user.savedAddresses.length === 0
    });
    setNewAddress({ city: '', street: '', building: '', office: '' });
    setShowAddAddressForm(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-[#0066FF] text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Личный кабинет</h1>
              <p className="text-blue-100">{user.clinicName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">ИНН</div>
                  <div className="font-medium">{user.inn}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Email</div>
                  <div className="text-sm">{user.email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Телефон</div>
                  <div className="text-sm">{user.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Контактное лицо</div>
                  <div className="text-sm font-medium">{user.fullName}</div>
                  <div className="text-xs text-muted-foreground">{user.position}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-6 py-4 transition-colors ${
                  activeTab === 'orders' ? 'bg-blue-50 text-[#0066FF] border-l-4 border-[#0066FF]' : 'hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                Мои заказы
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-6 py-4 transition-colors ${
                  activeTab === 'addresses' ? 'bg-blue-50 text-[#0066FF] border-l-4 border-[#0066FF]' : 'hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-5 h-5" />
                Адреса доставки
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div>
                {/* Order Filters */}
                <div className="bg-white rounded-lg p-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled'] as OrderStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => setOrderFilter(status)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          orderFilter === status
                            ? 'bg-[#0066FF] text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {statusLabels[status]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-lg p-12 text-center">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-6">Нет заказов с выбранным статусом</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div key={order.id} className="bg-white rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">Заказ №{order.number}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                                {statusLabels[order.status]}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-semibold mb-1">
                              {order.total.toLocaleString('ru-RU')} ₽
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.items.reduce((sum, item) => sum + item.quantity, 0)} товаров
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-border pt-4">
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                  <span>{item.productName} × {item.quantity}</span>
                                  {item.isGift && (
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                                      Подарок
                                    </span>
                                  )}
                                </span>
                                <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                              </div>
                            ))}
                          </div>

                          {/* Delivery Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4 pb-4 border-b border-border">
                            <div>
                              <div className="text-muted-foreground mb-1">Адрес доставки</div>
                              <div>
                                {order.deliveryAddress.city}, {order.deliveryAddress.street}, д. {order.deliveryAddress.building}
                                {order.deliveryAddress.office && `, ${order.deliveryAddress.office}`}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground mb-1">Способ оплаты</div>
                              <div>
                                {order.paymentMethod === 'prepayment' && 'Предоплата'}
                                {order.paymentMethod === 'deferred' && 'С отсрочкой'}
                                {order.paymentMethod === 'cash' && 'При получении'}
                              </div>
                            </div>

                            {/* Estimated or Exact Delivery Date */}
                            {order.status === 'processing' && order.estimatedDeliveryDate && (
                              <div>
                                <div className="text-muted-foreground mb-1">Ориентировочная дата доставки</div>
                                <div>
                                  {new Date(order.estimatedDeliveryDate).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </div>
                              </div>
                            )}

                            {(order.status === 'confirmed' || order.status === 'shipped' || order.status === 'delivered') && order.exactDeliveryDate && (
                              <div>
                                <div className="text-muted-foreground mb-1">Точная дата доставки</div>
                                <div>
                                  {new Date(order.exactDeliveryDate).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                  {order.exactDeliveryTimeRange && `, ${order.exactDeliveryTimeRange}`}
                                </div>
                              </div>
                            )}

                            {order.status === 'shipped' && order.deliveryDetails && (
                              <div className="md:col-span-2">
                                <div className="text-muted-foreground mb-1">Подробности доставки</div>
                                <div>{order.deliveryDetails}</div>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => toggleOrderExpand(order.id)}
                              className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              {expandedOrders.has(order.id) ? 'Скрыть детали' : 'Подробнее'}
                            </button>
                            {canCancelOrder(order.status) && (
                              <button
                                onClick={() => setCancellingOrderId(order.id)}
                                className="px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-red-50 transition-colors"
                              >
                                Отменить заказ
                              </button>
                            )}
                          </div>

                          {/* Expanded Details */}
                          {expandedOrders.has(order.id) && (
                            <div className="mt-4 pt-4 border-t border-border space-y-6">
                              {/* Order History */}
                              <div>
                                <h4 className="font-semibold mb-4">История заказа</h4>
                                <div className="space-y-3">
                                  {order.history.map((historyItem, index) => {
                                    const isCompleted = order.history.findIndex(h => h.status === order.status) >= index;
                                    return (
                                      <div key={index} className="flex items-start gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                                          isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                                        }`}>
                                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-medium">
                                            {historyItem.status === 'new' && 'Заказ создан'}
                                            {historyItem.status === 'processing' && 'Принят в обработку'}
                                            {historyItem.status === 'confirmed' && 'Подтверждён'}
                                            {historyItem.status === 'shipped' && 'Передан в доставку'}
                                            {historyItem.status === 'delivered' && 'Доставлен'}
                                            {historyItem.status === 'cancelled' && 'Отменён'}
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            {new Date(historyItem.date).toLocaleDateString('ru-RU', {
                                              day: 'numeric',
                                              month: 'long',
                                              year: 'numeric',
                                              hour: '2-digit',
                                              minute: '2-digit'
                                            })}
                                          </div>
                                          {historyItem.comment && (
                                            <div className="text-sm mt-1 text-muted-foreground">
                                              Причина: {historyItem.comment}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Distributor Contacts for Delivered Orders */}
                              {order.status === 'delivered' && order.distributor && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <h4 className="font-semibold mb-3">Контакты дистрибьютора</h4>
                                  <div className="space-y-2 text-sm mb-4">
                                    <div>
                                      <span className="text-muted-foreground">Название: </span>
                                      <span className="font-medium">{order.distributor.name}</span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Телефон: </span>
                                      <a href={`tel:${order.distributor.phone}`} className="text-[#0066FF] hover:underline">
                                        {order.distributor.phone}
                                      </a>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Email: </span>
                                      <a href={`mailto:${order.distributor.email}`} className="text-[#0066FF] hover:underline">
                                        {order.distributor.email}
                                      </a>
                                    </div>
                                  </div>
                                  <div className="text-sm text-muted-foreground border-t border-border pt-3">
                                    <strong>Контакты по возврату и замене товаров</strong>
                                    <p className="mt-2">
                                      Если вы обнаружили брак или вам не подошел приобретенный товар,
                                      для возврата или замены вы можете связаться с магазином по номерам выше
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Адреса доставки</h2>
                  <button
                    onClick={() => setShowAddAddressForm(!showAddAddressForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Добавить адрес
                  </button>
                </div>

                {showAddAddressForm && (
                  <form onSubmit={handleAddAddress} className="bg-white rounded-lg p-6 mb-6">
                    <h3 className="font-semibold mb-4">Новый адрес</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm mb-2">Город *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Улица *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Дом *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.building}
                          onChange={(e) => setNewAddress({ ...newAddress, building: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Офис / кабинет</label>
                        <input
                          type="text"
                          value={newAddress.office}
                          onChange={(e) => setNewAddress({ ...newAddress, office: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
                      >
                        Сохранить
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddAddressForm(false)}
                        className="px-6 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                )}

                {user.savedAddresses.length === 0 ? (
                  <div className="bg-white rounded-lg p-12 text-center">
                    <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-6">У вас пока нет сохранённых адресов</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.savedAddresses.map((address) => (
                      <div key={address.id} className="bg-white rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-5 h-5 text-muted-foreground" />
                              {address.isDefault && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                  По умолчанию
                                </span>
                              )}
                            </div>
                            <div className="mb-2">
                              {address.city}, {address.street}, д. {address.building}
                              {address.office && `, ${address.office}`}
                            </div>
                            {!address.isDefault && (
                              <button
                                onClick={() => setDefaultAddress(address.id)}
                                className="text-sm text-[#0066FF] hover:underline"
                              >
                                Сделать основным
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => removeAddress(address.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            title="Удалить"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      {cancellingOrderId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Отмена заказа</h3>
              <button
                onClick={() => {
                  setCancellingOrderId(null);
                  setCancellationReason('');
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Пожалуйста, укажите причину отмены заказа
            </p>
            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="Например: передумал, нашёл дешевле, долгая доставка..."
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:border-primary outline-none resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => handleCancelOrder(cancellingOrderId)}
                className="flex-1 px-6 py-2 bg-destructive text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Отменить заказ
              </button>
              <button
                onClick={() => {
                  setCancellingOrderId(null);
                  setCancellationReason('');
                }}
                className="flex-1 px-6 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Назад
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
