import { t } from 'i18next';
import React, { Component } from 'react';

class SearchByLater extends Component {
    state = {
        message : ''
    }

    onSearch(e) {
        e.preventDefault();
        const later = document.getElementById("searchLaterInput").value;
        const searchBlock = document.getElementById(`#${later.toLowerCase()}`);
        if (!!searchBlock) {
          document.getElementsByTagName("html")[0].scrollTop =
            searchBlock.offsetTop + 60;
    
            this.setState({message : ''}) 

          searchBlock.className = "active-later";
    
          setTimeout(() => {
            searchBlock.className = "";
          }, 3000);
        }else{
           this.setState({message : 'value_not_founded'}) 
        }
        console.log(searchBlock, "searchBlock");
        console.log(document.getElementsByTagName("html")[0].scrollTop, "window");
        console.log(document.getElementsByTagName("html")[0].scrollTop, "window");
      }

    render() {
        return (
            <React.Fragment>
              <form onSubmit={(e) => this.onSearch(e)}>
                <input id="searchLaterInput" type="text" />
                <button>Search</button>
              </form>
              {t(this.state.message)}
            </React.Fragment>
          );
    }
}

export default SearchByLater;
