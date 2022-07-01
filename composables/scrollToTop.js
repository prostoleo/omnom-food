import { onMounted, onUnmounted, ref } from '@nuxtjs/composition-api';
import throttle from '~/utils/throttle.js';

export default function useScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const showScrollToTop = ref(false);
  const innerHeight = ref(null);

  const handleShowScrollToTop = () => {
    const scrollY = window.scrollY;

    if (scrollY < innerHeight.value / 1.75) {
      showScrollToTop.value = false;
      return;
    }

    if (scrollY >= innerHeight.value / 1.75) {
      showScrollToTop.value = true;
    }
  };

  onMounted(() => {
    innerHeight.value = window.innerHeight;

    window.addEventListener('scroll', throttle(handleShowScrollToTop, 150));
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleShowScrollToTop);
  });

  return {
    scrollToTop,
    showScrollToTop,
    innerHeight,
    handleShowScrollToTop,
  };
}
