import { ThemeProvider } from '@/context/ThemeContext'
import './globals.css'

export const metadata = {
  title: 'CKA Lagos Directory',
  description: 'Curated Lagos business directory',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
