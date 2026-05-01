import type { ReactNode } from 'react';
import UserTable from '../components/UserTable';
import {
  AUTHOR_TEXT,
  ORGANIZATION_NAME,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from '../config/ranklist';
import { useRanklistData } from '../hooks/useRanklistData';
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

function StatusCard({ children }: { children: ReactNode }) {
  return (
    <div className="status-card text-center py-16 mt-12">
      {children}
    </div>
  );
}

export default function Home() {
  const { users, lastUpdateTime, isLoading, error } = useRanklistData();

  const footerSection = (
    <footer className="ranklist-footer mt-16 text-center text-sm text-text-light border-t border-border pt-8 pb-6">
      <p>数据来源: Codeforces API</p>
      <p className="my-2">最后更新于: {lastUpdateTime}</p>
      <p className="text-xs mt-4">
        总用户数量: {users.length} | {ORGANIZATION_NAME}
      </p>
      <p className="text-xs mt-4">
        {AUTHOR_TEXT}
      </p>
      <p className="text-xs mt-4">
        Built with: Next.js, Tailwind CSS, Cloudflare R2
      </p>
    </footer>
  );

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${inter.className} min-h-screen flex flex-col`}>
        <main className="ranklist-container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow max-w-7xl overflow-hidden">
          <div className="mb-24 text-center">
            <h1 className="ranklist-title text-4xl sm:text-5xl font-bold mb-4">{SITE_TITLE}</h1>
          </div>

          {isLoading ? (
            <StatusCard>
              <p className="text-xl">数据加载中...</p>
            </StatusCard>
          ) : error ? (
            <StatusCard>
              <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
              <p className="mt-4 text-text-light">如果问题持续存在，请联系管理员</p>
            </StatusCard>
          ) : users.length > 0 ? (
            <div className="overflow-x-auto">
              <UserTable initialUsers={users} />
            </div>
          ) : (
            <StatusCard>
              <p className="text-xl text-red-600 dark:text-red-400">没有找到用户数据</p>
              <p className="mt-4 text-text-light">如果问题持续存在，请联系管理员</p>
            </StatusCard>
          )}

          {footerSection}
        </main>
      </div>
    </>
  );
}
