import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        maxWidth: 450
    }
}))

export default function ToDoList() {
    const classes = useStyles();
    const [checked, setChecked] = useState([0]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log('render start')
        fetch('https://jsonplaceholder.typicode.com/users/1/todos')
            .then((res) => res.json())
            .then(
                (jsonData) => {setItems(jsonData);})
            // make sure the data is valid then update the items
        console.log('render end');
        return () => {}
    }, [])

    const handleToggle = (index) => {
        let currentCheckedValue = checked.indexOf(index); // get the current checked value
        let checkedCopy = [...checked]; // make a copy of the checked array for setState update
        // if currentCheckedValue is -1, which means the current index has not been checked before
        // push it into the checked copy to make it checked
        // if the currentCheckedValue is not -1, delete it from the list to make it unchecked
        currentCheckedValue === -1 ? checkedCopy.push(index) : checkedCopy.splice(currentCheckedValue, 1)
        setChecked(checkedCopy)
        console.log(checkedCopy)
    }

    const handleTextRender = (index, text) => {
        // if the current index text is not selected, set it to normal text
        // if the current index text is selected, set it to <strike>
        return (
            checked.indexOf(index) === -1 ? <>{text}</> : <strike>{text}</strike>
        )
    }
    //test whether I can fetch the data
    return (
        <List className={classes.root}>
            {
                items.map((item, index) => {
                    let labelId = `checkbox-list-label-${item.id}`;
                    return (
                        <ListItem key={index.toString()} onClick={() => handleToggle(index)}>
                            <ListItemIcon>
                                <CheckBox
                                    checked={checked.indexOf(index) !== -1}
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} >
                                {handleTextRender(index, item.title)}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="detail">
                                    <MoreHorizOutlinedIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })
            }
        </List>
    )
}