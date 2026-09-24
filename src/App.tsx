import React, { useState, useEffect } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { DealsScreen } from './components/DealsScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { CompareModal } from './components/CompareModal';
import { PriceAlertModal } from './components/PriceAlertModal';
import { MenuDrawer } from './components/MenuDrawer';
import { Toast, ToastMessage } from './components/Toast';
import { PRODUCTS, INITIAL_COUPONS, INITIAL_PRICE_ALERTS } from './data/mockData';
import { ActiveTab, Product, PriceAlert, CouponItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Initial wishlist items matching Screen 1 (Sony WH-1000XM5, Samsung 55" QLED 4K)
  const [wishlistIds, setWishlistIds] = useState<string[]>(['sony-wh1000xm5', 'samsung-55-qled']);

  // Initial price alerts matching Screen 1 (iPhone 16)
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(INITIAL_PRICE_ALERTS);

  // Initial compare selections matching Screen 5 (iPhone 16 Midnight, iPhone 16 Starlight)
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([
    'iphone-16-128gb-black',
    'iphone-16-128gb-starlight',
  ]);

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [alertModalProduct, setAlertModalProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const newToast: ToastMessage = {
      id: String(Date.now() + Math.random()),
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3000);
  };

  // Switch to product detail view
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back from product detail
  const handleBackFromDetail = () => {
    setSelectedProduct(null);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed "${product.shortTitle}" from Wishlist`, 'info');
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`Saved "${product.shortTitle}" to Wishlist!`, 'success');
    }
  };

  // Compare toggles
  const handleToggleCompare = (productId: string) => {
    if (selectedForCompare.includes(productId)) {
      setSelectedForCompare((prev) => prev.filter((id) => id !== productId));
    } else {
      if (selectedForCompare.length >= 3) {
        showToast('You can compare up to 3 products at a time', 'info');
        return;
      }
      setSelectedForCompare((prev) => [...prev, productId]);
      showToast('Added to compare list', 'success');
    }
  };

  // Price alert addition
  const handleAddAlert = (alertData: Omit<PriceAlert, 'id' | 'createdAt'>) => {
    const newAlert: PriceAlert = {
      ...alertData,
      id: `alert-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPriceAlerts((prev) => [newAlert, ...prev]);
    showToast(`Price alert activated for ₹${alertData.targetPrice.toLocaleString('en-IN')}!`);
  };

  const handleRemoveAlert = (alertId: string) => {
    setPriceAlerts((prev) => prev.filter((a) => a.id !== alertId));
    showToast('Price alert deleted', 'info');
  };

  // Category select
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search trigger
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all');
    setSelectedProduct(null);
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Copy coupon code
  const handleCopyCoupon = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    showToast(`Coupon "${code}" copied to clipboard!`, 'success');
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const comparedProducts = PRODUCTS.filter((p) => selectedForCompare.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Toast notifications */}
      <Toast toasts={toasts} />

      {/* Top App Bar */}
      <TopAppBar
        onOpenMenu={() => setIsMenuOpen(true)}
        onSearchClick={() => {
          setSelectedProduct(null);
          setActiveTab('search');
        }}
        onLogoClick={() => {
          setSelectedProduct(null);
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeTab={activeTab}
        isProductDetail={!!selectedProduct}
        onBack={handleBackFromDetail}
        title="DEALCOMPARE"
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto">
        {selectedProduct ? (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={handleBackFromDetail}
            onNavigateToCategory={handleSelectCategory}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onOpenSetAlert={(prod) => setAlertModalProduct(prod)}
            onCompareProduct={(prod) => {
              if (!selectedForCompare.includes(prod.id)) {
                setSelectedForCompare((prev) => [...prev, prod.id]);
              }
              setIsCompareModalOpen(true);
            }}
            onCopyCoupon={handleCopyCoupon}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeScreen
                onSearch={handleSearch}
                onSelectProduct={handleSelectProduct}
                onSelectCategory={handleSelectCategory}
                onNavigateToSearch={() => {
                  setActiveTab('search');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                products={PRODUCTS}
              />
            )}

            {activeTab === 'search' && (
              <SearchScreen
                initialQuery={searchQuery}
                selectedCategory={selectedCategory}
                products={PRODUCTS}
                onSelectProduct={handleSelectProduct}
                selectedForCompare={selectedForCompare}
                onToggleCompare={handleToggleCompare}
                onOpenCompareModal={() => setIsCompareModalOpen(true)}
              />
            )}

            {activeTab === 'deals' && (
              <DealsScreen
                products={PRODUCTS}
                coupons={INITIAL_COUPONS}
                onSelectProduct={handleSelectProduct}
                onCopyCoupon={handleCopyCoupon}
              />
            )}

            {(activeTab === 'wishlist' || activeTab === 'alerts') && (
              <WishlistScreen
                wishlistProducts={wishlistProducts}
                priceAlerts={priceAlerts}
                onRemoveWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
                onRemoveAlert={handleRemoveAlert}
                onAddAlert={handleAddAlert}
                onSelectProduct={handleSelectProduct}
                allProducts={PRODUCTS}
              />
            )}
          </>
        )}
      </main>

      {/* Compare Side-by-Side Modal */}
      {isCompareModalOpen && (
        <CompareModal
          products={comparedProducts}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveProduct={(id) => setSelectedForCompare((prev) => prev.filter((i) => i !== id))}
          onSelectProduct={handleSelectProduct}
          allProducts={PRODUCTS}
          onAddProduct={(p) => {
            if (!selectedForCompare.includes(p.id)) {
              setSelectedForCompare((prev) => [...prev, p.id]);
            }
          }}
        />
      )}

      {/* Price Alert Modal */}
      {alertModalProduct && (
        <PriceAlertModal
          product={alertModalProduct}
          onClose={() => setAlertModalProduct(null)}
          onSaveAlert={handleAddAlert}
        />
      )}

      {/* Menu Drawer Sidebar */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateTab={(tab) => {
          setSelectedProduct(null);
          setActiveTab(tab);
        }}
        onSelectCategory={handleSelectCategory}
      />

      {/* Persistent Bottom Nav Bar */}
      <BottomNavBar
        activeTab={selectedProduct ? 'search' : activeTab}
        onTabChange={(tab) => {
          setSelectedProduct(null);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        wishlistCount={wishlistIds.length}
        alertCount={priceAlerts.length}
      />
    </div>
  );
}
