import { useParams, Link } from 'react-router';
import { products, ProductVariant } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { Copy, FileText, ShoppingCart, ChevronLeft, Gift } from 'lucide-react';
import { useState } from 'react';
import { getPromotionForProduct } from '../data/promotions';

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [copied, setCopied] = useState(false);

  const [selectedVariantType, setSelectedVariantType] = useState<'kit' | 'syringe'>('kit');
  const [selectedShade, setSelectedShade] = useState<string>('');

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Товар не найден</h1>
          <Link to="/catalog" className="text-[#0066FF] hover:underline">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  // Инициализация выбранного оттенка
  if (product.hasVariants && product.variantType === 'kit-syringe' && !selectedShade) {
    const firstSyringe = product.variants?.find(v => v.type === 'syringe');
    if (firstSyringe?.shade) {
      setSelectedShade(firstSyringe.shade);
    }
  }

  const getSelectedVariant = (): ProductVariant | null => {
    if (!product.hasVariants || !product.variants) return null;

    if (selectedVariantType === 'kit') {
      return product.variants.find(v => v.type === 'kit') || null;
    } else {
      return product.variants.find(v => v.type === 'syringe' && v.shade === selectedShade) || null;
    }
  };

  const selectedVariant = getSelectedVariant();
  const currentPrice = selectedVariant?.price || product.price;
  const currentArticle = selectedVariant?.article || product.article;
  const promotion = product.promotionId ? getPromotionForProduct(product.id) : undefined;

  const handleCopyArticle = () => {
    navigator.clipboard.writeText(currentArticle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = () => {
    if (product.inStock === false) {
      return;
    }
    if (product.hasVariants && selectedVariant) {
      const variantProduct = {
        ...product,
        id: selectedVariant.id,
        name: selectedVariantType === 'kit'
          ? product.name
          : `${product.name.split('Tokuyama')[1]?.trim() || product.name} (${selectedShade})`,
        article: selectedVariant.article,
        price: selectedVariant.price
      };
      addToCart(variantProduct, quantity);
    } else {
      addToCart(product, quantity);
    }
  };

  const isOutOfStock = product.inStock === false;

  const availableShades = product.variants?.filter(v => v.type === 'syringe') || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад в каталог
        </Link>

        {/* Основная информация */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Фото */}
          <div className="lg:col-span-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center sticky top-24">
              <div className="text-muted-foreground">Фото товара</div>
            </div>
          </div>

          {/* Информация */}
          <div className="lg:col-span-5">
            <div className="text-sm text-muted-foreground mb-2">{product.brand}</div>
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-muted-foreground">Арт. {currentArticle}</span>
              <button
                onClick={handleCopyArticle}
                className="p-1 hover:bg-accent rounded transition-colors"
                title="Копировать артикул"
              >
                <Copy className="w-4 h-4" />
              </button>
              {copied && <span className="text-sm text-green-600">Скопировано!</span>}
            </div>

            <p className="text-muted-foreground mb-6">{product.shortDescription}</p>

            {/* Блок акции */}
            {promotion && (
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded">
                        Акция {promotion.badge}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{promotion.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Выбор варианта: Набор или Отдельный шприц */}
            {product.hasVariants && product.variantType === 'kit-syringe' && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-4">Другие варианты (Tokuyama Estelite Asteria):</h3>

                {/* Переключатель между набором и шприцем */}
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setSelectedVariantType('kit')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                      selectedVariantType === 'kit'
                        ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]'
                        : 'border-border hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Набор пломбировочных материалов (Kit)</div>
                  </button>
                  <button
                    onClick={() => setSelectedVariantType('syringe')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                      selectedVariantType === 'syringe'
                        ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]'
                        : 'border-border hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Отдельный пломбировочный материал (Syringe)</div>
                  </button>
                </div>

                {/* Выбор оттенка для шприца */}
                {selectedVariantType === 'syringe' && (
                  <div>
                    <label className="block text-sm font-medium mb-3">Цвет:</label>
                    <div className="grid grid-cols-4 gap-2">
                      {availableShades.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedShade(variant.shade || '')}
                          className={`px-3 py-2 rounded-lg border-2 transition-colors ${
                            selectedShade === variant.shade
                              ? 'border-[#0066FF] bg-blue-50 text-[#0066FF] font-medium'
                              : 'border-border hover:border-gray-300'
                          }`}
                        >
                          {variant.shade}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Показываем выбранный вариант */}
                {selectedVariant && (
                  <div className="mt-4 p-3 bg-white rounded border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Выбран:</div>
                    <div className="font-medium">
                      {selectedVariantType === 'kit'
                        ? selectedVariant.name
                        : `${selectedVariant.name} - ${selectedShade}`
                      }
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Характеристики */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Характеристики</h3>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => {
                  if (!value) return null;
                  const labels: Record<string, string> = {
                    series: 'Серия',
                    purpose: 'Назначение',
                    color: 'Цвет / оттенок',
                    consistency: 'Консистенция',
                    viscosity: 'Вязкость',
                    curing: 'Отверждение',
                    materialType: 'Тип материала',
                    form: 'Форма выпуска',
                    designation: 'Предназначение',
                    suitableFor: 'Подходит для',
                    selfEtching: 'Самопротравливающийся'
                  };
                  return (
                    <div key={key} className="flex py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground w-1/2">{labels[key]}</span>
                      <span className="w-1/2">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Покупка */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-border rounded-lg p-6 sticky top-24">
              <div className="text-3xl font-semibold mb-6">
                {currentPrice.toLocaleString('ru-RU')} ₽
              </div>

              {isOutOfStock ? (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 font-medium">Нет в наличии</p>
                  <p className="text-sm text-red-600 mt-1">Товар временно недоступен для заказа</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <label className="text-sm text-muted-foreground mb-2 block">Количество</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-accent"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 h-10 text-center border border-border rounded-lg"
                        min="1"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-accent"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors mb-6"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    В корзину
                  </button>
                </>
              )}

              <div className="text-sm space-y-2 text-muted-foreground">
                {!isOutOfStock && (
                  <p>
                    <strong>Доставка:</strong> от 1 дня после оформления заказа
                  </p>
                )}
                <p className="text-xs">
                  Финальные условия подтвердит поставщик.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Вкладки */}
        <div className="border-t border-border">
          <div className="flex gap-6 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'description'
                  ? 'border-[#0066FF] text-primary'
                  : 'border-transparent text-muted-foreground hover:text-primary'
              }`}
            >
              Описание
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'documents'
                  ? 'border-[#0066FF] text-primary'
                  : 'border-transparent text-muted-foreground hover:text-primary'
              }`}
            >
              Документы
            </button>
          </div>

          <div className="pb-12">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {activeTab === 'documents' && (
              <div>
                <h3 className="font-medium mb-2">Документы</h3>
                <p className="text-muted-foreground mb-6">
                  Регистрационные удостоверения, инструкции по применению и сертификаты качества.
                </p>
                <div className="space-y-3">
                  {product.documents.instruction && (
                    <a
                      href="#"
                      className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Инструкция по применению</div>
                        <div className="text-sm text-muted-foreground">PDF</div>
                      </div>
                    </a>
                  )}
                  {product.documents.certificate && (
                    <a
                      href="#"
                      className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Регистрационное удостоверение</div>
                        <div className="text-sm text-muted-foreground">PDF</div>
                      </div>
                    </a>
                  )}
                  {product.documents.quality && (
                    <a
                      href="#"
                      className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Сертификат качества</div>
                        <div className="text-sm text-muted-foreground">PDF</div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
