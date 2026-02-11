# BgGone — remove.bg Alternative

> 竞品 Spec，由 competitor-analyzer 自动生成

## 竞品分析

| 项目 | 值 |
|------|-----|
| 竞品 | remove.bg |
| URL | https://www.remove.bg |
| 预估月流量 | 50M+ |
| 定价 | Freemium（免费版 500px 限制，€9/月 40 credits） |
| 目标用户 | 电商卖家、设计师、社交媒体创作者 |

## 核心功能（我们要做的）

### 必做（Core）
1. **AI 背景移除** — 一键移除图片背景，输出透明 PNG
2. **高分辨率输出** — 无分辨率限制（这是我们的核心差异化）
3. **批量处理** — 支持多图同时处理

### 可选（Nice to have）
4. **背景替换** — 移除后换纯色/渐变/自定义图片背景
5. **边缘优化** — 头发、毛发等细节边缘处理

## 差异化定位

我们的优势：
- ✅ **免费高分辨率**（remove.bg 免费版限 500px）
- ✅ **无需注册**（remove.bg 需要账号）
- ✅ **每日更多免费次数**（remove.bg 免费 1 次/天）
- ✅ **更便宜的付费方案**（目标 $5/月 unlimited 或按次 $0.05/张）

## 用户痛点（我们要解决的）

| 痛点 | 来源 | 频率 | 我们的方案 |
|------|------|------|-----------|
| 免费版只有 500px，太小无法使用 | Reddit r/EtsySellers | 高 | 免费版支持原图分辨率 |
| 每天只能免费用 1 次 | G2 Reviews | 高 | 免费 5 次/天 |
| 付费太贵（€9/月 40 credits） | Reddit 多处 | 高 | $5/月 unlimited 或 $0.05/张 |
| 需要注册才能使用 | Reddit | 中 | 无需注册，device ID 追踪 |
| 俄罗斯地区被封 | Reddit r/graphic_design | 低 | 无地区限制 |

## 截流关键词（🔴 SEO 必用）

### Primary（首页 Title/H1）
- `remove.bg alternative`
- `remove.bg free`
- `free background remover`

### Secondary（独立页面）
- `remove.bg vs erase.bg`
- `remove.bg vs photoroom`
- `best remove.bg alternatives 2026`
- `remove.bg alternative free full resolution`

### Long-tail（Programmatic SEO）
- `remove.bg alternative no watermark`
- `remove.bg alternative no signup`
- `remove.bg alternative high resolution`
- `remove.bg alternative for etsy`
- `remove.bg alternative for shopify`
- `free background remover hd`
- `ai background remover free unlimited`

## 技术方案

- 前端：React + Vite (TypeScript)
- 后端：Python FastAPI
- AI 模型：rembg（开源）或 llm-proxy 图像模型
- 部署：Docker → langsheng
- 域名：`bggone.demo.densematrix.ai`

## 完成标准

- [ ] 核心功能：上传图片 → AI 移除背景 → 下载透明 PNG
- [ ] 免费版支持原图分辨率（vs remove.bg 500px 限制）
- [ ] 每设备免费 5 次/天
- [ ] SEO 截流关键词已覆盖（Title、H1、comparison section）
- [ ] 部署到 bggone.demo.densematrix.ai
- [ ] Health check 通过
