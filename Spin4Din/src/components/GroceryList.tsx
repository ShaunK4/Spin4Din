import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Store";
import { removeFromStore } from "./Store";
import { Button } from "react-bootstrap"; 
import "./GroceryList.css";

function GroceryList() {
  const storeRecipes = useSelector((state: RootState) => state.groceryList.storeRecipes);
  const dispatch = useDispatch();

  const handleRemoveFromList = (storeRecipeName: string, storeIngredient: string) => {
    dispatch(removeFromStore({ storeRecipeName, storeIngredient }));
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
    </div>
  );
}

export default GroceryList;