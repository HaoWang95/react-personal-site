import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import NoteCard from './NoteCard';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function Note() {
    const [noteList, setNoteList] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/notes')
            .then(res => res.json())
            .then(jsonData => setNoteList(jsonData))
        return () => { }
    }, []);

    const handleDelete = async (id) => {
        await fetch("http://localhost:8080/notes/" + id, {
            method: 'Delete'
        });
        const newNoteList = noteList.filter(note => note.id !== id);
        setNoteList(newNoteList)
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const [reorderedNoteList] = noteList.splice(result.source.index, 1);
        noteList.splice(result.destination.index, 0, reorderedNoteList);
        setNoteList(noteList);
    }


    function renderNoteList() {
        return (
            <Container>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="dndGrid">
                        {(provided) => (
                            <Grid container spacing={3} className="dndGrid" {...provided.droppableProps} ref={provided.innerRef} >
                                {noteList.map((note, index) => {
                                    //console.log(note.id, index);
                                    return (
                                        <Draggable key={note.id.toString()} index={index} draggableId={note.id.toString()}>
                                            {(providedDraggable) => (
                                                <Grid
                                                    {...providedDraggable.draggableProps}
                                                    {...providedDraggable.dragHandleProps}
                                                    ref={providedDraggable.innerRef}
                                                    item
                                                    key={note.id}
                                                    xs={12} sm={6} md={4} lg={4}
                                                >
                                                    <NoteCard note={note} handleDelete={handleDelete} />
                                                </Grid>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>
            </Container>
        )
    }
    return renderNoteList()
}