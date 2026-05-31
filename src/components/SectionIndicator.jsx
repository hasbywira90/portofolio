export default function SectionIndicator() {
    return (
        <nav className="section-indicator-container fixed z-50 bottom-8 right-8 md:flex flex-col items-end text-ink lg:text-4xl md:text-2xl hidden pointer-events-auto">
            <button className="is-text opacity-60 hover:opacity-100">is</button>
            <button className="here-text opacity-60 hover:opacity-100">been/being here</button>
            <button className="can-text opacity-60 hover:opacity-100">experiences</button>
            {/* <button className="opacity-60 hover:opacity-100">made/making this</button> */}
        </nav>
    )
}
