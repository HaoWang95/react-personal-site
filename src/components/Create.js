import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

/**
 * Customized css object for UI components
 */
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    btn: {
        '&:hover': {

        }
    },
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
});

export default function Create() {
    // include the useStyles hook
    const classes = useStyles();
    const history = useHistory()
    const [title, setTitle] = useState('title name');
    const [detail, setDetail] = useState('detail info');
    const [titleError, setTitleError] = useState(false);
    const [detailError, setDetailError] = useState(false);
    const [category, setCategory] = useState('note');

    function updateTitle(e) {
        setTitle(e.target.value);
        console.log('title updated ' + title);
    }

    function updateDetail(e) {
        setDetail(e.target.value);
        console.log('detail updated ' + detail)
    }

    const cancelContent = () => {
        console.log("clear content");
        setTitle('');
        setDetail('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit content')
        title === '' ? setTitleError(true) : setTitleError(false);
        detail === '' ? setDetailError(true) : setDetailError(false);
        if (title && detail) {
            console.log(title, detail, category);
            fetch("http://localhost:8080/notes", {
                method: 'Post',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({title, detail, category})
            }).then(() => {
                history.push('/note')
            })
        }
    }


    return (
        <Container>
            <Typography
                className={classes.root}
                variant="h6"
                gutterBottom
                color="textSecondary"
                align="left"
                component="h2"
            >
                Create a new note
            </Typography>
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    className={classes.field}
                    required
                    id="outlined-required"
                    label="Plan title"
                    variant="outlined"
                    value={title}
                    onChange={updateTitle}
                    error={titleError}
                />
                <TextField
                    className={classes.field}
                    required
                    fullWidth
                    multiline
                    rowsMax={5}
                    id="outlined-required"
                    label="Plan detail"
                    variant="outlined"
                    value={detail}
                    onChange={updateDetail}
                    error={detailError}
                />
                <FormControl className={classes.field}>
                    <FormLabel>Categories</FormLabel>
                    <RadioGroup value={category} onChange={e => setCategory(e.target.value)}>
                        <FormControlLabel value="note" control={<Radio />} label="note" />
                        <FormControlLabel value="reminder" control={<Radio />} label="reminder" />
                        <FormControlLabel value="todo" control={<Radio />} label="todo" />
                        <FormControlLabel value="work" control={<Radio />} label="work" />
                    </RadioGroup>
                </FormControl>
                <Button
                    size="medium"
                    type="submit"
                    variant="outlined"
                    color="primary"
                    startIcon={<SaveIcon />}
                    endIcon={<KeyboardArrowRightIcon />}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Button
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    startIcon={<CancelIcon />}
                    endIcon={<KeyboardArrowRightIcon />}
                    onClick={cancelContent}
                >
                    Cancel
                </Button>
            </form>
        </Container>
    )
}