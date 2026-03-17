
import { StoryProject } from '../constants';

const SUBSTACK_URL = 'https://askandrew.substack.com';
const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';

export const fetchSubstackPosts = async (): Promise<StoryProject[]> => {
  try {
    const response = await fetch(`${RSS_TO_JSON_API}${SUBSTACK_URL}/feed`);
    if (!response.ok) throw new Error('Failed to fetch Substack feed');
    
    const data = await response.json();
    
    if (data.status !== 'ok') return [];

    return data.items.map((item: any, index: number): StoryProject => {
      // Clean up description
      const plainText = item.description.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';
      
      // Use thumbnail if available, otherwise try to find an image in the content
      let imageUrl = item.thumbnail;
      if (!imageUrl && item.content) {
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) imageUrl = imgMatch[1];
      }
      
      // If still no image, use the thum.io link for the specific post
      if (!imageUrl) {
        imageUrl = `https://image.thum.io/get/width/800/crop/600/${item.link}`;
      }
      
      return {
        id: `substack-${index}`,
        title: item.title,
        description: plainText,
        question: `Insight from AskAndrew: "${item.title}"`,
        category: 'Data',
        tags: ['Substack', 'Strategy', 'Writing'],
        link: item.link,
        imageUrl: imageUrl,
        color: 'from-orange-500 to-rose-500',
        source: 'manual'
      };
    });
  } catch (error) {
    console.error('Error fetching Substack posts:', error);
    return [];
  }
};
