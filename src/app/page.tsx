import { prisma } from "@/src/db"
import CardListEditor from "../components/cardListEditor"

function getCards() {
  return prisma.card.findMany()
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
  const cards = await getCards()
  return (
    <div>
      <header className="flex justify-between items-center mb-10">
        <h1 className='text-5xl'>Lingo</h1>
        <button className="border border-slate-300 rounded px-2 py-1 hover:bg-slate-700"> Log In </button>
      </header>
      <CardListEditor cards={cards} deleteCard={deleteCard} />
    </div>
  )
}
