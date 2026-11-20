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

function getCleanPath() {
  // If user arrives via legacy hash (e.g. #/collections or #/product/...)
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    const clean = window.location.hash.slice(1);
    window.history.replaceState(null, '', clean);
    return clean;
  }
  return window.location.pathname + window.location.search;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(getCleanPath);

  useEffect(() => {
    // Listen for browser back / forward buttons
    const handlePopState = () => {
      setCurrentPath(getCleanPath());
      window.scrollTo(0, 0);
    };

    // Global internal link interceptor for seamless SPA routing without #
    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external URLs, tel, mailto, whatsapp, target="_blank", or modifier keys
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        anchor.target === '_blank' ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
      ) {
        return;
      }

      // Check if it's an internal application route
      if (href.startsWith('/') || href.startsWith('#/')) {
        e.preventDefault();
        const cleanHref = href.startsWith('#/') ? href.slice(1) : href;
        if (cleanHref !== window.location.pathname + window.location.search) {
          window.history.pushState(null, '', cleanHref);
          setCurrentPath(cleanHref);
          window.scrollTo(0, 0);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  // HTML5 History API Path Router
  const renderCurrentPage = () => {
    const pathWithoutQuery = (currentPath.split('?')[0] || '/').toLowerCase();

    if (pathWithoutQuery === '/' || pathWithoutQuery === '') {
      return <HomePage />;
    }
    if (pathWithoutQuery.startsWith('/collections')) {
      return <CollectionPage />;
    }
    if (pathWithoutQuery.startsWith('/product/')) {
      // Preserve exact case for product slug
      const originalPath = currentPath.split('?')[0] || '';
      const slug = originalPath.replace(/^\/product\//i, '').trim();
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
      <Header currentPath={currentPath} />

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
