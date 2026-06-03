import { useState } from "react";
import { IoLogoInstagram, IoPeopleSharp, IoSchoolSharp, IoTrophySharp } from "react-icons/io5";
import profilePhoto from "../assets/gambar_hasby.jpg";

function ProfilePhoto() {
    return (
        <div className="relative md:w-44 w-28 aspect-[3/4] shrink-0 overflow-hidden rounded-md bg-paper text-ink flex items-center justify-center font-sans font-bold md:text-4xl text-2xl border-4 border-accent shadow-[8px_8px_0_0_rgba(42,116,111,0.14)]">
            <span>HW</span>
            <img
                src={profilePhoto}
                alt="Hasby Wira Al Muflih"
                className="absolute inset-0 h-full w-full object-cover"
            />
        </div>
    )
}

function HereCard({place, year}) {
    return (
        <div className="here-card-container flex items-center md:gap-8 gap-4">
            <IoSchoolSharp className="lg:text-8xl md:text-4xl text-2xl text-accent"/>
            <div>
                <h2 className="here-card-text font-sans font-bold lg:text-4xl md:text-2xl text-xl text-ink">{place}</h2>
                <p className="here-card-text text-coral lg:text-2xl md:text-md text-sm">{year}</p>
            </div>
        </div>
    )
}

function ExperienceCard({icon, title, description, items, link, links}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="skill-card-container flex flex-col md:gap-5 gap-4">
            <div className="flex md:gap-5 gap-4 items-center">
                <div className="skill-card-text lg:text-5xl md:text-4xl text-2xl shrink-0 text-coral">{icon}</div>
                <h2 className="skill-card-text font-sans font-bold lg:text-2xl md:text-xl text-xl leading-tight text-ink">{title}</h2>
            </div>
            {description && (
                <p className="skill-card-text text-ink/75 lg:text-lg md:text-base text-sm leading-7 max-w-xl">{description}</p>
            )}
            {items && (
                <div className="skill-card-text grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-3 text-ink/75 lg:text-base md:text-sm text-xs leading-6">
                    {items.map((item) => (
                        <p key={item} className="border-l-2 border-accent pl-4">{item}</p>
                    ))}
                </div>
            )}
            <div className="skill-card-text flex flex-wrap gap-3">
                {links && (
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="inline-flex w-fit items-center bg-accent text-paper font-sans font-bold md:text-base text-sm px-5 py-2.5 hover:bg-coral transition-colors cursor-pointer"
                    >
                        View Competition Links
                    </button>
                )}
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-fit items-center gap-2 bg-accent text-paper font-sans font-bold md:text-base text-sm px-5 py-2.5 hover:bg-coral transition-colors"
                    >
                        <IoLogoInstagram className="text-xl" />
                        Visit ORBIT Instagram
                    </a>
                )}
            </div>
            {isOpen && (
                <div className="fixed inset-0 z-60 bg-ink/80 flex items-center justify-center md:p-8 p-4">
                    <div className="bg-paper text-ink font-sans md:w-[34rem] w-full max-w-full md:p-7 p-5 border-4 border-accent">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <h3 className="font-bold md:text-2xl text-xl">Competition Links</h3>
                                <p className="mt-1 text-ink/70 md:text-base text-sm">Open the competition references below.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-2xl leading-none font-bold cursor-pointer"
                                aria-label="Close competition links"
                            >
                                x
                            </button>
                        </div>
                        <div className="mt-6 grid gap-3">
                            {links.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="border border-accent/60 p-4 hover:bg-ink hover:text-paper transition-colors"
                                >
                                    <span className="block font-bold">{item.name}</span>
                                    <span className="block mt-1 text-sm opacity-70">{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function Main() {
    return (
        <div className="main-container min-h-svh w-full md:p-8 p-4 flex md:overflow-hidden overflow-y-auto">
            <div className="w-full grid md:grid-cols-2 grid-cols-1 md:grid-rows-[auto_auto] md:gap-x-10 md:gap-y-8 gap-6 content-center items-start">
                <div className="is-container self-start rounded-md bg-light md:p-8 p-5 text-ink font-sans flex md:flex-row flex-col md:items-start items-center md:gap-7 gap-5 border-l-8 border-accent shadow-[10px_10px_0_0_rgba(42,116,111,0.1)]">
                    <ProfilePhoto />
                    <p className="lg:text-xl/8 md:text-lg/8 text-sm leading-7 md:text-left text-justify">
                        I am a software engineering student, I have an interest in trying many new things, I am also good at communicating and building good teamwork, I also often participate in several competitions related to my major.
                    </p>
                </div>
                <div className="md:p-8 p-4 flex flex-col justify-center md:gap-9 gap-5">
                    <HereCard place="SMPN 28 Bandung" year="2021-2024"/>
                    <HereCard place="SMK Negeri 4 Bandung" year="2024-2027"/>
                </div>
                <div className="md:col-span-2 md:p-8 p-4 grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-7">
                    <ExperienceCard
                        icon={<IoTrophySharp />}
                        title="Competition Experience"
                        items={[
                            "Participated in several IT competitions, including JHIC, INOVENTURE, and TECHNOVA.",
                            "Selected as a finalist in a Business Plan competition."
                        ]}
                        links={[
                            {
                                name: "JHIC",
                                label: "Jagoan Hosting Infra Competition",
                                url: "https://www.medcom.id/pendidikan/news-pendidikan/GNlL5ymN-final-jhic-2025-siswa-smk-bertarung-adu-bangun-website-sekolah-berbasis-cloud"
                            },
                            {
                                name: "INOVENTURE",
                                label: "EIGER Innoventure",
                                url: "https://www.eigeradventure.com/blog/eiger-innoventure/"
                            },
                            {
                                name: "TECHNOVA",
                                label: "Technova competition reference",
                                url: "https://www.google.com/search?q=TECHNOVA+IT+competition"
                            },
                            {
                                name: "Business Plan",
                                label: "Business plan competition reference",
                                url: "https://www.instagram.com/p/DQTpNmpE8ly/?img_index=2"
                            }
                        ]}
                    />
                    <ExperienceCard
                        icon={<IoPeopleSharp />}
                        title="Organization Experience"
                        items={[
                            "Participated in the Student Council during junior high school, gaining teamwork and leadership experience.",
                            "Currently serving as Head of ORBIT, the IT Extracurricular Organization at SMKN 4 Bandung."
                        ]}
                        link="https://www.instagram.com/orbit4it/"
                    />
                </div>
            </div>
        </div>
    )
}

export default Main;
