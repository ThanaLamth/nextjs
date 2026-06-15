import type { Metadata } from 'next'
import type { Article } from '@/types/article'
import { SITE_URL, SITE_NAME, TWITTER_HANDLE } from './constants'

function toAbsoluteUrl(value: string): string {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

export function generateArticleMetadata(article: Article): Metadata {
  const title = article.seo?.title || `${article.title} | ${SITE_NAME}`
  const description = article.description
  const url = `${SITE_URL}${article.href}`
  const ogImage = toAbsoluteUrl(article.coverImage)

  return {
    title,
    description,
    keywords: article.seo?.keywords,
    authors: [{ name: article.author.name }],
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
    alternates: { canonical: article.seo?.canonicalUrl || url },
    robots: { index: !article.sponsored, follow: true },
  }
}
