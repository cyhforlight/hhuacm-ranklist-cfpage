import UserTable from '../components/UserTable';
import { RanklistFooter } from '@/components/ranklist/RanklistFooter';
import { StatusCard } from '@/components/ui/StatusCard';
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
});

export default function Home() {
  const { users, lastUpdateTime, isLoading, error } = useRanklistData();

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${inter.className} min-h-screen flex flex-col`}>
        <main className="ranklist-container flex-grow overflow-hidden pb-10 pt-12 sm:pt-14">
          <header className="mb-10 text-center sm:mb-12">
            <h1 className="bg-gradient-to-br from-primary-dark to-primary-light bg-clip-text text-4xl font-bold tracking-normal text-transparent sm:text-5xl">
              {SITE_TITLE}
            </h1>
          </header>

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
            <UserTable initialUsers={users} />
          ) : (
            <StatusCard>
              <p className="text-xl text-red-600 dark:text-red-400">没有找到用户数据</p>
              <p className="mt-4 text-text-light">如果问题持续存在，请联系管理员</p>
            </StatusCard>
          )}

          <RanklistFooter
            authorText={AUTHOR_TEXT}
            lastUpdateTime={lastUpdateTime}
            organizationName={ORGANIZATION_NAME}
            totalUsers={users.length}
          />
        </main>
      </div>
    </>
  );
}
