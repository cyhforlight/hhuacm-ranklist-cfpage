# Codeforces 排行榜页面

一个使用 Next.js 和 Tailwind CSS 构建的 Codeforces 排行榜页面，可以展示团队/组织成员在 Codeforces 平台上的竞赛表现和评级变化。

## 项目概述

这个项目创建了一个静态网页，展示成员的 Codeforces 用户信息，包括：

- 当前 rating 和颜色标识
- 最近参与的比赛和rating变化
- 最近活跃时间
- 排名统计

数据通过 Cloudflare R2 或其他静态存储获取，页面支持响应式设计，适配各种设备尺寸。

## 在线演示

访问[河海大学ACM队 Codeforces 排行榜](https://cfrank.forlight.top)查看演示效果。

## 技术栈

- **前端框架**: Next.js 15.x (Static HTML Export)
- **样式**: Tailwind CSS 4.x
- **包管理**: pnpm
- **部署**: Cloudflare Pages

## 快速开始

### 本地开发

1. 克隆项目
```bash
git clone https://github.com/yourusername/hhuacm-ranklist-cfpage.git
cd hhuacm-ranklist-cfpage
```

2. 安装依赖
```bash
pnpm install
```

（开发者使用的是 Node.js v22.14.0，未验证过其他 JS 环境的可用性）。

3. 创建环境变量文件
创建 `.env.local` 文件，添加数据源URL：
```
DATA_URL=https://your-data-source-url.com/data.json
```

4. 启动开发服务器
```bash
pnpm dev
```

5. 在浏览器打开 [http://localhost:3000](http://localhost:3000)

### 项目构建

```bash
pnpm build
```

构建完成后，静态文件将输出到 `out` 目录。

## 二次定制指南

### 1. 修改组织信息

主要需要修改以下文件：

- `src/pages/index.tsx`：
  - 修改页面标题、说明和页脚中的组织名称
  - 修改元数据中的描述信息

```jsx
// 修改标题
<h1 className="text-4xl sm:text-5xl font-bold mb-4">你的组织名称 Codeforces 排行榜</h1>

// 修改页脚
<p className="text-xs mt-4">
  总用户数量: {users.length} | 你的组织名称
</p>

// 修改作者信息
<p className="text-xs mt-4">
  Written by YourName in 2024
</p>

// 修改元数据
<Head>
  <title>你的组织名称 Codeforces 排行榜</title>
  <meta name="description" content="你的组织名称成员在Codeforces的表现" />
  ...
</Head>
```

### 2. 配置数据源

本项目需要一个提供用户数据的JSON数据源。你有两种选择：

#### 选项1：使用现有的数据源

在 `.env.local` 中设置：
```
DATA_URL=https://your-data-source-url.com/data.json
```

#### 选项2：创建自己的数据源

1. 创建一个符合以下格式的JSON文件：

```json
[
  {
    "handle": "user1",
    "rating": 1500,
    "maxRating": 1600,
    "rank": "specialist",
    "maxRank": "expert",
    "lastActivityTime": 1634567890,
    "registrationTime": 1534567890,
    "lastContestTime": 1634567890,
    "lastRatingChange": 25
  },
  // 更多用户...
]
```

2. 将此文件上传到公开可访问的存储服务（如Cloudflare R2, AWS S3, GitHub等）

3. 将数据源URL更新到 `.env.local` 文件中

（提示：由于代码历史原因，暂不清楚代码的数据加载源究竟是环境变量，还是被写死在网页代码中，建议二次使用者顺便在代码里面搜索有关于 `data.json` 的相关部分，随后将链接替换为自己的将数据源URL）。

### 3. 自定义表格显示

如果要修改表格显示的字段或排序规则，编辑 `src/components/UserTable.tsx`：

- 添加或删除列
- 修改排序逻辑
- 自定义单元格渲染样式

### 4. 修改样式和主题

项目使用 Tailwind CSS，主要样式定义在：

- `src/styles/globals.css` - 全局样式定义
- `tailwind.config.ts` - 颜色主题、字体和其他Tailwind配置

你可以根据你的组织色彩修改这些文件。

## 部署指南

### Cloudflare Pages 部署

1. **Fork或上传代码到GitHub仓库**

2. **登录Cloudflare Dashboard**
   - 进入Pages服务
   - 点击"创建项目"
   - 连接你的GitHub账户并选择仓库

3. **配置构建设置**：
   - 框架预设：Next.js (Static HTML Export)
   - 构建命令：`npx next build`
   - 构建输出目录：`out`
   - 勾选"启用构建注释"选项

4. **环境变量配置**：
   添加两个环境变量：
   - `DATA_URL` = 你的数据源URL
   - `NODE_VERSION` = 22.14.0

5. **保存并部署**

6. **自定义域名**（可选）
   - 在项目设置中添加自定义域名
   - 按照Cloudflare指导完成DNS配置

### 手动部署到任何静态托管服务

1. 本地运行构建命令：
```bash
pnpm build
```

2. 将 `out` 目录中的内容上传到任何静态文件托管服务，如：
   - GitHub Pages
   - Vercel
   - Netlify
   - 任何支持静态网站托管的服务器

## 常见问题和注意事项

1. **数据更新频率**：
   - 这是一个静态网站，数据只在数据源JSON文件更新时更新
   - 如需实时数据，需要设置定时任务更新数据源JSON

2. **API限制考虑**：
   - 如果你编写脚本从Codeforces API获取数据更新JSON文件，请注意Codeforces API的使用限制
   - 建议使用延时和错误重试机制

3. **浏览器兼容性**：
   - 本项目使用现代JavaScript特性，支持最新版本的主流浏览器
   - 不支持IE11等旧版浏览器

4. **大数据集性能**：
   - 对于超过500人的大型组织，可能需要优化表格渲染和排序逻辑
   - 考虑实现分页或虚拟滚动

## 贡献指南

欢迎提交Pull Request和Issue！

1. Fork本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个Pull Request

## 许可证

本项目采用MIT许可证。

## 鸣谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Codeforces API](https://codeforces.com/apiHelp)