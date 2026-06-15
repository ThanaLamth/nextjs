import { getHeaderCategories } from '@/lib/categories.server'
import { HeaderClient } from '@/components/layout/HeaderClient'

export async function Header() {
  const categories = await getHeaderCategories()
  const navItems = categories.map((category) => ({
    label: category.label,
    href: `/${category.slug}`,
  }))

  return <HeaderClient navItems={navItems} />
}
