import ConditionalLayout from '@/components/layout/ConditionalLayout';


import Head from 'next/head';
import './globals.css';




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
      <body className={`tracking-wider font-bai`}>
        <main className="w-full bg-white dark:bg-black">
          <div className='max-w-[1750px] mx-auto'>
          <Head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
          </Head>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
     

          </div>
        </main>
      </body>
    </html>
  );
}
