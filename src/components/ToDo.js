import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

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
        let currentCheckedValue = checked.indexOf(index);
        let checkedCopy = [...checked];
        currentCheckedValue === -1 ? checkedCopy.push(index) : checkedCopy.splice(currentCheckedValue, 1)
        setChecked(checkedCopy)
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
                            <ListItemText id={labelId} >{item.title}</ListItemText>
                        </ListItem>
                    )
                })
            }
        </List>
    )
}