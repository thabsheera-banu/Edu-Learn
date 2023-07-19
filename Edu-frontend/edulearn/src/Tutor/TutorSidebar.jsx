


import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'rgb(28, 48, 92)', // Navy blue background color
    color: '#FFFFFF', // White text color
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

function TutorSidebar() {
  const {logout} = useContext(AuthContext)
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () =>{
    logout()
  }

  const drawer = (
    <div>
      <div><h5 className='mt-5 ms-5'>Teacher  panel</h5></div>
      
      <div className={classes.toolbar} />
      
      
      <List>
      <ListItem button component={Link} to="/">
          <ListItemIcon>
          <HomeIcon style={{ color: '#FFFFFF' }}/>
          </ListItemIcon >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/tutor/dashboard">
          <ListItemIcon>
            <DashboardIcon style={{ color: '#FFFFFF' }} /> {/* White icon color */}
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/tutor/profile">
          <ListItemIcon>
            <AccountCircleIcon style={{ color: '#FFFFFF' }} /> {/* White icon color */}
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/tutor/course">
          <ListItemIcon>
            <AssignmentIcon style={{ color: '#FFFFFF' }} /> {/* White icon color */}
          </ListItemIcon>
          <ListItemText primary="My Courses" />
        </ListItem>
        <ListItem button component={Link} to="/tutor/addcourse">
             <ListItemIcon>
             <PersonIcon style={{ color: '#FFFFFF' }} />
             </ListItemIcon>
            <ListItemText primary="Add Courses" />
        </ListItem>
        <ListItem button component={Link} to="/tutor/studentlist">
             <ListItemIcon>
             <PersonIcon style={{ color: '#FFFFFF' }} />
             </ListItemIcon>
            <ListItemText primary="My students" />
        </ListItem>
        <ListItem button onClick={handleLogout} >
          <ListItemIcon>
            <ExitToAppIcon style={{ color: '#FFFFFF' }} /> {/* White icon color */}
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
}

export default TutorSidebar;


