import gsap from 'gsap'

export default function useTransiton(currentPins) {
  function beforeEnter(el) {
    gsap.set(el, {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: '0 0',
      translateX: currentPins.value.location?.translateX,
      translateY: currentPins.value.location?.translateY,
      opacity: 0
    })
  }

  function enter(el, done) {
    gsap.to(el, {
      scaleX: 1,
      scaleY: 1,
      translateX: 0,
      translateY: 0,
      opacity: 1,
      duration: 0.3,
      onComplete: done
    })
  }

  function leave(el, done) {
    gsap.to(el, {
      scaleX: 0,
      scaleY: 0,
      translateX: currentPins.value.location?.translateX,
      translateY: currentPins.value.location?.translateY,
      opacity: 0,
      duration: 0.3,
      onComplete: done
    })
  }

  return { beforeEnter, enter, leave }
}
