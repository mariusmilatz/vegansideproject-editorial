import Link from "next/link"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand-mark">Vegan Side Project</Link>
            <nav className="site-nav">
              <Link href="/">Home</Link>
              <Link href="/recipes">Recipes</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
