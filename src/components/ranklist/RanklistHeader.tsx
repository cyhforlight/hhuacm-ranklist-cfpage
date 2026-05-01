interface RanklistHeaderProps {
  title: string;
}

export function RanklistHeader({ title }: RanklistHeaderProps) {
  return (
    <header className="mb-10 text-center sm:mb-12">
      <h1 className="bg-gradient-to-br from-primary-dark to-primary-light bg-clip-text text-4xl font-bold tracking-normal text-transparent sm:text-5xl">
        {title}
      </h1>
    </header>
  );
}
