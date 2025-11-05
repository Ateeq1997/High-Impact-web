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

      {/* ✅ Hide WhatsApp + Get a Quote bar in admin pages */}
      {!isAdminRoute && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[100%] max-w-[1770px] flex items-center justify-between px-2 z-[9999]">
          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/92312345678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="sm:w-[26px] sm:h-[26px]"
            >
              <path d="M13.601 2.326A7.857 7.857 0 0 0 8.002 0C3.584 0 .002 3.582.002 8c0 1.411.37 2.787 1.075 4.002L0 16l4.111-1.062A7.964 7.964 0 0 0 8.002 16c4.418 0 8-3.582 8-8 0-2.134-.83-4.142-2.399-5.674Zm-5.6 12.672a6.627 6.627 0 0 1-3.383-.924l-.243-.144-2.44.63.651-2.381-.158-.245A6.623 6.623 0 0 1 1.373 8c0-3.652 2.975-6.627 6.627-6.627 1.77 0 3.433.69 4.686 1.943a6.588 6.588 0 0 1 1.94 4.684c0 3.652-2.975 6.627-6.626 6.627ZM11.153 9.5c-.192-.096-1.13-.558-1.305-.622-.175-.065-.302-.096-.43.096-.128.192-.494.622-.605.75-.112.128-.224.144-.416.048-.192-.096-.81-.298-1.542-.95-.57-.508-.955-1.134-1.067-1.326-.112-.192-.012-.296.084-.392.087-.086.192-.224.288-.336.096-.112.128-.192.192-.32.064-.128.032-.24-.016-.336-.048-.096-.43-1.037-.589-1.421-.155-.372-.312-.322-.43-.328h-.37c-.128 0-.336.048-.512.24-.176.192-.672.658-.672 1.606s.688 1.856.784 1.984c.096.128 1.352 2.064 3.28 2.894 1.928.83 1.928.554 2.276.52.349-.032 1.13-.46 1.29-.904.16-.445.16-.826.112-.904-.048-.08-.176-.128-.368-.224Z" />
            </svg>
          </a>

          {/* Get a Quote Button */}
          <Link
            href="/Contact-us"
            className="font-semibold text-[14px] sm:text-[14px] px-3 sm:px-3 py-2.5 sm:py-3 transition-all duration-300 hover:scale-105 text-[#4848FF] border-2 border-[#4848FF] dark:text-white dark:border-[#FFFFFF20] rounded-lg bg-transparent"
          >
            Get a Quote
          </Link>
        </div>
      )}

      {/* ✅ Hide Footer in admin pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}
