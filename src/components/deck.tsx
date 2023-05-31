"use client"

import Link from "next/link"
import CardList from "./cardList"
import DeckActions from "./deckActions"
import { useState } from "react"

interface DeckProps {
    id: string,
    title: string,
    cards: any[],
    deleteCard(id: string): void
}

export default function Deck(props: DeckProps) {
    const { id, title, cards, deleteCard } = props
    const [editMode, setEditMode] = useState(false)

    return (
        <div className="flex flex-col border border-slate-300 rounded p-3 mb-5">
            <header className="flex items-center justify-between mb-5">
                <h3 className="text-3xl">{title}</h3>
                <DeckActions editMode={editMode} title={title} setEditMode={(value: boolean) => setEditMode(value)} id={id} />
            </header>
            <CardList cards={cards} editMode={editMode} deleteCard={deleteCard} />
        </div>
    )
}