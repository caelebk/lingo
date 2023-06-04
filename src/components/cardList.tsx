import Card from "./card"
import { DragDropContext, Draggable, Droppable, resetServerContext } from 'react-beautiful-dnd'


interface CardListProps {
    id: string,
    cards: any[],
    editMode: boolean,
    deleteCard(id: string): void,
    updateDeck(cards: unknown[]): void,
}

export default function CardList(props: CardListProps) {
    resetServerContext();
    const { id, editMode, deleteCard, updateDeck } = props

    let cards = props.cards
    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return
        const dragIndex = result.source.index
        const dropIndex = result.destination.index
        const [draggedItem] = cards.splice(dragIndex, 1)
        cards.splice(dropIndex, 0, draggedItem)
        updateDeck(cards)
    }
    return (
        <div key={id}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="cards">
                    {(provided) => (
                        <ul className="flex flex-col" {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                cards?.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id} index={index} isDragDisabled={!editMode}>
                                        {(provided) => (
                                            <div key={card.id} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                <Card key={card.id} id={card.id} term={card.term} definition={card.definition} deleteCard={deleteCard}
                                                    editMode={editMode} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}