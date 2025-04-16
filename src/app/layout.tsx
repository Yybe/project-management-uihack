import type { Metadata } from "next";
import { Inter, Space_Grotesk, Nunito_Sans, Poppins } from "next/font/google";
import "./globals.css";
import "./transitions.css";
import "./animations.css";
import { ThemeProvider } from "../../components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const nunito = Nunito_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  adjustFontFallback: false,
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskVerse - Modern Project Management",
  description: "A modern project management application with Kanban-style boards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`light-theme ${inter.variable} ${spaceGrotesk.variable} ${nunito.variable} ${poppins.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const theme = localStorage.getItem('taskverse_theme') || 'light';
                if (theme === 'light' && document && document.documentElement) {
                  document.documentElement.classList.add('light-theme');
                  if (document.body) {
                    document.body.classList.add('light-theme');
                  }
                }
                console.log('Theme script executed, applied theme:', theme);
              } catch (e) {
                console.error('Error in theme script:', e);
              }
            })()
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root.light-theme, html.light-theme, body.light-theme {
              --color-bg-primary: #ffffff !important;
              --color-bg-primary-rgb: 255, 255, 255 !important;
              --color-bg-secondary: #f8f6f2 !important;
              --color-bg-secondary-rgb: 248, 246, 242 !important;
              --color-bg-tertiary: #e8e5dd !important;
              --color-bg-tertiary-rgb: 232, 229, 221 !important;
              --color-text-primary: #3a3a4a !important;
              --color-text-secondary: #6e6e82 !important;
              --color-border: #c9c0b2 !important;
              --color-border-rgb: 201, 192, 178 !important;
              --color-card: #f8f6f2 !important;
              --color-card-rgb: 248, 246, 242 !important;
              --color-card-hover: #f5f2ec !important;
              --color-accent: #7b83c9 !important;
              --color-accent-rgb: 123, 131, 201 !important;
              --color-accent-hover: #6a73b8 !important;
              --color-accent-secondary: #ffb88c !important;
              --color-accent-tertiary: #a5d8ce !important;
              --color-status-todo: #8e97b7 !important;
              --color-status-in-progress: #ffb88c !important;
              --color-status-review: #c4a8ff !important;
              --color-status-done: #a5d8ce !important;
              --color-priority-high: #ff9f9f !important;
              --color-priority-medium: #ffcf86 !important;
              --color-priority-low: #a5d8ce !important;
              --gradient-primary: linear-gradient(135deg, #7b83c9 0%, #a5b0ff 100%) !important;
              --gradient-secondary: linear-gradient(135deg, #ffb88c 0%, #ffd8b8 100%) !important;
              --gradient-accent: linear-gradient(135deg, #ffcf86 0%, #ffe0b0 100%) !important;
              --gradient-success: linear-gradient(135deg, #a5d8ce 0%, #c4e7e0 100%) !important;
            }

            :root:not(.light-theme), html:not(.light-theme), body:not(.light-theme) {
              --color-bg-primary: #000000 !important;
              --color-bg-primary-rgb: 0, 0, 0 !important;
              --color-bg-secondary: #242444 !important;
              --color-bg-secondary-rgb: 36, 36, 68 !important;
              --color-bg-tertiary: #363663 !important;
              --color-bg-tertiary-rgb: 54, 54, 99 !important;
              --color-text-primary: #e6e6fa !important;
              --color-text-secondary: #b8b8d1 !important;
              --color-border: #363663 !important;
              --color-border-rgb: 54, 54, 99 !important;
              --color-card: #242444 !important;
              --color-card-rgb: 36, 36, 68 !important;
              --color-card-hover: #2e2e56 !important;
              --color-accent: #7b83c9 !important;
              --color-accent-rgb: 123, 131, 201 !important;
              --color-accent-hover: #6a73b8 !important;
              --color-accent-secondary: #ffb88c !important;
              --color-accent-tertiary: #a5d8ce !important;
              --color-status-todo: #8e97b7 !important;
              --color-status-in-progress: #ffb88c !important;
              --color-status-review: #c4a8ff !important;
              --color-status-done: #a5d8ce !important;
              --color-priority-high: #ff9f9f !important;
              --color-priority-medium: #ffcf86 !important;
              --color-priority-low: #a5d8ce !important;
              --gradient-primary: linear-gradient(135deg, #7b83c9 0%, #a5b0ff 100%) !important;
              --gradient-secondary: linear-gradient(135deg, #ffb88c 0%, #ffd8b8 100%) !important;
              --gradient-accent: linear-gradient(135deg, #ffcf86 0%, #ffe0b0 100%) !important;
              --gradient-success: linear-gradient(135deg, #a5d8ce 0%, #c4e7e0 100%) !important;
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${nunito.variable} ${poppins.variable} antialiased light-theme`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
