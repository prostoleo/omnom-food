// import { useStoryblokApi } from '@storyblok/nuxt-2';
import StoryblokClient from 'storyblok-js-client';

export const dynamicRoutes = async () => {
  const Storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_KEY,
  });

  const resForCategories = await Storyblok.get(`cdn/stories`, {
    version: 'published',
    starts_with: 'categories/',
    excluding_fields: 'products',
  }).then((res) => res.data);
  // console.log('resForCategories: ', resForCategories);

  const routesForCategories = resForCategories.stories.map((story) => {
    return {
      route: `/${story.full_slug}`,
      payload: story,
    };
  });
  // console.log('routesForCategories: ', routesForCategories);

  const routes = [...routesForCategories];

  return routes;
};
