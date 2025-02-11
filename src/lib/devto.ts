export interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  public_reactions_count: number;
  comments_count: number;
}

export async function fetchDevToArticles(username: string): Promise<Article[]> {
  const response = await fetch(`https://dev.to/api/articles?username=${username}`);
  return response.json();
}