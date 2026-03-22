import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vegan Side Project Editorial",
  description: "An editorial recipe archive powered by Notion.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand-mark">
              Vegan Side Project
            </Link>
            <nav className="site-nav">
              <Link href="/recipes">Recipes</Link>
              <a href="#journal">Journal</a>
              <a href="#meal-plans">Meal Plans</a>
              <a href="#tips">Tips</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
