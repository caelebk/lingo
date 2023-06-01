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
                <input type="text" name="title" className="
                border border-slate-300 rounded px-2 py-1 mb-8 outline-none bg-transparent focus-within:border-slate-100 focus-within:bg-slate-700"
                />
                <div className="flex gap-2 justify-end">
                    <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded
        hover:bg-slate-700">Cancel</Link>
                    <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded
        hover:bg-slate-700">Create</button>
                </div>
            </form>
        </>
    )
}