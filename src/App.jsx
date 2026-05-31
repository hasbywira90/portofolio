import Hero from "./components/Hero";
import SectionIndicator from "./components/SectionIndicator";
import Main from "./components/Main";
import Work from "./components/Work";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { isDesktop, isMobile } from "react-device-detect";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const workText = "Yang Pernah Saya Buat";

  const heroRef = useRef();
  const mainRef = useRef();
  const workRef = useRef();

  useGSAP(() => {
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
      let heroZoomEnd = isMobile ? "+=260" : "+=420"
      
      // Hero zoom out
      const heroZoomTl = gsap.timeline({
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: heroZoomEnd,
          scrub: 1
        }
      })

      heroZoomTl
        .fromTo(".hero-zoom", {scale: isMobile ? 1.16 : 1.42}, {scale: 1})
        .fromTo(".hero-code-badge", {xPercent: isMobile ? 0 : 12, opacity: .65}, {xPercent: 0, opacity: 1}, "<");

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

    const heroSplit = new SplitText(".title", {type: 'chars, words'});
    gsap.set(".animation-showup", {opacity: 0, y: "+=25"});
    gsap.set(heroSplit.chars, {opacity: 0, yPercent: 100});

    // Intro
    const introTl = gsap.timeline();

    introTl
    .fromTo("#welcoming-text", {opacity: 0}, {opacity: 1, delay: .5, duration: 2})
    .to("#welcoming-text", {scale: 1.5, duration: 1, ease: "power1.inOut"})
    .to("#welcoming-text", {y: "120vw", delay: .5, duration: 1, ease: "power2.out"})
    .fromTo(".section-indicator-container", {y: "+=25"}, {opacity:1, y: "-=25", delay: .25, duration: 1})
    .to(".welcoming-container", {opacity: 0, duration: 1, onComplete: () => {gsap.set(".welcoming-container", {display: "none"})}}, "<")
    .to(heroSplit.chars, {opacity: 1, yPercent: 0, duration: 1, ease: "expo.out", stagger: .06}, "<")
    .to(".animation-showup",  {opacity: 1, y: "-=25", duration: 1}, "<");

    return () => mm.revert();
  }, [])

  return (
    <div className="md:h-1400 h-800 w-full bg-paper text-ink font-serif">
      <div className="welcoming-container h-svh w-full bg-paper text-ink fixed z-51 flex justify-center items-center text-2xl font-sans">
        <p id="welcoming-text">Get Ready!!</p>
      </div>
      <SectionIndicator />
      <div className="fixed z-47" ref={heroRef}>
        <Hero />
      </div>
      <div className="fixed z-48" ref={mainRef}>
        <div className="overlay-white absolute h-full w-full scale-200 bg-paper"></div>
        <Main />
      </div>
      <div className="work-text h-svh w-full bg-paper fixed z-49 font-sans font-bold lg:text-7xl md:text-6xl text-4xl text-ink flex justify-center items-center text-center px-6 leading-tight pointer-events-none">
        {workText}
      </div>
      <div className="fixed z-50" ref={workRef}>
        <Work />
      </div>
    </div>
  )
}

export default App
