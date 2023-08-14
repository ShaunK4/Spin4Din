import { useSelector, useDispatch } from "react-redux";
import { RootState, removeFromStore, removeAllFromStore } from "./Store";
import { Button, Modal } from "react-bootstrap";
import "../styles/GroceryModal.css";

interface GroceryListModalProps {
  show: boolean;
  onClose: () => void;
}

function GroceryListModal({ show, onClose }: GroceryListModalProps) {
  const storeRecipes = useSelector((state: RootState) => state.groceryList.storeRecipes);
  const dispatch = useDispatch();

  const handleRemoveFromList = (storeRecipeName: string, storeIngredient: string) => {
    dispatch(removeFromStore({ storeRecipeName, storeIngredient }));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllFromStore()); // Dispatch the new action to remove all items
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Your Grocery List:</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-content">
        <div className="grocery-items">
          {Object.keys(storeRecipes).map((storeRecipeName, index) => (
            <div key={index} className="grocery-item">
              <h3>{storeRecipeName}</h3>
              <ul className="ingredient-list">
                {storeRecipes[storeRecipeName].map((storeIngredient, i) => (
                  <li key={i}>
                    - {storeIngredient}
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
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button
          variant="danger"
          onClick={handleRemoveAll}
          disabled={Object.keys(storeRecipes).length === 0} // Disable if the list is empty
        >
          Remove All
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GroceryListModal;
