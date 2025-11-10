'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // ✅ Detect admin routes
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {/* ✅ Hide Header in admin pages */}
      {!isAdminRoute && <Header />}

      {children}

     

      {/* ✅ Hide Footer in admin pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}
