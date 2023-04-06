import slugify from 'slugify';

export const getSlug = (text: string) => slugify(text).toLowerCase(); 