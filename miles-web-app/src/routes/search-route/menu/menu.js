import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from 'react-bootstrap/Badge';
import './menu.css';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      margin: '1px',
      'border-top-left-radius': '5px',
      'border-top-right-radius': '5px',
      'border-bottom-left-radius': '5px',
      'border-bottom-right-radius': '5px',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
        'font-weight': 'bold',
      },
    },
  },
}))(MenuItem);


export default function CustomizedMenus(props) {
  function getMenuListItems (data) {
    var menuItems = [];

    data.forEach((item, index) => {
      var classes = ""
      if(index === 0){
        classes = "first-menu-item menu-item";
      }else if(index === data.length - 1){
        classes = "last-menu-item menu-item";
      }else{
        classes = "menu-item";
      }

      menuItems.push(
        <div className={classes}>
          <StyledMenuItem>
            <ListItemText primary={item.name} />
              <Badge className="badge-class" pill variant={item.count === 0 ? "light" : "secondary"}>{item.count}</Badge>
          </StyledMenuItem>
        </div>
      )
    });

    return menuItems;
  }

  return (
    <div className="menu-container">
      {getMenuListItems(props.data)}
    </div>
  );
}