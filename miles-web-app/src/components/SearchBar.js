import React, { Component } from 'react';
import '../styles/search-bar.css';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: 'Search...',
      value: 'Search...',
      mouseEntered: 'false'
    };
  }

  handleChange = (text) => {
    this.setState({searchQuery: text})
  }
  render() {
    const {name} = this.props;
    const searchClass = this.mouseEntered ? "hovered-input" : '';
    return (
      <div className="search-bar">
        <div style={{flex: 6, paddingTop: 10}}>
          <p className="search-bar-text">{name}</p>
        </div>
        {/* search bar container */}
        <div className="search-bar-style" style={{alignItems: 'center', paddingRight: 15}}>
          <FormControl>
            <Input disableUnderline={true} 
              style={{color: 'rgba(255, 255, 255, 0.5)', 
                fontSize: 'large',
                borderRadius: 10, 
                padding: 7,
              }}
              onMouseEnter={() => this.setState({mouseEntered: true})}
              className={searchClass}
              onChange={this.handleChange}
              placeholder={this.state.value}
              id="search-component"
              startAdornment={<InputAdornment position="start"><SearchIcon style={{color: 'white'}} fontSize="large"/></InputAdornment>}
            />
          </FormControl>
        </div>
        {/* search bar container end */}
      </div>
    );
  }
}
