import Card from "./card"

interface CardListProps {
    cards: any[],
    editMode: boolean,
    deleteCard(id: string): void
}

export default function CardList(props: CardListProps) {
    const { cards, editMode, deleteCard } = props
    return (
        <ul>
            {cards?.map(card => (
                <Card key={card.id} id={card.id} term={card.term} definition={card.definition} deleteCard={deleteCard}
                    editMode={editMode}></Card>
            ))}
        </ul>
    )
}