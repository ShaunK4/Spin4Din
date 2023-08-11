import React, { useState } from "react";
import { Dropdown, Card, Button } from "react-bootstrap";
import { useRecipesData, Recipe } from "./RecipeFunction.tsx";
import { useDispatch } from "react-redux";
import { addedToStore } from "./Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import "./AllRecipes.css";

function AllRecipes() {
  const allRecipesData = useRecipesData();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [dropdownValue, setDropdownValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [ingredientsToAddToStore, setIngredientsToAddToStore] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleRecipeSelection = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDropdownValue("");
    setShowDropdown(false);
  };

  const handleDropdownFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownValue(e.target.value.toLowerCase());
  };

  const filteredRecipes = allRecipesData
    .filter((recipe) => recipe.Name.toLowerCase().startsWith(dropdownValue))
    .sort((a, b) => a.Name.localeCompare(b.Name));

  const handleDropdownToggle = (isOpen: boolean) => {
    setShowDropdown(isOpen);
  };

  const isIngredientAdded = (ingredient: string) => {
    return ingredientsToAddToStore.includes(ingredient);
  };

  const handleIngredientSelect = (recipe: Recipe, ingredient: string) => {
    if (!isIngredientAdded(ingredient)) {
      setIngredientsToAddToStore((prevIngredients) => [...prevIngredients, ingredient]);
      dispatch(addedToStore({ storeRecipeName: recipe.Name, storeIngredient: ingredient }));
    }
  };

  return (
    <div className="all-recipes-container">
      <h2>All Recipes:</h2>
      <div className="dropdown-wrapper">
        <Dropdown
          className={`recipes-dropdown ${showDropdown ? "show" : ""}`}
          show={showDropdown}
          onToggle={handleDropdownToggle}
        >
          <Dropdown.Toggle variant="secondary">
            {selectedRecipe ? selectedRecipe.Name : "Select Recipe"}
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu">
            <input
              autoFocus
              className="dropdown-filter"
              placeholder="Type to search..."
              onChange={handleDropdownFilter}
              value={dropdownValue}
            />
            <div className="dropdown-menu-wrapper">
              <div className="dropdown-menu-inner">
                <ul className="dropdown-menu-list">
                  {filteredRecipes.map((recipe, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleRecipeSelection(recipe)}
                    >
                      {recipe.Name}
                    </Dropdown.Item>
                  ))}
                </ul>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {selectedRecipe && (
        <Card className="selected-recipe">
          <Card.Body className="text-center">
            <Card.Title>{selectedRecipe.Name}</Card.Title>
            <Card.Text className="ingredient-list">
              {selectedRecipe.Ingredients.map((ingredient, i) => (
                <span key={i} className="ingredient-list-item">
                  - {ingredient}
                  <Button
                    className={`add-button ${isIngredientAdded(ingredient) ? "added" : ""}`}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleIngredientSelect(selectedRecipe, ingredient)}
                  >
                    {isIngredientAdded(ingredient) ? <FontAwesomeIcon icon={faCheck} style={{ color: "#fff" }} /> : "+"}
                  </Button>
                </span>
              ))}
            </Card.Text>
            <Button
              className="close-button"
              variant="secondary"
              onClick={() => setSelectedRecipe(null)}
            >
              Close
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default AllRecipes;