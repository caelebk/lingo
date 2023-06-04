"use client"
import { useRouter } from 'next/navigation';
import { useSpring, animated } from "@react-spring/web"

interface CardProps {
    id: string,
    term: string,
    definition: string,
    editMode: boolean,
    deleteCard(id: string): void
}

export default function Card(props: CardProps) {
    const { id, term, definition, editMode, deleteCard } = props
    const router = useRouter()

    const buttonGrow = useSpring({
        from: {
            opacity: 0,
            scale: 0,
            maxWidth: "0px",
        },
        to: {
            opacity: editMode ? 1 : 0,
            scale: editMode ? 1 : 0,
            maxWidth: editMode ? "100%" : "0px",
        },
    })

    return (
        <li className="flex gap-2 items-center m-2">
            <animated.button style={buttonGrow} onClick={() => {
                deleteCard(id)
                router.refresh()
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-0.5
            stroke-red-500 border border-red-500 rounded-full hover:cursor-pointer hover:bg-slate-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </animated.button>
            <div className="flex grow justify-between items-center border bg-slate-700 border-slate-600 shadow-2xl rounded p-2">
                <span>{term}</span>
                <span>{definition}</span>
            </div>

        </li>
    )
}
