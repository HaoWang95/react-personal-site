import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import NoteCard from './NoteCard';

export default function Note() {
    const [noteList, setNoteList] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/notes')
            .then(res => res.json())
            .then(jsonData => setNoteList(jsonData))
        return () => { }
    }, []);

    const handleDelete = async (id) => {
        await fetch("http://localhost:8080/notes/"+id, {
            method:'Delete'
        });
        const newNoteList = noteList.filter(note => note.id !== id);
        setNoteList(newNoteList)
    }
    function renderNoteList() {
        return (
            <Container>
                <Grid container spacing={3}>
                    {noteList.map(note => {
                        return (
                            <Grid item key={note.id} xs={12} sm={6} md={4} lg={2}>
                                <NoteCard note={note} handleDelete={handleDelete}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        )
    }

    return renderNoteList()
}