import { IoCodeSlash, IoLogoGithub, IoLogoInstagram } from "react-icons/io5";

export default function Hero() {
    return (
        <div className="h-svh w-full bg-paper text-ink grid md:grid-cols-[1.25fr_.75fr] grid-cols-1 md:p-8 p-6 md:gap-8 gap-6 overflow-hidden">
            <div className="hero-zoom flex flex-col md:justify-center justify-center md:items-start items-center origin-left md:-translate-y-10">
                <h1 className="title lg:w-5/6 md:w-full font-sans lg:text-[7rem]/[.95] md:text-7xl text-4xl md:text-left text-center font-bold">Hasby Wira Al Muflih</h1>
                <p className="animation-showup mt-6 md:w-72 md:text-2xl md:text-start text-base text-center font-light text-coral">To become a star you must burn.</p>
                <div className="animation-showup mt-6 flex items-center md:justify-start justify-center gap-4">
                    <a href="https://github.com/hasbywira90" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-4xl text-accent hover:text-coral transition-colors">
                        <IoLogoGithub />
                    </a>
                    <a href="https://www.instagram.com/jp.bey09/" target="_blank" rel="noreferrer" aria-label="Instagram profile" className="text-4xl text-accent hover:text-coral transition-colors">
                        <IoLogoInstagram />
                    </a>
                </div>
            </div>
            <div className="animation-showup flex md:items-center md:justify-center justify-center md:-translate-y-16">
                <div className="hero-code-badge font-sans flex md:flex-col flex-row md:items-end items-center md:gap-5 gap-4 text-accent">
                    <IoCodeSlash className="lg:text-7xl md:text-6xl text-4xl" />
                    <p className="font-bold lg:text-4xl md:text-3xl text-xl md:text-right text-left leading-tight">
                        Software<br className="md:block hidden" /> Engineering
                    </p>
                </div>
            </div>
        </div>
    )
}
