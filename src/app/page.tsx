import { prisma } from "@/src/db"
import Deck from "../components/deck"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@prisma/client"

async function getCards(deckId: string) {
  "use server"
  const cards = await prisma.card.findMany({
    where: {
      deckId: deckId
    }
  })

  return cards.sort((cardA: Card, cardB: Card) => cardA.order < cardB.order ? -1 : 1)
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

async function updateDeck(cards: Card[]) {
  "use server"
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    const order = i + 1
    await prisma.card.update({
      where: {
        id: card.id
      },
      data: {
        order: order
      }
    })
  }
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
        <Link href="/createDeck" className="  px-4 py-2 bg-gradient-to-br from-purple-600 to-blue-500 focus:ring-4 focus:outline-none 
        focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm shadow-lg hover:shadow-blue-500/40">
          Create Deck
        </Link>
      </header>
      {
        decks.map(async (deck) => {
          const cards = await getCards(deck.id)
          return (
            <Deck key={deck.id} cards={cards} deleteCard={deleteCard} updateDeck={updateDeck} {...deck} />
          )
        })
      }
    </div>
  )
}
