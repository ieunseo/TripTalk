import type { ReactNode } from "react";
import ApolloSetting from "@/components/providers/apollo-setting";
import "./globals.css";


type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        {/* 모든 페이지에서 Apollo를 쓸 수 있게 한 번만 감싸요. */}
        <ApolloSetting>{children}</ApolloSetting>
      </body>
    </html>
  );
}
