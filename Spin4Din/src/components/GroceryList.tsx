import { useSelector, useDispatch } from "react-redux";
import { RootState, removeIngredient } from "./Store";
import { Button } from "react-bootstrap";
import "./GroceryList.css";

function GroceryList() {
  const ingredients = useSelector(
    (state: RootState) => state.groceryList.ingredients
  );
  const dispatch = useDispatch();

  const handleRemoveIngredient = (ingredient: string) => {
    dispatch(removeIngredient(ingredient));
  };

  return (
    <div className="grocery-list-container">
      <h1>Grocery List</h1>
      <div className="grocery-list">
        {ingredients.map((ingredient: string, index: number) => (
          <div className="grocery-list-item" key={index}>
            <span className="grocery-list-item-text">{ingredient}</span>
            <Button
              className="grocery-list-item-button"
              variant="secondary"
              size="sm"
              onClick={() => handleRemoveIngredient(ingredient)}
            >
              - Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroceryList;