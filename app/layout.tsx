import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '赵珊珊 | Product, AI & Creative Technology',
  description: '赵珊珊的产品、AI 工作流与 Web 创意技术作品集。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
