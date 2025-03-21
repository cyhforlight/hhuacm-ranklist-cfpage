import { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import { User } from '../types';
import Head from 'next/head';
import { Inter } from 'next/font/google';

// 加载Inter字体
const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

// 主页面组件
export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('加载中...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // 数据URL
        const dataUrl = 'https://pub-aa454a05f68f49118cd8c7076f215be8.r2.dev/data.json';
        // 从指定URL获取数据
        const response = await fetch(dataUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        // 获取最后修改时间
        const lastModified = response.headers.get('last-modified');
        let updateTime = '';
        if (lastModified) {
          // 将HTTP日期格式转换为本地格式
          updateTime = new Date(lastModified).toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          });
        } else {
          // 如果无法获取最后修改时间，使用当前时间
          updateTime = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
        }

        const userData = await response.json();
        setUsers(userData);
        setLastUpdateTime(updateTime);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('数据获取失败');
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // 页脚信息
  const footerSection = (
    <footer className="mt-16 text-center text-sm text-text-light border-t border-border pt-8 pb-6">
      <p>数据来源: Codeforces API</p>
      <p className="my-2">最后更新于: {lastUpdateTime}</p>
      <p className="text-xs mt-4">
        总用户数量: {users.length} | 河海大学 ACM 队
      </p>
      <p className="text-xs mt-4">
        Written by ForLight in 2025
      </p>
      <p className="text-xs mt-4">
        Built with: Next.js, Tailwind CSS, Cloudflare R2
      </p>
    </footer>
  );

  return (
    <>
      <Head>
        <title>河海大学ACM队 Codeforces 排行榜</title>
        <meta name="description" content="河海大学ACM队成员在Codeforces的表现" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${inter.className} min-h-screen flex flex-col`}>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow max-w-7xl overflow-hidden">
          <div className="mb-24 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">河海大学ACM队 Codeforces 排行榜</h1>
          </div>

          {isLoading ? (
            <div className="tech-card text-center py-16 mt-12">
              <p className="text-xl">数据加载中...</p>
            </div>
          ) : error ? (
            <div className="tech-card text-center py-16 mt-12">
              <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
              <p className="mt-4 text-text-light">如果问题持续存在，请联系管理员</p>
            </div>
          ) : users.length > 0 ? (
            <div className="overflow-x-auto">
              <UserTable initialUsers={users} />
            </div>
          ) : (
            <div className="tech-card text-center py-16 mt-12">
              <p className="text-xl text-red-600 dark:text-red-400">没有找到用户数据</p>
              <p className="mt-4 text-text-light">如果问题持续存在，请联系管理员</p>
            </div>
          )}

          {footerSection}
        </main>
      </div>
    </>
  );
}
