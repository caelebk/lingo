import { prisma } from "@/src/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createDeck(data: FormData) {
    "use server"

    // handle cases later
    const title = data.get("title")?.valueOf() as string
    await prisma.deck.create({
        data:
        {
            title: title,
            cards: {}
        }
    })
    redirect("/")
}

export default function CreateDeck() {
    return (
        <>
            <header className="flex justify-between items-center mb-10">
                <h1 className='text-5xl'>Create a Deck</h1>
            </header>
            <form action={createDeck} className="flex gap-2 flex-col border-slate-800 shadow-lg bg-slate-800 rounded-lg px-3 py-5">
                <label>Deck Name: </label>
                <input type="text" name="title" className="border border-slate-600 px-3 py-1 rounded-lg bg-slate-700 shadow-2xl text-md focus-within:bg-slate-600 mb-8" />
                <div className="flex gap-2 justify-end">
                    <Link href=".." className="border border-slate-600 px-3 py-1 rounded-lg bg-slate-700 shadow-2xl hover:bg-slate-600 hover:shadow-blue-500/40">Cancel</Link>
                    <button type="submit" className="px-3 py-1 bg-gradient-to-br from-purple-600 to-blue-500 focus:ring-4 focus:outline-none 
        focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg shadow-lg hover:shadow-blue-500/40">Create</button>
                </div>
            </form >
        </>
    )
}