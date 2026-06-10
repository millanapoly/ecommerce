import { Promotion } from './products';

export const promotions: Promotion[] = [
  {
    id: 'promo-1',
    name: 'Estelite Asteria 3+1',
    productId: '10933',
    minQuantity: 3,
    giftProductId: 'gift-1',
    giftProductName: 'Estelite Asteria ОБРАЗЕЦ',
    giftProductPrice: 5200,
    giftQuantity: 1,
    badge: '3+1',
    description: 'Купите 3 шт. этого товара и получите 1 образец в подарок. Подарок будет добавлен в корзину автоматически при выполнении условий акции.',
    shortDescription: 'Купите 3 шт. — получите образец в подарок',
    isActive: true,
    priority: 1
  },
  {
    id: 'promo-2',
    name: 'Universal Bond II 2+1',
    productId: '15313',
    minQuantity: 2,
    giftProductId: 'gift-2',
    giftProductName: 'Universal Bond II ОБРАЗЕЦ',
    giftProductPrice: 10800,
    giftQuantity: 1,
    badge: '2+1',
    description: 'Купите 2 шт. этого товара и получите 1 образец в подарок. Подарок будет добавлен в корзину автоматически при выполнении условий акции.',
    shortDescription: 'Купите 2 шт. — получите образец в подарок',
    isActive: true,
    priority: 1
  }
];

export function getPromotionForProduct(productId: string): Promotion | undefined {
  return promotions.find(p => p.productId === productId && p.isActive);
}

export function getActivePromotions(): Promotion[] {
  return promotions.filter(p => p.isActive);
}
