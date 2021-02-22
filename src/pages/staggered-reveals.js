import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../styles/bootstrap-v4.scss";
import "../styles/staggered-reveals.scss";

gsap.registerPlugin(ScrollTrigger);

const batch = (targets, vars) => {
  let varsCopy = {},
    interval = vars.interval || 0.1,
    proxyCallback = (type, callback) => {
      let batch = [],
        delay = gsap
          .delayedCall(interval, () => {
            callback(batch);
            batch.length = 0;
          })
          .pause();
      return (self) => {
        batch.length || delay.restart(true);
        batch.push(self.trigger);
        vars.batchMax && vars.batchMax <= batch.length && delay.progress(1);
      };
    },
    p;
  for (p in vars) {
    varsCopy[p] =
      ~p.indexOf("Enter") || ~p.indexOf("Leave")
        ? proxyCallback(p, vars[p])
        : vars[p];
  }
  gsap.utils.toArray(targets).forEach((target) => {
    let config = {};
    for (p in varsCopy) {
      config[p] = varsCopy[p];
    }
    config.trigger = target;
    ScrollTrigger.create(config);
  });
};

export const StaggeredReveals = () => {
  useEffect(() => {
    batch(".card", {
      interval: 0.1, // time window (in seconds) for batching to occur. The first callback that occurs (of its type) will start the timer, and when it elapses, any other similar callbacks for other targets will be batched into an array and fed to the callback. Default is 0.1
      batchMax: 3, // maximum batch size (targets)
      onEnter: (batch) =>
        gsap.to(batch, { autoAlpha: 1, stagger: 0.5, overwrite: true }),
      onLeave: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
      onEnterBack: (batch) =>
        gsap.to(batch, { autoAlpha: 1, stagger: 0.15, overwrite: true }),
      onLeaveBack: (batch) =>
        gsap.set(batch, { autoAlpha: 0, overwrite: true }),
      // you can also define things like start, end, etc.
    });
  }, []);

  return (
    <div className="container d-flex flex-wrap pt-5 pb-3">
      {new Array(145).fill().map((_, index) => (
        <div key={index} className="card mr-3 mb-3"></div>
      ))}
    </div>
  );
};
