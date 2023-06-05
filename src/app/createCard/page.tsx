import { prisma } from "@/src/db"
import { redirect } from "next/navigation"

import Link from "next/link";

async function createCard(data: FormData, deckId: string) {
    "use server"
    // handle cases later
    const term = data.get("term")?.valueOf() as string
    const define = data.get("definition")?.valueOf() as string

    const cardsInDeck = await prisma.card.findMany({
        where: {
            deckId: deckId
        }
    })

    let highestOrder = cardsInDeck.length > 0 ? Math.max(...cardsInDeck.map((card) => card.order)) : 0

    await prisma.card.create({
        data:
        {
            term: term,
            definition: define,
            deckId: deckId,
            order: highestOrder + 1
        }
    })
}

interface paramsProps {
    searchParams: Query
}

interface Query {
    id: string
}

export default function CreateCard(props: paramsProps) {
    const deckId = props.searchParams.id
    const createCardWithID = async (data: FormData) => {
        "use server"
        if (deckId) {
            createCard(data, deckId)
        }
        redirect("/")
    }
    return (
        <>
            <header className="flex justify-between items-center mb-10">
                <h1 className='text-5xl'>Create a Card</h1>
            </header>
            <form action={createCardWithID} autoComplete='off' className="flex gap-2 flex-col border-slate-800 shadow-lg rounded-lg bg-slate-800 px-3 py-5">
                <label>Term: </label>
                <input type="text" name="term" className="border border-slate-600 px-3 py-1 rounded-lg bg-slate-700 shadow-2xl text-md focus-within:bg-slate-600 mb-4" />
                <label>Definition: </label>
                <input type="text" name="definition" className="border border-slate-600 px-3 py-1 rounded-lg bg-slate-700 shadow-2xl text-md focus-within:bg-slate-600 mb-8" />
                <div className="flex gap-2 justify-end">
                    <Link href=".." className="border border-slate-600 px-3 py-1 rounded-lg bg-slate-700 shadow-2xl hover:bg-slate-600 hover:shadow-blue-500/40">Cancel</Link>
                    <button type="submit" className="px-3 py-1 bg-gradient-to-br from-purple-600 to-blue-500 focus:ring-4 focus:outline-none 
        focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg shadow-lg hover:shadow-blue-500/40">Create</button>
                </div>
            </form>
        </>
    )
}