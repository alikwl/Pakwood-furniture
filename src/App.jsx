import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileBottomBar from './components/MobileBottomBar';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';

// Pages
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CustomOrderPage from './pages/CustomOrderPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple, robust Hash Router
  const renderCurrentPage = () => {
    // Strip query parameters for routing path matching
    const rawPath = currentHash.replace(/^#/, '');
    const pathWithoutQuery = rawPath.split('?')[0] || '/';

    if (pathWithoutQuery === '/' || pathWithoutQuery === '') {
      return <HomePage />;
    }
    if (pathWithoutQuery.startsWith('/collections')) {
      return <CollectionPage />;
    }
    if (pathWithoutQuery.startsWith('/product/')) {
      const slug = pathWithoutQuery.replace('/product/', '').trim();
      return <ProductDetailPage slug={slug} />;
    }
    if (pathWithoutQuery.startsWith('/custom-orders')) {
      return <CustomOrderPage />;
    }
    if (pathWithoutQuery.startsWith('/about')) {
      return <AboutPage />;
    }
    if (pathWithoutQuery.startsWith('/contact')) {
      return <ContactPage />;
    }

    // Default fallback to HomePage
    return <HomePage />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1E1B18] font-sans antialiased">
      {/* Header */}
      <Header currentPath={currentHash} />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays and Floating Widgets */}
      <FloatingWhatsApp />
      <MobileBottomBar />
      <WishlistDrawer />
      <QuickViewModal />
      <SearchModal />
    </div>
  );
}
