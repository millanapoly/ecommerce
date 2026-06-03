import { Link } from 'react-router';
import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export function Home() {
  const [activeTab, setActiveTab] = useState<'popular' | 'new' | 'promotions'>('popular');

  const popularProducts = products.slice(0, 5);
  const newProducts = products.filter(p => p.isNew);
  const promotionProducts = products.filter(p => p.promotionId);

  const displayedProducts =
    activeTab === 'popular' ? popularProducts :
    activeTab === 'new' ? newProducts :
    promotionProducts;

  return (
    <div className="min-h-screen bg-background">
      {/* Первый экран */}
      <div className="bg-gradient-to-b from-[#F5F7FA] to-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Официальные материалы Tokuyama Dental для стоматологических клиник
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
Tokuyama у официальных поставщиков — быстро и без лишних звонков.
Соберите заказ онлайн, а ProfiSfera подберёт поставщика с наличием нужных товаров и ближайшим сроком доставки
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

      {/* Товарные подборки с табами */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Табы */}
        <div className="flex gap-6 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('popular')}
            className={`pb-4 px-2 border-b-2 transition-colors ${
              activeTab === 'popular'
                ? 'border-[#0066FF] text-primary'
                : 'border-transparent text-muted-foreground hover:text-primary'
            }`}
          >
            <span className="text-xl font-semibold">Популярные</span>
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`pb-4 px-2 border-b-2 transition-colors ${
              activeTab === 'new'
                ? 'border-[#0066FF] text-primary'
                : 'border-transparent text-muted-foreground hover:text-primary'
            }`}
          >
            <span className="text-xl font-semibold">Новинки</span>
          </button>
          <button
            onClick={() => setActiveTab('promotions')}
            className={`pb-4 px-2 border-b-2 transition-colors ${
              activeTab === 'promotions'
                ? 'border-[#0066FF] text-primary'
                : 'border-transparent text-muted-foreground hover:text-primary'
            }`}
          >
            <span className="text-xl font-semibold">Акции</span>
          </button>
        </div>

        {/* Товары */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Нет товаров в данной категории
          </div>
        )}
      </div>
    </div>
  );
}
