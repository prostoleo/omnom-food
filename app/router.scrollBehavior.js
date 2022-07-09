export default async function (to, _, savedPosition) {
  // eslint-disable-next-line require-await
  const findEl = async (hash, x) => {
    return (
      // document.querySelector(`.${hash}`) ||
      document.getElementById(`${hash}`) ||
      new Promise((resolve) => {
        if (x > 50) {
          return resolve();
        }
        setTimeout(() => {
          resolve(findEl(hash, ++x || 1));
        }, 100);
      })
    );
  };

  if (to.hash) {
    // console.log('to.hash: ', to.hash);
    const el = await findEl(to.hash.slice(1));

    const mainHeaderEl = document.querySelector('[main-header]');
    // console.log('mainHeaderEl: ', mainHeaderEl);

    const yCoord = el.offsetTop - mainHeaderEl.getBoundingClientRect().height;

    if ('scrollBehavior' in document.documentElement.style) {
      return window.scrollTo({ top: yCoord, behavior: 'smooth' });
    } else {
      return window.scrollTo(0, yCoord);
    }
  }

  if (savedPosition) {
    return savedPosition;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0, behavior: 'smooth' });
    }, 700);
  });
}
