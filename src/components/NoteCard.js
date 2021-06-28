import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { CardActions, CardContent, CardHeader, IconButton } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/WorkOffOutlined';
import NoteIcon from '@material-ui/icons/NoteOutlined';
import DoneIcon from '@material-ui/icons/DoneOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarTodayOutlined';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import transitions from '@material-ui/core/styles/transitions';

const useStyles = makeStyles({
    expand:{
        transform:'rotate(0deg)',
        transition: transitions.create('transform', {
            duration: transitions.duration.short,
        })
    },
    expandOpen:{
        transform:'rotate(180deg)'
    },
    cardBoarder:{
        border: (note) => {
            if(note.category === 'work'){
                return '1px solid red'
            }
            if(note.category === 'todo'){
                return '1px solid green'
            }

            if(note.category === 'reminder'){
                return '1px solid purple'
            }

            if(note.category === 'note'){
                return '1px solid blue'
            }
        }
    }
})

export default function NoteCard({ note, handleDelete }) {
    const classes = useStyles(note);
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(prev => !prev)
    }

    function conditionCategory() {
        console.log('render')
        if (note.category === 'work') {
            return <WorkIcon />
        }
        if (note.category === 'note') {
            return <NoteIcon />
        }
        if (note.category === 'todo') {
            return <DoneIcon />
        }
        if (note.category === 'reminder') {
            return <CalendarTodayIcon />
        }
    }

    return (
        <Card 
            elevation={1}
            className={classes.cardBoarder}
        >
            <CardHeader
                action={
                    <IconButton aria-label="Category">
                        {conditionCategory()}
                    </IconButton>
                }
                title={note.title}
            />
            <CardContent>
                <Typography noWrap variant="body2" color="textPrimary">
                    {note.detail}
                </Typography>
            </CardContent>

            <CardActions >
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]:expanded
                    })}
                    aria-expanded={expanded}
                    onClick={handleExpand}
                >
                    <ExpandMoreIcon />
                </IconButton>
                    <DeleteOutlinedIcon onClick={() => {console.log('delete'); handleDelete(note.id)}} />
                <IconButton>

                </IconButton>
            </CardActions>
            <Collapse in={expanded} unmountOnExit>
                <CardContent>
                    <Typography variant="body2">{note.detail}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}