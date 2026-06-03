import { Link, useNavigate } from 'react-router';
import { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { getPromotionForProduct } from '../data/promotions';

interface ProductCardProps {
  product: Product;
  view?: 'grid' | 'list';
}

export function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const promotion = product.promotionId ? getPromotionForProduct(product.id) : undefined;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.hasVariants || product.inStock === false) {
      return;
    }
    addToCart(product);
  };

  const isOutOfStock = product.inStock === false;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const getMinPrice = () => {
    if (product.hasVariants && product.variants) {
      const prices = product.variants.map(v => v.price);
      return Math.min(...prices);
    }
    return product.price;
  };

  const minPrice = getMinPrice();
  const hasMultiplePrices = product.hasVariants && product.variants && product.variants.length > 1;

  if (view === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="flex gap-4 p-4 bg-white border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center shrink-0 relative">
          <div className="text-muted-foreground text-sm">Фото</div>

          {/* Бейджи */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                Новинка
              </span>
            )}
            {promotion && (
              <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-medium rounded">
                Акция {promotion.badge}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xs text-muted-foreground">{product.brand}</div>
          <h3 className="font-medium">{product.name}</h3>
          {promotion && (
            <p className="text-sm text-orange-600">{promotion.shortDescription}</p>
          )}
          <div className="text-sm text-muted-foreground">Арт. {product.article}</div>
          <div className="mt-auto flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold">
                {hasMultiplePrices && 'от '}
                {minPrice.toLocaleString('ru-RU')} ₽
              </div>
              {isOutOfStock ? (
                <div className="text-sm text-red-600 font-medium mt-1">
                  Нет в наличии
                </div>
              ) : (
                <div className="text-xs text-muted-foreground mt-1">
                  Доставка: от 1 дня после оформления заказа
                </div>
              )}
            </div>
            {isOutOfStock ? (
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
              >
                Нет в наличии
              </button>
            ) : product.hasVariants ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${product.id}`);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
              >
                Выбрать вариант
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                В корзину
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col gap-3 p-4 bg-white border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative">
        <div className="text-muted-foreground text-sm">Фото товара</div>

        {/* Бейджи */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded">
              Новинка
            </span>
          )}
          {promotion && (
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded">
              Акция {promotion.badge}
            </span>
          )}
        </div>
      </div>
      <div className="text-xs text-muted-foreground">{product.brand}</div>
      <h3 className="font-medium line-clamp-2">{product.name}</h3>
      {promotion && (
        <p className="text-sm text-orange-600">{promotion.shortDescription}</p>
      )}
      <div className="text-sm text-muted-foreground">Арт. {product.article}</div>
      <div className="mt-auto">
        <div className="text-xl font-semibold mb-1">
          {hasMultiplePrices && 'от '}
          {minPrice.toLocaleString('ru-RU')} ₽
        </div>
        {isOutOfStock ? (
          <div className="text-sm text-red-600 font-medium mb-3">
            Нет в наличии
          </div>
        ) : (
          <div className="text-xs text-muted-foreground mb-3">
            Доставка: от 1 дня после оформления заказа
          </div>
        )}
        {isOutOfStock ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
          >
            Нет в наличии
          </button>
        ) : product.hasVariants ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
          >
            Выбрать вариант
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            В корзину
          </button>
        )}
      </div>
    </div>
  );
}
