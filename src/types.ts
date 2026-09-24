export interface StoreOffer {
  id: string;
  storeName: string;
  storeCode: 'AMZ' | 'FK' | 'CROMA' | 'RELIANCE' | 'OTHER';
  storeColor: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  deliveryText?: string;
  badge?: string;
  affiliateUrl?: string;
  inStock: boolean;
  bankOffer?: string;
  storePickup?: boolean;
  rating?: number;
}

export interface PricePoint {
  date: string;
  price: number;
  label?: string;
}

export interface ProductSpec {
  name: string;
  value: string;
}

export interface DealScoreBreakdown {
  overallScore: number; // 0-100
  verdict: 'Excellent Deal' | 'Good Deal' | 'Fair Deal' | 'Overpriced';
  summary: string;
  historicalDiscountPct: number;
  lowestPriceIn90Days: number;
  averagePriceIn90Days: number;
  highestPriceIn90Days: number;
  shouldBuyNow: boolean;
  advice: string;
}

export interface Product {
  id: string;
  name: string;
  shortTitle: string;
  brand: string;
  category: 'smartphones' | 'laptops' | 'headphones' | 'tvs' | 'gaming' | 'fashion' | 'home';
  rating: number;
  reviewCount: number;
  currentLowestPrice: number;
  originalPrice: number;
  discountPercent: number;
  savingsAmount: number;
  isHotDeal?: boolean;
  isBestPriceFound?: boolean;
  priceDropAmount?: number;
  images: {
    main: string;
    front?: string;
    back?: string;
    side?: string;
    lifestyle?: string;
  };
  stores: StoreOffer[];
  priceHistory: {
    days7: PricePoint[];
    days30: PricePoint[];
    days90: PricePoint[];
    days365: PricePoint[];
  };
  dealScore: DealScoreBreakdown;
  specifications: ProductSpec[];
  offers: {
    id: string;
    bankName: string;
    discountText: string;
    description: string;
    icon: 'bank' | 'card' | 'coupon';
    code?: string;
  }[];
}

export interface CouponItem {
  id: string;
  store: string;
  storeCode: string;
  storeColor: string;
  title: string;
  description: string;
  code: string;
  minSpend?: number;
  expiryDate?: string;
}

export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productVariant?: string;
  targetPrice: number;
  currentPrice: number;
  initialPrice: number;
  emailNotify: boolean;
  pushNotify: boolean;
  createdAt: string;
  isWatching: boolean;
}

export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
  initialPrice: number;
  currentPrice: number;
  originalPrice: number;
  priceDropNote?: string;
}

export type ActiveTab = 'home' | 'search' | 'deals' | 'wishlist' | 'alerts';
