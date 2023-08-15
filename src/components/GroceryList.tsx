import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Store";
import { removeFromStore, removeAllFromStore } from "./Store";
import { Button } from "react-bootstrap"; 
import "../styles/GroceryList.css";

function GroceryList() {
  const storeRecipes = useSelector((state: RootState) => state.groceryList.storeRecipes);
  const dispatch = useDispatch();

  const handleRemoveFromList = (storeRecipeName: string, storeIngredient: string) => {
    dispatch(removeFromStore({ storeRecipeName, storeIngredient }));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllFromStore()); // Dispatch the new action to remove all items
  };

  return (
    <div className="grocery-list-container">
      <h1>Your Grocery List:</h1>
      <div className="grocery-items">
        {Object.keys(storeRecipes).map((storeRecipeName, index) => (
          <div key={index} className="grocery-item">
            <h3>{storeRecipeName}</h3>
            <ul className="ingredient-list">
              {storeRecipes[storeRecipeName].map((storeIngredient, i) => (
                <li key={i}> * {storeIngredient}
                  <Button
                    className="grocery-list-item-button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRemoveFromList(storeRecipeName, storeIngredient)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Button
        variant="danger"
        onClick={handleRemoveAll}
        disabled={Object.keys(storeRecipes).length === 0} // Disable if the list is empty
      >
        Remove All
      </Button>
    </div>
  );
}

export default GroceryList;