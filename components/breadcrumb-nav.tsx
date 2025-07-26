"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function BreadcrumbNav() {
  const pathname = usePathname()

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs = [{ label: "Home", href: "/" }]

    if (paths.includes("unity-developer")) {
      breadcrumbs.push({ label: "Unity Developer", href: "/unity-developer" })
    } else if (paths.includes("game-designer")) {
      breadcrumbs.push({ label: "Game Designer", href: "/game-designer" })
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  if (breadcrumbs.length <= 1) return null

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-6">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 text-[#F4F4F5]/40 mx-2" />}
            {index === 0 && <Home className="w-4 h-4 mr-2 text-[#F4F4F5]/60" />}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-[#7EE787] font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-[#F4F4F5]/60 hover:text-[#7EE787] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10] rounded px-1"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
