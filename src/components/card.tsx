"use client"
import { useRouter } from 'next/navigation';

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

    return (
        <li className="flex items-center m-2">
            {editMode ?
                <button onClick={() => {
                    deleteCard(id)
                    router.refresh()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-0.5
                stroke-red-500 border border-red-500 rounded-full mr-2 hover:cursor-pointer hover:bg-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                :
                <></>
            }
            <div className="flex grow justify-between items-center border border-slate-300 text-slate-300 rounded px-2 py-1">
                <span>{term}</span>
                <span>{definition}</span>
            </div>

        </li>
    )
}
