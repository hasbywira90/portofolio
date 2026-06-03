import { useState } from "react";
import { createPortal } from "react-dom";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import gameLastChanceImage from "../assets/Game Last Chance.jpg";
import lokalverseUmkmImage from "../assets/website lokalverse umkm.jpg";
import schoolCalculatorImage from "../assets/websekolah/websekolahkalkulator.jpg";
import schoolHomeImage from "../assets/websekolah/websekolah.jpg";
import schoolPrestasiImage from "../assets/websekolah/websekolahprestasisekolah.jpg";
import schoolProfileImage from "../assets/websekolah/websekolahprofil.jpg";
import schoolTesMinatImage from "../assets/websekolah/websekolahtesminatbakat.jpg";
import susiDemoImage from "../assets/website susi/website susi demos.jpg";
import susiUploadForumImage from "../assets/website susi/website susi forum unggahan.jpg";
import susiForumImage from "../assets/website susi/Website susi forum.jpg";
import susiHomeImage from "../assets/website susi/Website Susi.jpg";
import timeManagementAnalyticsImage from "../assets/website time management/website time management analytics.jpg";
import timeManagementGoalTrackerImage from "../assets/website time management/website time management goal tracker.jpg";
import timeManagementHabitBuilderImage from "../assets/website time management/website time management habit builder.jpg";
import timeManagementTaskImage from "../assets/website time management/website time management task.jpg";
import timeManagementHomeImage from "../assets/website time management/website time management.jpg";

const susiGallery = [
    susiHomeImage,
    susiForumImage,
    susiUploadForumImage,
    susiDemoImage,
];

const schoolGallery = [
    schoolHomeImage,
    schoolProfileImage,
    schoolPrestasiImage,
    schoolCalculatorImage,
    schoolTesMinatImage,
];

const timeManagementGallery = [
    timeManagementHomeImage,
    timeManagementTaskImage,
    timeManagementAnalyticsImage,
    timeManagementGoalTrackerImage,
    timeManagementHabitBuilderImage,
];

function ProjectSlider({project, slideIndex, onClose, onPrevious, onNext}) {
    const totalSlides = project.gallery.length;

    return createPortal(
        <div className="fixed inset-0 z-70 bg-ink/85 md:p-10 p-4 flex items-center justify-center">
            <div className="bg-paper text-ink w-full max-w-4xl flex flex-col shadow-2xl border-4 border-accent">
                <div className="flex items-center justify-between gap-4 md:p-5 p-4 border-b border-accent/50">
                    <div>
                        <h2 className="font-sans font-bold md:text-2xl text-xl">{project.name}</h2>
                        <p className="font-sans text-ink/70 md:text-sm text-xs">
                            {slideIndex + 1} / {totalSlides}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-3xl cursor-pointer"
                        aria-label="Close project gallery"
                    >
                        <IoClose />
                    </button>
                </div>
                <div className="relative bg-ink">
                    <div className="aspect-video w-full overflow-hidden flex items-center justify-center bg-ink border-t-4 border-accent">
                        <img
                            src={project.gallery[slideIndex]}
                            alt={`${project.name} preview ${slideIndex + 1}`}
                            className="h-full w-full object-contain"
                        />
                    </div>
                    {totalSlides > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={onPrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-accent text-paper md:text-4xl text-3xl p-2 cursor-pointer hover:bg-coral transition-colors"
                                aria-label="Previous project image"
                            >
                                <IoChevronBack />
                            </button>
                            <button
                                type="button"
                                onClick={onNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent text-paper md:text-4xl text-3xl p-2 cursor-pointer hover:bg-coral transition-colors"
                                aria-label="Next project image"
                            >
                                <IoChevronForward />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body
    )
}

function WorkCard({imageOnBottom, name, description, image, gallery, onOpenGallery}) {
    const imageUrl = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const base = import.meta.env.BASE_URL;
    const cardImage = image ?? `${base}/images/${imageUrl}.png`;
    const projectGallery = gallery ?? [cardImage];
    const imageOrder = imageOnBottom ? "order-2" : "";
    const descriptionMargin = imageOnBottom ? "mb-5" : "mt-5";
    const descriptionItems = imageOnBottom ? "items-end text-right" : "items-start";
    const imageTitle = imageOnBottom ? "items-start" : "items-end";

    return (
        <article className="md:w-116 w-[84vw] max-w-sm md:max-w-none min-h-[58svh] shrink-0 flex flex-col justify-center">
            <button
                type="button"
                onClick={() => onOpenGallery({name, gallery: projectGallery})}
                style={{ backgroundImage: `url(${cardImage})` }}
                className={`${imageOrder} aspect-video w-full bg-light bg-center bg-contain bg-no-repeat overflow-hidden border-4 border-accent cursor-pointer text-left shadow-[8px_8px_0_0_rgba(42,116,111,0.12)]`}
            >
                <h2 className={`h-full w-full transition-all ease-in-out duration-300 bg-ink/35 hover:bg-accent/65 text-paper font-bold md:text-4xl text-xl font-sans flex md:justify-center md:items-center justify-start ${imageTitle} p-5`}>{name}</h2>
            </button>
            <p className={`${descriptionMargin} ${descriptionItems} md:text-xl text-xs leading-relaxed text-ink/75 flex`}>{description}</p>
        </article>
    )
}

export default function Work() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [slideIndex, setSlideIndex] = useState(0);

    const openGallery = (project) => {
        setSelectedProject(project);
        setSlideIndex(0);
    }

    const closeGallery = () => {
        setSelectedProject(null);
        setSlideIndex(0);
    }

    const previousSlide = () => {
        setSlideIndex((currentIndex) => (
            currentIndex === 0 ? selectedProject.gallery.length - 1 : currentIndex - 1
        ));
    }

    const nextSlide = () => {
        setSlideIndex((currentIndex) => (
            currentIndex === selectedProject.gallery.length - 1 ? 0 : currentIndex + 1
        ));
    }

    return (
        <>
            <div className="work-container h-svh min-w-full flex items-center page-gradient text-ink md:px-16 px-5 md:gap-16 gap-7 overflow-hidden">
                <WorkCard onOpenGallery={openGallery} image={gameLastChanceImage} gallery={[gameLastChanceImage]} name="Game Last Chance" description="A game development project created as part of my learning process in software engineering, focusing on gameplay flow, interaction, and technical implementation."/>
                <WorkCard onOpenGallery={openGallery} imageOnBottom={true} image={susiHomeImage} gallery={susiGallery} name="Pembuatan Website SUSI (Suara Siswa)" description="A student voice website project designed to provide a digital platform for collecting, organizing, and presenting student feedback."/>
                <WorkCard onOpenGallery={openGallery} image={schoolHomeImage} gallery={schoolGallery} name="Memodifikasi Website Sekolah SMKN 4 Bandung" description="A school website improvement project focused on updating the interface, refining content structure, and supporting a better user experience."/>
                <WorkCard onOpenGallery={openGallery} imageOnBottom={true} image={lokalverseUmkmImage} gallery={[lokalverseUmkmImage]} name="Website Pendukung UMKM" description="A website project built to support small businesses by helping them present products, information, and business identity through a digital platform."/>
                <WorkCard onOpenGallery={openGallery} image={timeManagementHomeImage} gallery={timeManagementGallery} name="Time Management" description="A website project designed to help users organize schedules, manage tasks, and improve productivity through a simple time management system."/>
                {/* <WorkCard name="Bell's After Dark" description="Inspired by [inspiration], [Project Name] combines a [aesthetic style] interface with modern functionality. Built using [tech stack], I focused on high-quality typography and intuitive navigation to create a digital space that is both beautiful and functional."/> */}
            </div>
            {selectedProject && (
                <ProjectSlider
                    project={selectedProject}
                    slideIndex={slideIndex}
                    onClose={closeGallery}
                    onPrevious={previousSlide}
                    onNext={nextSlide}
                />
            )}
        </>
    )
}
