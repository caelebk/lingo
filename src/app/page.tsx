import { prisma } from "@/src/db"
import Deck from "../components/deck"
import Link from "next/link"
import Image from "next/image"

function getCards(deckId: string) {
  return prisma.card.findMany({
    where: {
      deckId: deckId
    }
  })
}

function getDecks() {
  return prisma.deck.findMany()
}

async function deleteCard(id: string) {
  "use server"
  await prisma.card.delete({
    where: {
      id: id
    }
  })
}

export default async function Home() {
  const decks = await getDecks()
  return (
    <div>
      <header className="flex justify-between items-center mb-10">
        <h1 className='flex justify-center items-center gap-3 text-5xl'>
          <Image src="/favicon.ico" width={48} height={48} alt="Logo" />
          Lingo
        </h1>
        <Link href="/createDeck" className="border border-slate-300 rounded px-2 py-1 hover:bg-slate-700"> Create Deck </Link>
      </header>
      {
        decks.map(async (deck) => {
          const cards = await getCards(deck.id)
          return (
            <Deck key={deck.id} cards={cards} deleteCard={deleteCard} {...deck} />
          )
        })
      }
    </div>
  )
}
