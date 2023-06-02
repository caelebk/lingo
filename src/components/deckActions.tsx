import Link from "next/link"

interface DeckActionsProps {
    id: string,
    title: string,
    editMode: boolean,
    setEditMode(editMode: boolean): void
}

export default function DeckActions(props: DeckActionsProps) {
    const { id, title, editMode, setEditMode } = props
    return (
        <div className="flex gap-2">
            {!editMode ?
                (<button onClick={() => setEditMode(!editMode)}
                    className="border border-slate-600 px-2 py-1 rounded
        hover:bg-slate-700">
                    Edit
                </button>)
                :
                (
                    <>
                        <Link className="self-end border border-red-600 px-2 py-1 rounded text-red-600
        hover:bg-slate-700 hover:text-red-400"
                            href={{
                                pathname: "/deleteDeck",
                                query: {
                                    id: id,
                                    title: title
                                }
                            }}>Delete Deck</Link>
                        <Link className="self-end border border-lime-500 px-2 py-1 rounded text-lime-500
        hover:bg-slate-700 hover:text-lime-300"
                            href={{
                                pathname: "/createCard",
                                query: { id: id }
                            }}>Add Card</Link>
                        <button className="border border-slate-300 px-2 py-1 rounded
        hover:bg-slate-700"
                            onClick={() => setEditMode(!editMode)}>Cancel</button>
                    </>
                )
            }
        </div>
    )
}