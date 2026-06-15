export type CategorySlug = string

export type SubcategorySlug = string

export interface Subcategory {
  slug: SubcategorySlug
  label: string
  parent: CategorySlug
  description: string
}

export interface Category {
  slug: CategorySlug
  label: string
  description: string
  icon: string
  color: string
  count?: number
  subcategories: Subcategory[]
}
