import { useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";

import DemoGallery from "../components/demo-gallery";

gsap.registerPlugin(ScrollTrigger);

export const HorizontalGallery = () => {
  useEffect(() => {
    const images = gsap.utils.toArray("img");
    const loader = document.querySelector(".loader--text");
    const updateProgress = (instance) =>
      (loader.textContent = `${Math.round(
        (instance.progressedCount * 100) / images.length
      )}%`);

    const showDemo = () => {
      document.body.style.overflow = "auto";
      document.scrollingElement.scrollTo(0, 0);
      gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });

      gsap.utils.toArray("section").forEach((section, index) => {
        const w = section.querySelector(".wrapper");
        const [x, xEnd] =
          index % 2
            ? ["100%", (w.scrollWidth - section.offsetWidth) * -1]
            : [w.scrollWidth * -1, 0];
        gsap.fromTo(
          w,
          { x },
          {
            x: xEnd,
            scrollTrigger: {
              trigger: section,
              scrub: 0.5,
            },
          }
        );
      });
    };

    imagesLoaded(images).on("progress", updateProgress).on("always", showDemo);
  }, []);
  return (
    <Container>
      <div className="loader df aic jcc">
        <div>
          <h1>Loading</h1>
          <h2 className="loader--text">0%</h2>
        </div>
      </div>
      <div className="demo-wrapper">
        <header className="df aic jcc">
          <div>
            <h1>ScrollTrigger</h1>
            <h2>demo</h2>
          </div>
        </header>
        <section className="demo-text">
          <div className="wrapper text">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
        </section>
        <DemoGallery />
        <section className="demo-text">
          <div className="wrapper text">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
        </section>
        <footer className="df aic jcc">
          <p>
            Images from <a href="https://unsplash.com/">Unsplash</a>
          </p>
        </footer>
      </div>
    </Container>
  );
};

const Container = styled.div`
  h1 {
    font-size: 5rem;
  }
  h2 {
    font-size: 2rem;
  }

  img {
    width: 100%;
    height: auto;
    background: #f0f0f0;
  }

  ul {
    padding-left: 1rem;
    list-style: none;
  }

  li {
    flex-shrink: 0;
    width: clamp(500px, 60vw, 800px);
    padding-right: 1rem;
  }

  header {
    height: 100vh;
  }
  footer {
    height: 50vh;
  }

  :any-link {
    color: #4e9815;
  }

  .df {
    display: flex;
  }
  .aic {
    align-items: center;
  }
  .jcc {
    justify-content: center;
  }

  .loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    color: white;
  }

  .demo-wrapper {
    overflow-x: hidden;
  }

  .wrapper {
    display: flex;
  }

  .demo-gallery:not(.last) {
    padding-bottom: 1rem;
  }

  .demo-text .text {
    font-size: clamp(8rem, 15vw, 16rem);
    line-height: 1;
    font-weight: 900;
  }
`;
