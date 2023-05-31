"use client"

import { useRouter } from "next/navigation"

interface DeleteButtonProps {
    deckId: string,
    deleteDeck(id: string): void
}

export default function DeleteButton(props: DeleteButtonProps) {
    const { deckId, deleteDeck } = props
    const router = useRouter()
    return (
        <button className="self-end border border-slate-300 px-10 py-2 rounded text-slate-300
        hover:bg-slate-700 hover:text-lime-300" onClick={() => {
                deleteDeck(deckId)
                router.push("/")
                router.refresh()
            }}>
            Yes
        </button>
    )
}