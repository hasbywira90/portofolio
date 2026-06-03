import Hero from "./components/Hero";
import SectionIndicator from "./components/SectionIndicator";
import Main from "./components/Main";
import Work from "./components/Work";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const workText = "Yang Pernah Saya Buat";

  const heroRef = useRef();
  const mainRef = useRef();
  const workRef = useRef();

  useGSAP(() => {
    gsap.set(".section-indicator-container", {opacity: 0, y: 25});
    gsap.set(".animation-showup", {opacity: 0, y: 25});
    gsap.set(".hero-title-hasby", {opacity: 0});
    gsap.set(".hero-title-rest", {opacity: 0, y: 18});
    gsap.set(".welcoming-name", {x: 0, y: 0, scale: 1, opacity: 1, transformOrigin: "0 0"});

    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: true,
    })

    let mm = gsap.matchMedia();
    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)"
    }, (context) => {
      let {isMobile} = context.conditions;
      
      let end = isMobile ? "+=400" : "+=800"
      const welcomeTl = gsap.timeline({
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: isMobile ? "+=300" : "+=440",
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })

      const getNameMove = () => {
        const welcomeName = document.querySelector(".welcoming-name");
        const targetName = document.querySelector(".hero-title-hasby");

        if (!welcomeName || !targetName) {
          return {x: 0, y: 0, scale: 1};
        }

        gsap.set(welcomeName, {x: 0, y: 0, scale: 1});

        const start = welcomeName.getBoundingClientRect();
        const target = targetName.getBoundingClientRect();
        const scale = target.width / start.width;

        return {
          x: target.left - start.left,
          y: target.top - start.top,
          scale,
        };
      }

      let nameMove = getNameMove();

      welcomeTl
        .to(".welcoming-label", {opacity: 0, y: -24, duration: .18})
        .to(".welcoming-name", {
          x: () => {
            nameMove = getNameMove();
            return nameMove.x;
          },
          y: () => nameMove.y,
          scale: () => nameMove.scale,
          duration: .72,
          ease: "none",
        }, "<")
        .to(".welcoming-bg", {opacity: 0, duration: .3}, "<.42")
        .set(".welcoming-name", {opacity: 0})
        .set(".hero-title-hasby", {opacity: 1})
        .to(".hero-title-rest", {opacity: 1, y: 0, duration: .22})
        .set(".welcoming-container", {pointerEvents: "none"})
        .to(".animation-showup", {opacity: 1, y: 0, duration: .24}, "<.08")
        .to(".section-indicator-container", {opacity: 1, y: 0, duration: .24}, "<.06");
      
      // Hero badge settle
      const heroZoomTl = gsap.timeline({
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: isMobile ? "+=260" : "+=420",
          scrub: 1
        }
      })

      heroZoomTl
        .fromTo(".hero-code-badge", {xPercent: isMobile ? 0 : 12, opacity: .65}, {xPercent: 0, opacity: 1});

      // Hero out, Main in
      const mainInTl = gsap.timeline({
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: isMobile ? "260 top" : "420 top",
          end: end,
          scrub: 1
        }
      })
      
      mainInTl
      .fromTo(mainRef.current, {clipPath: "circle(0% at 50% 50%)", scale: .25, y: "100vh"}, {clipPath: "circle(100% at 50% 50%)", scale: 1, y:0})
      .to(heroRef.current, {x: "200vw"}, "<")
      .to(".overlay-white", {opacity: 0}, "<")
      .to(".is-text", {opacity: 1, paddingRight: 40}, "<")
      .from(".is-container", {x: "-100vw"}, "<0.1");
      
      // been/being here
      const hereTl = gsap.timeline({
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: isMobile ? "400 top" : "800 top",
          end: end,
          scrub: 1,
        }
      })
      
      hereTl
      .from(".here-card-container", {opacity: 0, xPercent: -50, stagger: .05})
      .to(".is-text", {opacity: .6, paddingRight: 0}, "<")
      .to(".here-text", {opacity: 1, paddingRight: 40}, "<")
      .from(".here-card-text", {opacity: 0, yPercent: 50, stagger: .05}, "<.2");
      
      // can do this
      const canTl = gsap.timeline({
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: isMobile ? "800 top" : "1600 top",
          end: end,
          scrub: 1,
        }
      })
      
      canTl
      .from(".skill-card-container", {opacity: 0, xPercent: -50, stagger: .05})
      .to(".here-text", {opacity: .6, paddingRight: 0}, "<")
      .to(".can-text", {opacity: 1, paddingRight: 40}, "<")
      .from(".skill-card-text", {opacity: 0, yPercent: 50, stagger: .05}, "<.2");
      
      // Main out, Work in
      const workInTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: isMobile ? "1200 top" : "2400 top",
          end: end,
          scrub: 1,
        }
      })
      
      workInTl
        .fromTo(mainRef.current, {scale: 1}, {scale: .9})
        .fromTo(".section-indicator-container", {xPercent: 0}, {xPercent: 150}, "<")
        .to(".can-text", {opacity: .6, paddingRight: 0}, "<")
        .fromTo(mainRef.current, {filter: "blur(0px)"}, {filter: "blur(10px)"}, "<")
        .fromTo(".work-text", {clipPath: "inset(50% 0 50% 0)"}, {clipPath: isMobile ? "inset(45% 0 45% 0)" : "inset(40% 0 40% 0)"}, "<")
        .from(workRef.current, {xPercent: 150}, "<.3")  
      
      // work scroll
      const workTl = gsap.timeline({
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body,
          start: isMobile ? "1600 top" : "3200 top",
          end: isMobile ? "+=800" : "+=1600",
          scrub: 1,
          }
        })
    
        workTl
          .to(".work-container", {xPercent: -100})
          .to(mainRef.current, {opacity: 0, duration: .05}, "<")
    })

    return () => mm.revert();
  }, [])

  return (
    <div className="md:h-1400 h-800 w-full page-gradient text-ink font-serif">
      <div className="welcoming-container h-svh w-full text-ink fixed z-51 flex justify-center items-center font-sans overflow-hidden pointer-events-auto">
        <div className="welcoming-bg absolute inset-0 page-gradient"></div>
        <div className="welcoming-content relative text-center px-6">
          <p className="welcoming-label text-coral md:text-3xl text-lg font-semibold">ayo mulai mengenal</p>
          <p className="welcoming-name inline-block text-[clamp(5.5rem,24vw,18rem)] leading-none font-bold tracking-normal">Hasby</p>
        </div>
      </div>
      <SectionIndicator />
      <div className="fixed z-47" ref={heroRef}>
        <Hero />
      </div>
      <div className="fixed z-48" ref={mainRef}>
        <div className="overlay-white absolute h-full w-full scale-200 page-gradient"></div>
        <Main />
      </div>
      <div className="work-text h-svh w-full page-gradient fixed z-49 font-sans font-bold lg:text-7xl md:text-6xl text-4xl text-ink flex justify-center items-center text-center px-6 leading-tight pointer-events-none">
        {workText}
      </div>
      <div className="fixed z-50" ref={workRef}>
        <Work />
      </div>
    </div>
  )
}

export default App
