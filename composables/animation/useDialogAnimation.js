import gsap from 'gsap';

export default function useDialogAnimation() {
  function enter(el, done) {
    const dialog = el.querySelector('.dialog');

    const tl = gsap.timeline({});

    tl.to(el, {
      display: 'flex',
      opacity: 1,
      // yPercent: 0,
      duration: 0.35,
      // onComplete: done,
      pointerEvents: 'all',
    }).to(dialog, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      onComplete: done,
    });
  }

  function leave(el, done) {
    const dialog = el.querySelector('.dialog');

    const tl = gsap.timeline({});

    tl.to(dialog, {
      yPercent: -50,
      opacity: 0,
      duration: 0.75,
    }).to(el, {
      display: 'none',
      opacity: 0,
      // yPercent: 0,
      duration: 0.35,
      // onComplete: done,
      pointerEvents: 'none',
      onComplete: done,
    });
  }

  return {
    enter,
    leave,
  };
}
