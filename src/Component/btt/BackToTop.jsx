import React from "react"

const BackToTop = () => {
    const [position, setPosition] = React.useState({ top: 0, left: 0 })
    React.useEffect(() => {
        window.scroll({
            top: position.top,
            left: position.left,
            behavior: 'smooth'
        })
    })

    const [visibility, setVisibility] = React.useState(false)
    const scrollTop = React.useRef()
    React.useEffect(() => {
        window.addEventListener('scroll', (e) => {
            window.scrollY > 200
                ? scrollTop.current.style.display = 'inline-block'
                : scrollTop.current.style.display = 'none'
        })
    })

    return (
        <div className="backtt">
            <span
                onClick={() => setPosition({ ...position, position: { top: 0, left: 0 } })} className="circle"
                ref={scrollTop}
            ><i className="fa fa-arrow-up" aria-hidden="true"></i></span>
        </div>
    )
}
export default BackToTop