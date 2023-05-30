import Link from "next/link"

interface EditorActionsProps {
    editMode: boolean,
    setEditMode(editMode: boolean): void
}

export default function EditorActions(props: EditorActionsProps) {
    const { editMode, setEditMode } = props
    return (
        <div className="flex gap-2">
            {!editMode ?
                (<button onClick={() => setEditMode(!editMode)}
                    className="border border-slate-300 px-2 py-1 rounded
        hover:bg-slate-700">
                    Edit
                </button>)
                :
                (
                    <>
                        <button className="border border-slate-300 px-2 py-1 rounded
        hover:bg-slate-700"
                            onClick={() => setEditMode(!editMode)}>Cancel</button>
                        <Link className="border border-lime-500 px-2 py-1 rounded text-lime-500
        hover:bg-slate-700"
                            href="./createCard">Add</Link>
                    </>
                )
            }
        </div>
    )
}