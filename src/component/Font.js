import { useState, useEffect } from 'react'
function Font() {
    const [fontSize, setFontSize] = useState(16)
    useEffect(() => {
        document.querySelector('html').style.fontSize = `${fontSize}px`
    }, [fontSize])
    const onClickIncrease = () => {
        setFontSize((prev) => prev + 1)
    }
    const onClickDecrease = () => {
        setFontSize((prev) => prev - 1)
    }
    return (
        <aside id="font-control-box" className="flex fixed bottom-0 right-0">
            <button
                id="increase-font-btn"
                className="bg-white text-gray-500 border border-gray-300 hover:bg-red-50 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-white rounded-full"
                onClick={onClickIncrease}
                disabled={fontSize === 20}
            >
                +
            </button>
            <button
                id="decrease-font-btn"
                className="bg-white text-gray-500 border border-gray-300 hover:bg-blue-50 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-white rounded-full"
                onClick={onClickDecrease}
                disabled={fontSize === 12}
            >
                -
            </button>
        </aside>
    )
}
export default Font
