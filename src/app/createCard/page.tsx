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
            <form action={createCardWithID} className="flex gap-2 flex-col border-slate-800 shadow-lg rounded-lg bg-slate-800 px-3 py-5">
                <label>Term: </label>
                <input type="text" name="term" className="
                border border-slate-300 rounded px-2 py-1 mb-4 outline-none bg-transparent focus-within:border-slate-100 focus-within:bg-slate-700"
                />
                <label>Definition: </label>
                <input type="text" name="definition" className="
                border border-slate-300 rounded px-2 py-1 mb-8 outline-none bg-transparent focus-within:border-slate-100 focus-within:bg-slate-700"
                />
                <div className="flex gap-2 justify-end">
                    <Link href=".." className="border border-slate-300  px-2 py-1 rounded
        hover:bg-slate-700">Cancel</Link>
                    <button type="submit" className="border border-slate-300  px-2 py-1 rounded
        hover:bg-slate-700">Create</button>
                </div>
            </form>
        </>
    )
}