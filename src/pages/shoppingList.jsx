import React, { Component } from 'react';
import Checkbox from '../components/ui/checkbox';

class ShoppingList extends Component {
    render() {
        return (
            <div>
                <Checkbox status={true} />
            </div>
        );
    }
}

export default ShoppingList;