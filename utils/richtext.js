import { useStoryblokApi } from '@storyblok/nuxt-2';

export function richtext(text) {
  const storyApi = useStoryblokApi();
  // console.log('storyApi: ', storyApi);
  return storyApi.richTextResolver.render(text);

  /* const richtextFunc = (text) => {
  };

  return richtextFunc; */
}
