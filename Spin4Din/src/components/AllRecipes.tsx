import React, { useState } from "react";
import { Dropdown, Card, Button, Form } from "react-bootstrap";
import { useRecipesData, Recipe } from "./RecipeFunction.tsx";
import "./AllRecipes.css";

function AllRecipes() {
  const recipesData = useRecipesData();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [dropdownValue, setDropdownValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRecipeSelection = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDropdownValue("");
    setShowDropdown(false);
  };

  const handleDropdownFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownValue(e.target.value.toLowerCase());
  };

  const filteredRecipes = recipesData
    .filter((recipe) => recipe.Name.toLowerCase().startsWith(dropdownValue))
    .sort((a, b) => a.Name.localeCompare(b.Name));

  const handleDropdownToggle = (isOpen: boolean) => {
    setShowDropdown(isOpen);
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
            <Form.Control
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
            <Card.Text>
              {selectedRecipe.Ingredients.map((ingredient, i) => (
                <span key={i}>
                  - {ingredient}
                  <br />
                </span>
              ))}
            </Card.Text>
            <Button variant="secondary" onClick={() => setSelectedRecipe(null)}>
              Close
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default AllRecipes;
