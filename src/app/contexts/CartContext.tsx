import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Product } from '../data/products';
import { getActivePromotions } from '../data/promotions';

interface CartItem {
  product: Product;
  quantity: number;
  isGift?: boolean;
  relatedPromoId?: string;
}

export interface AppliedPromo {
  code: string;
  discount: number;
  label: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  appliedPromo: AppliedPromo | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  getPromoDiscount: () => number;
}

const PROMO_CODES: Record<string, { discount: number; label: string }> = {
  DENTAL10: { discount: 0.10, label: '10%' },
  PROMO20: { discount: 0.20, label: '20%' },
  TOKUYAMA: { discount: 0.15, label: '15%' },
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const isProcessingGiftsRef = useRef(false);

  // Auto-manage promotional gifts
  useEffect(() => {
    if (isProcessingGiftsRef.current) return;

    isProcessingGiftsRef.current = true;

    const activePromotions = getActivePromotions();
    const updatedItems = [...items];
    let hasChanges = false;

    activePromotions.forEach(promo => {
      const promoItem = updatedItems.find(
        item => item.product.id === promo.productId && !item.isGift
      );

      const giftItemIndex = updatedItems.findIndex(
        item => item.isGift && item.relatedPromoId === promo.id
      );

      const shouldHaveGift = promoItem && promoItem.quantity >= promo.minQuantity;

      if (shouldHaveGift && giftItemIndex === -1) {
        const giftProduct: Product = {
          id: promo.giftProductId,
          name: promo.giftProductName,
          brand: 'TOKUYAMA DENTAL',
          article: 'GIFT',
          price: promo.giftProductPrice,
          category: 'Подарок',
          direction: 'Терапия',
          shortDescription: `Подарок по акции ${promo.badge}`,
          description: `Подарок по акции ${promo.badge}`,
          specifications: {},
          documents: {
            instruction: false,
            certificate: false
          }
        };

        updatedItems.push({
          product: giftProduct,
          quantity: promo.giftQuantity,
          isGift: true,
          relatedPromoId: promo.id
        });
        hasChanges = true;
      } else if (!shouldHaveGift && giftItemIndex !== -1) {
        updatedItems.splice(giftItemIndex, 1);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setItems(updatedItems);
    }

    isProcessingGiftsRef.current = false;
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const applyPromo = (code: string): boolean => {
    const found = PROMO_CODES[code.trim().toUpperCase()];
    if (found) {
      setAppliedPromo({ code: code.trim().toUpperCase(), ...found });
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const getPromoDiscount = () => {
    if (!appliedPromo) return 0;
    const nonGiftTotal = items
      .filter(i => !i.isGift)
      .reduce((s, i) => s + i.product.price * i.quantity, 0);
    return Math.round(nonGiftTotal * appliedPromo.discount);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        appliedPromo,
        applyPromo,
        removePromo,
        getPromoDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
