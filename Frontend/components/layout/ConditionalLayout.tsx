'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Hide header/footer on admin pages
  const isAdminRoute = pathname?.startsWith('/admin');

  // Hide footer on chatbot page
const hideFooterRoutes = ['/chatbot'];  // <-- correct route
const hideFooter = hideFooterRoutes.includes(pathname);

  return (
    <>
      {/* Hide header only for admin */}
      {!isAdminRoute && <Header />}

      {children}

      {/* Hide footer on admin + chatbot */}
      {!isAdminRoute && !hideFooter && <Footer />}
    </>
  );
}
