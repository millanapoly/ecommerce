import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Product } from '../data/products';
import { getActivePromotions } from '../data/promotions';

interface CartItem {
  product: Product;
  quantity: number;
  isGift?: boolean;
  relatedPromoId?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const isProcessingGiftsRef = useRef(false);

  // Auto-manage promotional gifts
  useEffect(() => {
    if (isProcessingGiftsRef.current) return;

    isProcessingGiftsRef.current = true;

    const activePromotions = getActivePromotions();
    const updatedItems = [...items];
    let hasChanges = false;

    activePromotions.forEach(promo => {
      // Find the promotional product in cart
      const promoItem = updatedItems.find(
        item => item.product.id === promo.productId && !item.isGift
      );

      const giftItemIndex = updatedItems.findIndex(
        item => item.isGift && item.relatedPromoId === promo.id
      );

      const shouldHaveGift = promoItem && promoItem.quantity >= promo.minQuantity;

      if (shouldHaveGift && giftItemIndex === -1) {
        // Add gift
        const giftProduct: Product = {
          id: promo.giftProductId,
          name: promo.giftProductName,
          brand: 'TOKUYAMA DENTAL',
          article: 'GIFT',
          price: 0,
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
        // Remove gift
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
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
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
        getTotalPrice
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
