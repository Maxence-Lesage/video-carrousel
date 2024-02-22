'use client';

import { useRef } from "react";
import styles from "./carousel.module.css";

export default function Carousel() {

  const ref = useRef();

  const max = 3;
  let count = 0, isAnimating = false;

  function transition(direction) {
    if (!isAnimating) {
      isAnimating = true;

      if (direction === "left") {
        count--;
        if (count < 0) count = max;

        //On téléporte de la première à la dernière image avant de réaliser la transition dans le cas où count vaut max
        if (count === max) {
          translate(true);
          count--;
          delayedTranslate(100);
        } else {
          translate();
        }
      }

      if (direction === "right") {
        count++;
        translate();
        //Si count vaut max alors après l'animation en cours on téléporte de la dernière à la première image
        if (count === max) {
          count = 0;
          delayedTranslate(1050, true);
        }
      }

      setTimeout(() => {
        isAnimating = false;
      }, 1050);
    }
  }

  function delayedTranslate(milliseconds = 0, parameter) {
    setTimeout(() => {
      translate(parameter);
    }, milliseconds);
  }

  function translate(withoutAnimation = false) {
    ref.current.style.transition = withoutAnimation ? "0s" : "1s cubic-bezier(.35,.62,.46,1)";
    ref.current.style.transform = `translateX(-${count * 100}%)`;
  }

  return (
    <>
      <div ref={ref} className={styles.carousel}>
        <img src="/static/images/lofi-1.jpg" alt="bg-1" />
        <img src="/static/images/lofi-2.jpg" alt="bg-2" />
        <img src="/static/images/lofi-3.jpg" alt="bg-3" />
        <img src="/static/images/lofi-1.jpg" alt="bg-1" />
      </div>

      <div className={styles.container}>
        <input className={styles.button} type="button" value="Left" onClick={() => transition("left")} />
        <input className={styles.button} type="button" value="Right" onClick={() => transition("right")} />
      </div>
    </>
  );
}
