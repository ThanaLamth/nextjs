import "server-only";

const DEFAULT_SITE_URL = "https://coinlineup.com";
const DEFAULT_API_BASE_URL = `${DEFAULT_SITE_URL}/wp-json/wp/v2`;

interface WordPressAuthUser {
  id: number;
  name: string;
  slug: string;
  link: string;
}

function getWordPressApiBaseUrl(): string {
  return process.env.WORDPRESS_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

function getWordPressApiUsername(): string | undefined {
  return process.env.WORDPRESS_API_USERNAME?.trim() || undefined;
}

function getWordPressApiAppPassword(): string | undefined {
  return process.env.WORDPRESS_API_APP_PASSWORD?.trim() || undefined;
}

function apiUrl(pathname: string): URL {
  const base = getWordPressApiBaseUrl().replace(/\/+$/, "");
  return new URL(`${base}/${pathname.replace(/^\/+/, "")}`);
}

export function hasWordPressAuthenticatedApi(): boolean {
  return Boolean(getWordPressApiUsername() && getWordPressApiAppPassword());
}

function getWordPressBasicAuthHeader(): string {
  const username = getWordPressApiUsername();
  const appPassword = getWordPressApiAppPassword();

  if (!username || !appPassword) {
    throw new Error(
      "Missing WordPress authenticated API credentials. Set WORDPRESS_API_USERNAME and WORDPRESS_API_APP_PASSWORD."
    );
  }

  const token = Buffer.from(`${username}:${appPassword}`, "utf8").toString("base64");
  return `Basic ${token}`;
}

export async function fetchWordPressAuthenticatedJson<T>(
  pathname: string,
  searchParams: Record<string, string | number | boolean | undefined> = {}
): Promise<T> {
  const url = apiUrl(pathname);

  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      Authorization: getWordPressBasicAuthHeader(),
    },
  });

  if (!response.ok) {
    throw new Error(`Authenticated WordPress request failed for ${url.pathname}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getAuthenticatedWordPressUser(): Promise<WordPressAuthUser> {
  return fetchWordPressAuthenticatedJson<WordPressAuthUser>("users/me");
}
