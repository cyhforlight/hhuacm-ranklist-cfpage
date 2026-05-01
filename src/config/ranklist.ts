export const FALLBACK_DATA_URL = 'https://pub-aa454a05f68f49118cd8c7076f215be8.r2.dev/data.json';

export const DATA_URL = process.env.NEXT_PUBLIC_DATA_URL?.trim() || FALLBACK_DATA_URL;

export const ORGANIZATION_NAME = '河海大学 ACM 队';
export const SITE_TITLE = '河海大学ACM队 Codeforces 排行榜';
export const SITE_DESCRIPTION = '河海大学ACM队成员在Codeforces的表现';
export const AUTHOR_TEXT = 'Written by ForLight in 2025';

export const INITIAL_DISPLAY_LIMIT = 50;
export const DISPLAY_INCREMENT = 50;
