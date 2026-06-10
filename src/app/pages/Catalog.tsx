import { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { products, topLevelCategories, materialsSubcategories, productSeries, consistencyOptions, colorOptions } from '../data/products';
import { Grid, List, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';

export function Catalog() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Категории и подкатегории
  const [selectedTopCategory, setSelectedTopCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [isMaterialsExpanded, setIsMaterialsExpanded] = useState(false);

  // Фильтры для "Материалы для прямой реставрации"
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedConsistencies, setSelectedConsistencies] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Свернутость блоков фильтров
  const [isSeriesExpanded, setIsSeriesExpanded] = useState(true);
  const [isConsistencyExpanded, setIsConsistencyExpanded] = useState(true);
  const [isColorExpanded, setIsColorExpanded] = useState(true);

  const showFilters = selectedTopCategory === 'Материалы' && selectedSubcategory === 'Материалы для прямой реставрации';

  const sortOptions = [
    { value: 'popular', label: 'Популярные' },
    { value: 'price-asc', label: 'Цена по возрастанию' },
    { value: 'price-desc', label: 'Цена по убыванию' },
  ];

  const getSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Популярные';
  };

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTopCategoryClick = (category: string) => {
    if (category === '') {
      // Клик на "Каталог" - показать все товары
      setSelectedTopCategory('');
      setSelectedSubcategory('');
      setIsMaterialsExpanded(false);
      resetFilters();
      return;
    }

    setSelectedTopCategory(category);
    if (category === 'Материалы') {
      setIsMaterialsExpanded(true);
      if (!selectedSubcategory) {
        setSelectedSubcategory('Материалы для прямой реставрации');
      }
    } else {
      setSelectedSubcategory('');
      setIsMaterialsExpanded(false);
    }
    resetFilters();
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    resetFilters();
  };

  const toggleSeries = (series: string) => {
    setSelectedSeries(prev =>
      prev.includes(series) ? prev.filter(s => s !== series) : [...prev, series]
    );
  };

  const toggleConsistency = (consistency: string) => {
    setSelectedConsistencies(prev =>
      prev.includes(consistency) ? prev.filter(c => c !== consistency) : [...prev, consistency]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const resetFilters = () => {
    setSelectedSeries([]);
    setSelectedConsistencies([]);
    setSelectedColors([]);
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Фильтр по верхней категории
    if (selectedTopCategory === '') {
      // Показать все товары
      // filtered остается без изменений
    } else if (selectedTopCategory === 'Материалы' && selectedSubcategory) {
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory);
    } else if (selectedTopCategory !== 'Материалы' && selectedTopCategory !== '') {
      filtered = filtered.filter(p => p.topLevelCategory === selectedTopCategory);
    }

    // Фильтры для "Материалы для прямой реставрации"
    if (showFilters) {
      if (selectedSeries.length > 0) {
        filtered = filtered.filter(p =>
          p.specifications.series && selectedSeries.includes(p.specifications.series)
        );
      }

      if (selectedConsistencies.length > 0) {
        filtered = filtered.filter(p =>
          p.specifications.consistency && selectedConsistencies.includes(p.specifications.consistency)
        );
      }

      if (selectedColors.length > 0) {
        filtered = filtered.filter(p => {
          if (!p.specifications.color) return false;
          // Проверяем, содержится ли хотя бы один из выбранных цветов в строке цветов товара
          return selectedColors.some(color => p.specifications.color?.includes(color));
        });
      }
    }

    // Поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.article.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.specifications.series?.toLowerCase() || '').includes(query)
      );
    }

    // Фильтрация и сортировка
    switch (sortBy) {
      case 'popular':
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [selectedTopCategory, selectedSubcategory, selectedSeries, selectedConsistencies, selectedColors, searchQuery, sortBy, showFilters]);

  // Подсчет товаров по фильтрам
  const getSeriesCount = (series: string) => {
    return products.filter(p =>
      p.subcategory === 'Материалы для прямой реставрации' &&
      p.specifications.series === series
    ).length;
  };

  const getConsistencyCount = (consistency: string) => {
    return products.filter(p =>
      p.subcategory === 'Материалы для прямой реставрации' &&
      p.specifications.consistency === consistency
    ).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Левая колонка - категории и фильтры */}
          <aside className="w-72 shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {/* Карточка категорий */}
              <div className="bg-white border border-border rounded-lg p-4">
                <div className="space-y-1">
                  {/* Кнопка "Каталог" - показать все товары */}
                  <button
                    onClick={() => handleTopCategoryClick('')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      selectedTopCategory === ''
                        ? 'bg-blue-500 text-white font-medium'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span>Каталог</span>
                  </button>

                  {topLevelCategories.map((category) => (
                    <div key={category}>
                      <button
                        onClick={() => handleTopCategoryClick(category)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                          selectedTopCategory === category && category !== 'Материалы'
                            ? 'bg-blue-50 text-[#0066FF] font-medium'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span>{category}</span>
                        {category === 'Материалы' && (
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isMaterialsExpanded ? 'rotate-90' : ''
                            }`}
                          />
                        )}
                      </button>

                      {/* Подкатегории для "Материалы" */}
                      {category === 'Материалы' && isMaterialsExpanded && (
                        <div className="ml-3 mt-1 space-y-1">
                          {materialsSubcategories.map((subcategory) => (
                            <button
                              key={subcategory}
                              onClick={() => {
                                setSelectedTopCategory('Материалы');
                                handleSubcategoryClick(subcategory);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors relative ${
                                selectedSubcategory === subcategory
                                  ? 'bg-blue-50 text-[#0066FF] font-medium'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              {selectedSubcategory === subcategory && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#0066FF] rounded-r" />
                              )}
                              <span className="block pl-2">{subcategory}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Фильтры для "Материалы для прямой реставрации" */}
              {showFilters && (
                <>
                  {/* По серии */}
                  <div className="bg-white border border-border rounded-lg p-4">
                    <button
                      onClick={() => setIsSeriesExpanded(!isSeriesExpanded)}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <h3 className="font-medium">По серии</h3>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSeriesExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {isSeriesExpanded && (
                      <div className="space-y-2">
                        {productSeries.map((series) => {
                          const count = getSeriesCount(series);
                          return (
                            <label key={series} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedSeries.includes(series)}
                                onChange={() => toggleSeries(series)}
                                className="w-4 h-4 rounded border-border"
                              />
                              <span className="flex-1 text-sm">{series}</span>
                              <span className="text-xs text-muted-foreground">{count}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* По консистенции */}
                  <div className="bg-white border border-border rounded-lg p-4">
                    <button
                      onClick={() => setIsConsistencyExpanded(!isConsistencyExpanded)}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <h3 className="font-medium">По консистенции</h3>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isConsistencyExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {isConsistencyExpanded && (
                      <div className="space-y-2">
                        {consistencyOptions.map((consistency) => {
                          const count = getConsistencyCount(consistency);
                          return (
                            <label key={consistency} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedConsistencies.includes(consistency)}
                                onChange={() => toggleConsistency(consistency)}
                                className="w-4 h-4 rounded border-border"
                              />
                              <span className="flex-1 text-sm">{consistency}</span>
                              <span className="text-xs text-muted-foreground">{count}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* По цвету */}
                  <div className="bg-white border border-border rounded-lg p-4">
                    <button
                      onClick={() => setIsColorExpanded(!isColorExpanded)}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <h3 className="font-medium">По цвету</h3>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isColorExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {isColorExpanded && (
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            onClick={() => toggleColor(color)}
                            className={`px-3 py-1.5 rounded-lg border-2 text-sm transition-colors ${
                              selectedColors.includes(color)
                                ? 'border-[#0066FF] bg-blue-50 text-[#0066FF] font-medium'
                                : 'border-border hover:border-gray-300'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Кнопка сброса фильтров */}
                  <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                </>
              )}
            </div>
          </aside>

          {/* Основная область */}
          <div className="flex-1">
            {/* Заголовок и контролы */}
            <div className="mb-6">
              <h1 className="text-3xl font-semibold mb-2">
                {selectedSubcategory || selectedTopCategory || 'Все товары'}
              </h1>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 'товаров'}
                </p>
                <div className="flex items-center gap-4">
                  {/* Вид */}
                  <div className="flex gap-1 p-1 bg-muted rounded-lg">
                    <button
                      onClick={() => setView('grid')}
                      className={`p-2 rounded ${
                        view === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setView('list')}
                      className={`p-2 rounded ${
                        view === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Сортировка */}
                  <div className="relative" ref={sortDropdownRef}>
                    <button
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                      className="min-w-[200px] flex items-center justify-between pl-4 pr-3 py-2.5 bg-white border-2 border-[#0066FF] rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                    >
                      <span>{getSortLabel()}</span>
                      {isSortDropdownOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#0066FF]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#0066FF]" />
                      )}
                    </button>

                    {isSortDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10 overflow-hidden">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                              sortBy === option.value ? 'bg-blue-50 font-medium' : ''
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Товары */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  view === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold mb-2">Ничего не найдено</h2>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить запрос или сбросить фильтры.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC]"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
