import { prisma } from "@/src/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createCard(data: FormData) {
    "use server"

    // handle cases later
    const term = data.get("term")?.valueOf() as string
    const define = data.get("definition")?.valueOf() as string

    await prisma.card.create({
        data:
        {
            term: term,
            definition: define
        }
    })
    redirect("/")
}

export default function CreateCard() {
    return (
        <>
            <header className="flex justify-between items-center mb-10">
                <h1 className='text-5xl'>Create a Card</h1>
            </header>
            <form action={createCard} className="flex gap-2 flex-col border border-slate-300 rounded px-3 py-5">
                <label>Term: </label>
                <input type="text" name="term" className="
                border border-slate-300 rounded px-2 py-1 mb-4 outline-none bg-transparent focus-within:border-slate-100 focus-within:bg-slate-700"
                />
                <label>Definition: </label>
                <input type="text" name="definition" className="
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