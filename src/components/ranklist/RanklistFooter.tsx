interface RanklistFooterProps {
  authorText: string;
  lastUpdateTime: string;
  organizationName: string;
  totalUsers: number;
}

export function RanklistFooter({
  authorText,
  lastUpdateTime,
  organizationName,
  totalUsers,
}: RanklistFooterProps) {
  return (
    <footer className="relative mt-16 border-t border-border pt-8 pb-6 text-center text-sm text-text-light before:absolute before:-top-0.5 before:left-1/2 before:h-0.5 before:w-24 before:-translate-x-1/2 before:bg-gradient-to-r before:from-transparent before:via-primary-light before:to-transparent before:content-['']">
      <p>数据来源: Codeforces API</p>
      <p className="my-2">最后更新于: {lastUpdateTime}</p>
      <p className="mt-4 text-xs">
        总用户数量: {totalUsers} | {organizationName}
      </p>
      <p className="mt-4 text-xs">{authorText}</p>
      <p className="mt-4 text-xs">Built with: Next.js, Tailwind CSS, Cloudflare R2</p>
    </footer>
  );
}
