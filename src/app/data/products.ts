export interface ProductVariant {
  id: string;
  name: string;
  article: string;
  price: number;
  type?: 'kit' | 'syringe';
  shade?: string;
}

export interface Promotion {
  id: string;
  name: string;
  productId: string;
  minQuantity: number;
  giftProductId: string;
  giftProductName: string;
  giftProductPrice: number;
  giftQuantity: number;
  badge: string;
  description: string;
  shortDescription: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  priority: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  article: string;
  price: number;
  category: string;
  direction: string;
  topLevelCategory?: 'Инструменты' | 'Материалы' | 'Оборудование';
  subcategory?: string;
  image?: string;
  description: string;
  shortDescription: string;
  specifications: {
    series?: string;
    purpose?: string;
    color?: string;
    consistency?: string;
    viscosity?: string;
    curing?: string;
    materialType?: string;
    form?: string;
    designation?: string;
    suitableFor?: string;
    selfEtching?: string;
  };
  documents: {
    instruction: boolean;
    certificate: boolean;
    quality?: boolean;
  };
  hasVariants?: boolean;
  variantType?: 'kit-syringe' | 'shades';
  variants?: ProductVariant[];
  isNew?: boolean;
  promotionId?: string;
  inStock?: boolean;
}

export const products: Product[] = [
  {
    id: '15313',
    name: 'Набор Tokuyama Universal Bond II Kit',
    brand: 'TOKUYAMA DENTAL',
    article: '15313',
    price: 10225,
    category: 'Адгезивы',
    direction: 'Терапия',
    topLevelCategory: 'Материалы',
    subcategory: 'Адгезивы',
    shortDescription: 'Двухкомпонентная универсальная адгезивная система самоотверждаемого типа. Совместима с любыми материалами и обеспечивает высокую силу адгезии к дентину, эмали и реставрационным материалам без дополнительных праймеров.',
    description: 'Tokuyama Universal Bond II — двухкомпонентная универсальная адгезивная система для фиксации ко стоматологическим материалам и тканям зуба.\n\nКлючевые преимущества:\n\n• подходит для прямых и непрямых реставраций;\n• не требует световой полимеризации;\n• совместима со светоотверждаемыми, самоотверждаемыми материалами и цементами двойного отверждения;\n• экономит время за счёт отсутствия дополнительных праймеров.',
    specifications: {
      series: 'Tokuyama Universal Bond II',
      purpose: 'Для эмали и дентина',
      curing: 'Самоотверждение',
      form: 'Флакон',
      selfEtching: 'Да',
      suitableFor: 'Терапия'
    },
    documents: {
      instruction: true,
      certificate: true
    },
    isNew: true,
    promotionId: 'promo-2'
  },
  {
    id: '10933',
    name: 'Набор пломбировочных материалов Tokuyama Estelite Asteria Syringe Essential Kit',
    brand: 'TOKUYAMA DENTAL',
    article: '10933',
    price: 31815,
    category: 'Композиты',
    direction: 'Терапия',
    topLevelCategory: 'Материалы',
    subcategory: 'Материалы для прямой реставрации',
    shortDescription: 'Базовый стартовый набор светоотверждаемого супра-нано наполненного композита для высокоэстетичных реставраций. Двухслойная концепция Body и Enamel позволяет создать естественную реставрацию.',
    description: 'Tokuyama Estelite Asteria — реставрационный материал нового поколения для эстетики фронтальных и жевательных зубов.\n\nОсобенности:\n\n• двухслойная концепция Body и Enamel;\n• супра-нано частицы;\n• эффект хамелеона;\n• быстрое время полимеризации.\n\nКомплектация Essential Kit:\n\n• 7 шприцев: Body A1B, A2B, A3B, A3.5B, A4B; Enamel NE, OcE.',
    specifications: {
      series: 'Tokuyama Estelite Asteria',
      color: 'A1B, A2B, A3B, A3.5B, A4B, NE, OcE',
      consistency: 'Пастообразная',
      viscosity: 'Высокая',
      curing: 'Световое',
      materialType: 'Композит',
      form: 'Шприц',
      suitableFor: 'Терапия'
    },
    documents: {
      instruction: true,
      certificate: true
    },
    promotionId: 'promo-1',
    hasVariants: true,
    variantType: 'kit-syringe',
    variants: [
      {
        id: '10933-kit',
        name: 'Essential Kit (A1B, A2B, A3B, A3.5B, A4B, NE, OcE)',
        article: '10933',
        price: 31815,
        type: 'kit'
      },
      {
        id: '10933-a1b',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-A1B',
        price: 5200,
        type: 'syringe',
        shade: 'A1B'
      },
      {
        id: '10933-a2b',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-A2B',
        price: 5200,
        type: 'syringe',
        shade: 'A2B'
      },
      {
        id: '10933-a3b',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-A3B',
        price: 5200,
        type: 'syringe',
        shade: 'A3B'
      },
      {
        id: '10933-a35b',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-A3.5B',
        price: 5200,
        type: 'syringe',
        shade: 'A3.5B'
      },
      {
        id: '10933-a4b',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-A4B',
        price: 5200,
        type: 'syringe',
        shade: 'A4B'
      },
      {
        id: '10933-b3b',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-B3B',
        price: 5200,
        type: 'syringe',
        shade: 'B3B'
      },
      {
        id: '10933-bl',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-BL',
        price: 5200,
        type: 'syringe',
        shade: 'BL'
      },
      {
        id: '10933-ne',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-NE',
        price: 5200,
        type: 'syringe',
        shade: 'NE'
      },
      {
        id: '10933-we',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-WE',
        price: 5200,
        type: 'syringe',
        shade: 'WE'
      },
      {
        id: '10933-ye',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-YE',
        price: 5200,
        type: 'syringe',
        shade: 'YE'
      },
      {
        id: '10933-te',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-TE',
        price: 5200,
        type: 'syringe',
        shade: 'TE'
      },
      {
        id: '10933-oce',
        name: 'Отдельный пломбировочный материал (Syringe)',
        article: '10933-OcE',
        price: 5200,
        type: 'syringe',
        shade: 'OcE'
      }
    ]
  },
  {
    id: '14906',
    name: 'Набор Tokuyama Bond Force II Kit',
    brand: 'TOKUYAMA DENTAL',
    article: '14906',
    price: 6091,
    category: 'Адгезивы',
    direction: 'Терапия',
    topLevelCategory: 'Материалы',
    subcategory: 'Адгезивы',
    shortDescription: 'Набор адгезивной системы Tokuyama Bond Force II для терапевтических реставраций.',
    description: 'Набор адгезивной системы Tokuyama Bond Force II для терапевтических реставраций.',
    specifications: {
      suitableFor: 'Терапия'
    },
    documents: {
      instruction: true,
      certificate: true
    },
    isNew: true
  },
  {
    id: '14926',
    name: 'Адгезив Tokuyama Bond Force II Refill',
    brand: 'TOKUYAMA DENTAL',
    article: '14926',
    price: 6091,
    category: 'Адгезивы',
    direction: 'Терапия',
    topLevelCategory: 'Материалы',
    subcategory: 'Адгезивы',
    shortDescription: 'Отдельный адгезив Tokuyama Bond Force II в формате refill.',
    description: 'Отдельный адгезив Tokuyama Bond Force II в формате refill.',
    specifications: {
      suitableFor: 'Терапия'
    },
    documents: {
      instruction: true,
      certificate: true
    }
  },
  {
    id: '14971',
    name: 'Набор Tokuyama Bond Force II Pen Kit',
    brand: 'TOKUYAMA DENTAL',
    article: '14971',
    price: 7369,
    category: 'Адгезивы',
    direction: 'Терапия',
    topLevelCategory: 'Материалы',
    subcategory: 'Адгезивы',
    shortDescription: 'Набор адгезивной системы Tokuyama Bond Force II в формате Pen Kit.',
    description: 'Набор адгезивной системы Tokuyama Bond Force II в формате Pen Kit.',
    specifications: {
      suitableFor: 'Терапия'
    },
    documents: {
      instruction: true,
      certificate: true
    },
    isNew: true
  },
  {
    id: '14114',
    name: 'Набор Tokuyama EE-Bond Intro Kit',
    brand: 'TOKUYAMA DENTAL',
    article: '14114',
    price: 5397,
    category: 'Адгезивы',
    direction: 'Терапия',
    topLevelCategory: 'Материалы',
    subcategory: 'Адгезивы',
    shortDescription: 'Стартовый набор Tokuyama EE-Bond.',
    description: 'Стартовый набор Tokuyama EE-Bond.',
    specifications: {
      suitableFor: 'Терапия'
    },
    documents: {
      instruction: true,
      certificate: true
    },
    isNew: true
  },
  {
    id: '14701',
    name: 'Набор Tokuyama One-Up Bond F Plus Kit',
    brand: 'TOKUYAMA DENTAL',
    article: '14701',
    price: 13537,
    category: 'Адгезивы',
    direction: 'Терапия',
    topLevelCategory: 'Материалы',
    subcategory: 'Адгезивы',
    shortDescription: 'Набор Tokuyama One-Up Bond F Plus Kit.',
    description: 'Набор Tokuyama One-Up Bond F Plus Kit.',
    specifications: {
      suitableFor: 'Терапия'
    },
    documents: {
      instruction: true,
      certificate: true
    },
    inStock: false
  }
];

// Новая структура каталога
export const topLevelCategories = ['Инструменты', 'Материалы', 'Оборудование'];

export const materialsSubcategories = [
  'Адгезивы',
  'Десенситайзеры',
  'Материалы для прямой реставрации',
  'Композитные краски',
  'Материалы для перебазировки и починки протезов',
  'Цементы и фиксация'
];

// Серии для фильтра "По серии"
export const productSeries = [
  'Estelite Asteria',
  'Estelite Sigma Quick',
  'Omnichroma',
  'Estelite Universal Flow',
  'Estelite Bulk Fill Flow'
];

// Консистенции для фильтра
export const consistencyOptions = ['Пастообразная', 'Жидкотекучая'];

// Цвета для фильтра
export const colorOptions = ['A1', 'A2', 'A3', 'A3.5', 'A4', 'B1', 'B2', 'NE', 'OcE', 'BL'];

// Старые экспорты для совместимости
export const categories = ['Адгезивы', 'Композиты', 'Наборы', 'Шприцы'];
export const directions = ['Все специалисты', 'Ортопедия', 'Терапия'];
