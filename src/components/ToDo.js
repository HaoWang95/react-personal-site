import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { width } from '@material-ui/system';
import { BackgroundColor } from 'chalk';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}))

export default function ToDoList() {
    const classes = useStyles();
    const [checked, setChecked] = useState([0]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1/todos')
            .then((res) => res.json())
            .then((jsonData) => {setItems(jsonData); console.log(jsonData)})
            // make sure the data is valid then update the items
        return () => {}
    }, [])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked)
    }
    //test whether I can fetch the data
    return (
        <List className={classes.root}>
            {
                items.map((item) => {
                    let labelId = `checkbox-list-label-${item.id}`;
                    return (
                        <ListItem key={item.id.toString()}>
                            <ListItemIcon>
                                <CheckBox
                                    checked={false}
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Line Item ${item.title}`} />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}