import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "./components/demo-provider";
import { SiteFooter } from "./components/site-footer";
import { SiteNav } from "./components/site-nav";

export const metadata: Metadata = {
  title: { default: "Arcade Vault", template: "%s | Arcade Vault" },
  description: "Explore a neon arcade library, sample rankings, and CRT player previews.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <div className="av-bg" aria-hidden="true" />
        <div className="av-noise" aria-hidden="true" />
        <div id="root">
          <DemoProvider>
            <SiteNav />
            <main className="av-main" id="main-content">{children}</main>
            <SiteFooter />
          </DemoProvider>
        </div>
      </body>
    </html>
  );
}
