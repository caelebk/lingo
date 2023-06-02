"use client"

import CardList from "./cardList"
import DeckActions from "./deckActions"
import { useState } from "react"
import { useSpring, animated } from "@react-spring/web"

interface DeckProps {
    id: string,
    title: string,
    cards: any[],
    deleteCard(id: string): void
}

export default function Deck(props: DeckProps) {
    const { id, title, cards, deleteCard } = props
    const [editMode, setEditMode] = useState(false)
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const animateVisible = useSpring({
        from: {
            opacity: 0,
            maxHeight: "0px",
        },
        to: {
            opacity: visible ? 1 : 0,
            maxHeight: visible ? "400px" : "0px",
        },
        config: {
            duration: 600
        }
    })

    const animateArrow = useSpring({
        from: {
            transform: "rotate(0deg)"
        },
        to: {
            transform: visible ? "rotate(180deg)" : "rotate(0deg)"
        },
        config: {
            duration: 150
        }
    })

    return (
        <div className="flex flex-col border-slate-800 shadow-lg bg-slate-800 rounded-lg border mb-5">
            <button onClick={toggleVisible}>
                <header className="flex items-center justify-between p-3">
                    <h3 className="text-3xl">{title}</h3>
                    <animated.div style={animateArrow}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 
                    text-slate-400 hover:text-slate-100 hover:animate-pulse">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </animated.div>
                </header>
            </button>

            <animated.div className="border-b border-slate-600 rounded-lg" style={animateVisible}></animated.div>

            <animated.div className="flex flex-col overflow-auto" style={animateVisible}>
                <div className="p-5">
                    <div className="flex items-center justify-end mb-5">
                        <DeckActions editMode={editMode} title={title} setEditMode={(value: boolean) => setEditMode(value)} id={id} />
                    </div>
                    <CardList id={id} cards={cards} editMode={editMode} deleteCard={deleteCard} />
                </div>
            </animated.div>
        </div >
    )
}