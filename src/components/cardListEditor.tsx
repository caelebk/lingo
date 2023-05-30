"use client"

import CardList from "./cardList";
import EditorActions from "./editorActions";
import { useState } from "react"

interface CardListEditorProps {
    cards: any[],
    deleteCard(id: string): void
}

export default function CardListEditor(props: CardListEditorProps) {
    const { cards, deleteCard } = props
    const [editMode, setEditMode] = useState(false)

    return (
        <div className="flex flex-col border border-slate-300 rounded p-3">
            <header className="flex items-center justify-between mb-5">
                <h3 className="text-3xl">Title</h3>
                <EditorActions editMode={editMode} setEditMode={(value: boolean) => setEditMode(value)} />
            </header>
            <CardList cards={cards} editMode={editMode} deleteCard={deleteCard} />
        </div>
    )
}