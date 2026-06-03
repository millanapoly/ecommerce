export interface OrderHistoryItem {
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  comment?: string;
}

export interface Distributor {
  name: string;
  phone: string;
  email: string;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    isGift?: boolean;
    relatedPromoId?: string;
  }[];
  total: number;
  contactPerson: {
    fullName: string;
    phone: string;
    email: string;
    position: string;
  };
  deliveryAddress: {
    city: string;
    street: string;
    building: string;
    office?: string;
  };
  deliveryMethod: 'delivery' | 'pickup';
  paymentMethod: 'prepayment' | 'deferred' | 'cash';
  comment?: string;
  estimatedDeliveryDate?: string;
  exactDeliveryDate?: string;
  exactDeliveryTimeRange?: string;
  deliveryDetails?: string;
  history: OrderHistoryItem[];
  distributor?: Distributor;
  cancellationReason?: string;
}

let orderCounter = 1005;

export function createOrder(orderData: Omit<Order, 'id' | 'number' | 'date' | 'status' | 'history' | 'estimatedDeliveryDate'>): Order {
  orderCounter++;
  const now = new Date().toISOString();
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 1);

  const newOrder: Order = {
    ...orderData,
    id: `order-${orderCounter}`,
    number: orderCounter.toString(),
    date: now,
    status: 'processing',
    estimatedDeliveryDate: estimatedDate.toISOString(),
    history: [
      {
        status: 'processing',
        date: now
      }
    ]
  };
  mockOrders.unshift(newOrder);
  return newOrder;
}

export const mockOrders: Order[] = [
  {
    id: 'order-1001',
    number: '1001',
    date: new Date(2026, 4, 28, 11, 34).toISOString(),
    status: 'delivered',
    items: [
      {
        productId: '15313',
        productName: 'Набор Tokuyama Universal Bond II Kit',
        quantity: 2,
        price: 10225
      },
      {
        productId: '14906',
        productName: 'Набор Tokuyama Bond Force II Kit',
        quantity: 1,
        price: 6091
      }
    ],
    total: 26541,
    contactPerson: {
      fullName: 'Иванова Анна Сергеевна',
      phone: '+7 (999) 123-45-67',
      email: 'clinic@example.com',
      position: 'Главный врач'
    },
    deliveryAddress: {
      city: 'Москва',
      street: 'ул. Ленина',
      building: '10',
      office: 'офис 5'
    },
    deliveryMethod: 'delivery',
    paymentMethod: 'prepayment',
    exactDeliveryDate: new Date(2026, 5, 4).toISOString(),
    exactDeliveryTimeRange: '10:00 - 12:00',
    deliveryDetails: 'Курьер: Иван Петров, тел: +7 (999) 888-77-66',
    history: [
      { status: 'new', date: new Date(2026, 4, 28, 11, 34).toISOString() },
      { status: 'processing', date: new Date(2026, 4, 28, 14, 20).toISOString() },
      { status: 'confirmed', date: new Date(2026, 4, 29, 9, 15).toISOString() },
      { status: 'shipped', date: new Date(2026, 5, 3, 20, 25).toISOString() },
      { status: 'delivered', date: new Date(2026, 5, 4, 10, 5).toISOString() }
    ],
    distributor: {
      name: 'ООО "Дента Трейд"',
      phone: '+7 (495) 600-01-50',
      email: 'shop1@denta.ru'
    }
  },
  {
    id: 'order-1002',
    number: '1002',
    date: new Date(2026, 5, 1, 10, 15).toISOString(),
    status: 'shipped',
    items: [
      {
        productId: '10933',
        productName: 'Набор Tokuyama Estelite Asteria Syringe Essential Kit',
        quantity: 1,
        price: 31815
      }
    ],
    total: 31815,
    contactPerson: {
      fullName: 'Иванова Анна Сергеевна',
      phone: '+7 (999) 123-45-67',
      email: 'clinic@example.com',
      position: 'Главный врач'
    },
    deliveryAddress: {
      city: 'Москва',
      street: 'ул. Ленина',
      building: '10',
      office: 'офис 5'
    },
    deliveryMethod: 'delivery',
    paymentMethod: 'deferred',
    exactDeliveryDate: new Date(2026, 5, 2).toISOString(),
    exactDeliveryTimeRange: '14:00 - 16:00',
    deliveryDetails: 'Курьер: Сергей Иванов, тел: +7 (999) 777-88-99',
    history: [
      { status: 'new', date: new Date(2026, 5, 1, 10, 15).toISOString() },
      { status: 'processing', date: new Date(2026, 5, 1, 11, 30).toISOString() },
      { status: 'confirmed', date: new Date(2026, 5, 1, 15, 45).toISOString() },
      { status: 'shipped', date: new Date(2026, 5, 2, 9, 10).toISOString() }
    ],
    distributor: {
      name: 'ООО "МедСнаб"',
      phone: '+7 (495) 555-22-33',
      email: 'info@medsnab.ru'
    }
  },
  {
    id: 'order-1003',
    number: '1003',
    date: new Date(2026, 5, 2, 9, 20).toISOString(),
    status: 'confirmed',
    items: [
      {
        productId: '14971',
        productName: 'Набор Tokuyama Bond Force II Pen Kit',
        quantity: 3,
        price: 7369
      }
    ],
    total: 22107,
    contactPerson: {
      fullName: 'Иванова Анна Сергеевна',
      phone: '+7 (999) 123-45-67',
      email: 'clinic@example.com',
      position: 'Главный врач'
    },
    deliveryAddress: {
      city: 'Москва',
      street: 'ул. Ленина',
      building: '10'
    },
    deliveryMethod: 'pickup',
    paymentMethod: 'prepayment',
    exactDeliveryDate: new Date(2026, 5, 3).toISOString(),
    exactDeliveryTimeRange: '09:00 - 18:00',
    history: [
      { status: 'new', date: new Date(2026, 5, 2, 9, 20).toISOString() },
      { status: 'processing', date: new Date(2026, 5, 2, 10, 5).toISOString() },
      { status: 'confirmed', date: new Date(2026, 5, 2, 14, 30).toISOString() }
    ],
    distributor: {
      name: 'ООО "Дента Трейд"',
      phone: '+7 (495) 600-01-50',
      email: 'shop1@denta.ru'
    }
  },
  {
    id: 'order-1004',
    number: '1004',
    date: new Date(2026, 5, 2, 13, 45).toISOString(),
    status: 'processing',
    items: [
      {
        productId: '14926',
        productName: 'Адгезив Tokuyama Bond Force II Refill',
        quantity: 2,
        price: 6091
      }
    ],
    total: 12182,
    contactPerson: {
      fullName: 'Иванова Анна Сергеевна',
      phone: '+7 (999) 123-45-67',
      email: 'clinic@example.com',
      position: 'Главный врач'
    },
    deliveryAddress: {
      city: 'Москва',
      street: 'ул. Ленина',
      building: '10',
      office: 'офис 5'
    },
    deliveryMethod: 'delivery',
    paymentMethod: 'cash',
    estimatedDeliveryDate: new Date(2026, 5, 3).toISOString(),
    history: [
      { status: 'new', date: new Date(2026, 5, 2, 13, 45).toISOString() },
      { status: 'processing', date: new Date(2026, 5, 2, 15, 10).toISOString() }
    ],
    distributor: {
      name: 'ООО "МедСнаб"',
      phone: '+7 (495) 555-22-33',
      email: 'info@medsnab.ru'
    }
  },
  {
    id: 'order-1005',
    number: '1005',
    date: new Date(2026, 5, 2, 16, 20).toISOString(),
    status: 'new',
    items: [
      {
        productId: '14114',
        productName: 'Набор Tokuyama EE-Bond Intro Kit',
        quantity: 1,
        price: 5397
      }
    ],
    total: 5397,
    contactPerson: {
      fullName: 'Иванова Анна Сергеевна',
      phone: '+7 (999) 123-45-67',
      email: 'clinic@example.com',
      position: 'Главный врач'
    },
    deliveryAddress: {
      city: 'Москва',
      street: 'ул. Ленина',
      building: '10'
    },
    deliveryMethod: 'delivery',
    paymentMethod: 'prepayment',
    estimatedDeliveryDate: new Date(2026, 5, 3).toISOString(),
    history: [
      { status: 'new', date: new Date(2026, 5, 2, 16, 20).toISOString() }
    ],
    distributor: {
      name: 'ООО "Дента Трейд"',
      phone: '+7 (495) 600-01-50',
      email: 'shop1@denta.ru'
    }
  }
];
