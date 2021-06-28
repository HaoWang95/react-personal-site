import React from 'react';
import { makeStyles } from '@material-ui/core'
import Drawer from './Drawer';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => {
    const drawerWidth = 240;
    return {
        page: {
            width: '100%',
            background: '#f9f9f9',
            padding:theme.spacing(3)
        },
        root:{
            display: 'flex'
        },
        title:{
            padding: theme.spacing(3),
            
        },
        appbar:{
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: '#f9f9f9'
        },
        toolbar: theme.mixins.toolbar,
        heading:{
            flexGrow: 1
        }
    }
})
// The layout component
export default function Layout({ children }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* Appbar */}
            <AppBar elevation={0} className={classes.appbar}>
                <ToolBar>
                    <Typography variant='h5' className={classes.heading}>
                        Plan yourself, now
                    </Typography>
                    <Typography variant='h5'>
                        Alan
                    </Typography>
                </ToolBar>
            </AppBar>          

            {/* Permanent drawer on the left side */}
            <Drawer className={classes.appbar} />
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}