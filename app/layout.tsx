import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '赵珊珊 | Product, AI & Creative Technology',
  description: '赵珊珊的产品、AI 工作流与 Web 创意技术作品集。',
  openGraph: {
    title: '赵珊珊 | Product · AI · Creative Technology',
    description: '从真实问题出发，做出可以使用、测试和迭代的产品。',
    images: ['https://zhaoshanshan-portfolio.s67587698.chatgpt.site/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '赵珊珊 | Product · AI · Creative Technology',
    description: '从真实问题出发，做出可以使用、测试和迭代的产品。',
    images: ['https://zhaoshanshan-portfolio.s67587698.chatgpt.site/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
