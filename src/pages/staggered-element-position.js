import { useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../styles/bootstrap-v4.scss";

gsap.registerPlugin(ScrollTrigger);

export const StaggeredElementPosition = () => {
  useEffect(() => {
    const delSections = document.querySelectorAll(".delayed-section");

    delSections.forEach((section) => {
      const containerAnim = gsap.to(section.querySelector(".innerContainer"), {
        y: "100vh",
        ease: "none",
      });

      const imageAnim = gsap.to(section.querySelector("img"), {
        y: "-100vh",
        ease: "none",
        paused: true,
      });

      const scrub = gsap.to(imageAnim, {
        progress: 1,
        paused: true,
        ease: "power3",
        duration: parseFloat(section.dataset.scrub) || 0.1,
        overwrite: true,
      });

      ScrollTrigger.create({
        animation: containerAnim,
        scrub: true,
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          scrub.vars.progress = self.progress;
          scrub.invalidate().restart();
        },
      });
    });
  }, []);

  return (
    <CssContainer>
      <h1>Scroll down, mate</h1>
      <div id="del1" className="delayed-section" data-scrub="0.4">
        <div className="innerContainer">
          <img width="575" src="https://picsum.photos/575/745?index=1" alt="" />
        </div>
      </div>
      <div id="del2" className="delayed-section" data-scrub="0.2">
        <div className="innerContainer">
          <img width="575" src="https://picsum.photos/575/745?index=2" alt="" />
        </div>
      </div>
      <div id="del3" className="delayed-section" data-scrub="0.6">
        <div className="innerContainer">
          <img width="575" src="https://picsum.photos/575/745?index=3" alt="" />
        </div>
      </div>
    </CssContainer>
  );
};

const CssContainer = styled.div`
  position: relative;
  min-height: 200vh;
  h1 {
    text-align: center;
  }

  .delayed-section {
    position: absolute;
    width: 30vw;
    height: 38.87vw;
  }
  .delayed-section .inner-container {
    will-change: transform;
  }
  .delayed-section img {
    max-width: 100%;
    will-change: transform;
  }

  #del1 {
    top: 101vh;
    left: 10vw;
  }
  #del2 {
    top: 110vh;
    left: 60vw;
  }
  #del3 {
    top: 120vh;
    left: 30vw;
  }
`;
