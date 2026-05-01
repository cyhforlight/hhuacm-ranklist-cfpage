# Codeforces 排行榜页面

河海大学 ACM 队 Codeforces 排行榜前端。项目使用 Next.js Pages Router 静态导出，页面在浏览器端从 JSON 数据源拉取队员信息，并提供年级筛选、字段排序、Codeforces 账号跳转、最近活跃时间展示和暗色模式适配。

## 技术栈

- **框架**: Next.js 15.x, React 19, TypeScript
- **样式**: Tailwind CSS 4.x + CSS variables
- **包管理**: pnpm
- **部署**: Cloudflare Pages 或任意静态托管服务

## 本地开发

安装依赖：

```bash
pnpm install
```

创建 `.env.local` 并配置数据源：

```bash
NEXT_PUBLIC_DATA_URL=https://your-data-source-url.com/data.json
```

启动开发服务器：

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 常用脚本

```bash
pnpm dev        # 本地开发
pnpm lint       # ESLint 检查
pnpm typecheck  # TypeScript 类型检查
pnpm build      # 静态构建并导出
pnpm check      # 依次运行 lint、typecheck、build
```

构建产物输出到 `out` 目录。

## 数据源规范

页面读取 `NEXT_PUBLIC_DATA_URL` 指向的公开 JSON 文件；如果未配置，会退回到项目内置的只读 R2 数据源。

JSON 顶层必须是数组，每个元素表示一名队员：

```json
[
  {
    "name": "张三",
    "grade": "2024",
    "major": "计算机科学与技术",
    "CFHandle": "tourist",
    "CFinfo": {
      "handle": "tourist",
      "rating": 3900,
      "maxrating": 3900,
      "acceptedProblemCount": 3000,
      "acceptedProblemCountinMonth": 42,
      "lastOnlineTimeSeconds": 1714521600
    }
  }
]
```

字段说明：

- `name`、`grade`、`major`、`CFHandle` 为队员基础信息。
- `CFinfo.rating` 和 `CFinfo.maxrating` 用于展示 Codeforces rating 颜色。
- `acceptedProblemCount` 和 `acceptedProblemCountinMonth` 用于题量统计。
- `lastOnlineTimeSeconds` 是 Unix 秒级时间戳，用于最近活跃时间和 30 天未活跃标记。

当前代码会对异常数据做基础容错；规范数据仍应尽量提供完整字段。

## 二次定制

- 修改组织名、页面标题、作者信息：编辑 `src/config/ranklist.ts`。
- 修改数据源：在 `.env.local` 或 Cloudflare Pages 环境变量中设置 `NEXT_PUBLIC_DATA_URL`。
- 修改表格列、排序字段、展示逻辑：编辑 `src/components/UserTable.tsx` 和 `src/hooks/useRanklistTable.ts`。
- 修改主题色、表格、筛选器和状态卡片样式：编辑 `src/styles/globals.css`。

## 部署到 Cloudflare Pages

推荐配置：

- 框架预设：Next.js Static HTML Export
- 构建命令：`pnpm build`
- 构建输出目录：`out`
- Node 版本：`22.14.0`
- 环境变量：`NEXT_PUBLIC_DATA_URL=https://your-data-source-url.com/data.json`

也可以手动运行 `pnpm build`，然后将 `out` 目录上传到任意静态托管服务。

## 注意事项

- 页面本身是静态导出，但数据在浏览器端运行时获取；更新 JSON 文件后，用户刷新页面即可看到新数据。
- 如果数据源来自 Codeforces API 的定时任务，请在数据生成端处理 API 限制、重试和缓存。
- 对于超过数百人的数据集，可以继续引入分页、虚拟滚动或搜索框来优化浏览体验。

## 鸣谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Codeforces API](https://codeforces.com/apiHelp)
