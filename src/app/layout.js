import { ThemeProvider } from '@/context/ThemeContext'
import { AdminProvider } from '@/context/AdminContext'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'CKA Visuals',
  description: 'Curated creative studio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#6E01F0" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var saved = localStorage.getItem('cka-theme');
                var preference = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', preference);
              } catch(e) {}
            })();
          `
        }} />
      </head>
      <body>
        <AdminProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
