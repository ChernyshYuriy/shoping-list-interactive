import { useNavigate } from "react-router-dom";
import { React } from 'react';
import ShoppingListDisplay from "./shoping-list-display";
function ShoppingListContainer() {
    const nav = useNavigate()
    return <ShoppingListDisplay nav={nav}/>
}
export default ShoppingListContainer