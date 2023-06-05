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
                    className="border border-slate-600 px-3 py-1 rounded-lg bg-slate-700 shadow-2xl
        hover:bg-slate-600 text-md">
                    Edit
                </button>)
                :
                (
                    <>
                        <Link className="self-end px-3 py-1 rounded-lg bg-red-700 hover:bg-red-600 shadow-2xl text-md "
                            href={{
                                pathname: "/deleteDeck",
                                query: {
                                    id: id,
                                    title: title
                                }
                            }}>Delete Deck</Link>
                        <Link className="self-end bg-blue-700 px-3 py-1 rounded-lg hover:bg-blue-600 shadow-2xl text-md "
                            href={{
                                pathname: "/createCard",
                                query: { id: id }
                            }}>Add Card</Link>
                        <button className="bg-slate-700 border-slate-600 px-3 py-1 rounded-lg hover:bg-slate-600 shadow-2xl text-md "
                            onClick={() => setEditMode(!editMode)}>Close</button>
                    </>
                )
            }
        </div>
    )
}