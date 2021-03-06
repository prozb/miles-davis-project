import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from 'react-bootstrap/Badge';
import './menu.css';

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
        <div key={index} className={classes} onClick={() => props.changeMenuItem(item.name)}>
          <StyledMenuItem>
            <ListItemText primary={item.name} />
              <Badge pill variant={item.count === 0 ? "light" : "info"}>{item.count}</Badge>
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