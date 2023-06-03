import { prisma } from "@/src/db";
import Link from "next/link";
import DeleteButton from "@/src/components/deleteButton";

async function deleteDeck(id: string) {
    "use server"
    await prisma.card.deleteMany({
        where: {
            deckId: id
        }
    })
    await prisma.deck.delete({
        where: {
            id: id
        }
    })
}

interface paramsProps {
    searchParams: Query
}

interface Query {
    id: string,
    title: string
}

export default function DeleteDeck(props: paramsProps) {
    "use client"
    const title = props.searchParams.title ? props.searchParams.title : "temp"
    const deckId = props.searchParams.id ? props.searchParams.id : ""
    return (
        <>
            <header className="flex justify-between items-center mb-64">
                <h1 className='text-5xl'>Delete a Deck</h1>
            </header>
            <div className="flex flex-col items-center justify-between gap-10">
                <h1 className="text-4xl">Are you sure you want to delete {title}?</h1>
                <div className="flex justify-center items-center gap-5">
                    <Link className="self-end border border-slate-300 px-10 py-2 rounded text-slate-300
        hover:bg-slate-700 hover:text-red-400 hover:cursor-pointer"
                        href="">
                        No
                    </Link>
                    <DeleteButton deleteDeck={deleteDeck} deckId={deckId} />
                </div>
            </div>
        </>
    )
}