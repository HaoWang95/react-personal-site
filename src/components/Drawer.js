import { ListItemText, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";

const drawerWidth = 240

const userStyles = makeStyles({
    drawer:{
        width: drawerWidth
    },
    drawerPaper:{
        width: drawerWidth
    },
    active:{
        background: '#f4f4f4'
    }
});

const menuItems=[
    {
        text: 'My plans',
        icon: <SubjectOutlined color='secondary' />,
        path:'/'
    },
    {
        text: 'Create note/plan',
        icon: <AddCircleOutlined color='secondary' />,
        path:'/create'
    }
]

export default function DrawerComponent(){
    const classes = userStyles();
    const history = useHistory();
    const location = useLocation();

    return(
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper}}
        >
            <div>
                <Typography variant="h5">
                    My plans
                </Typography>
            </div>
            <List>
                {menuItems.map(item => {
                    return(
                    <ListItem 
                        key={item.text}
                        button
                        onClick={() => history.push(item.path)}
                        className={location.pathname === item.path ? classes.active : null}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText>
                            {item.text}
                        </ListItemText>
                    </ListItem>
                    )
                })}
            </List>
        </Drawer>
    )
}