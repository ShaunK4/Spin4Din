import { useEffect, useState } from "react";
import "../styles/RecipeList.css";
import { Recipe, useRecipesData } from "./RecipeFunction.tsx";

function RecipeList() {
  const recipesData = useRecipesData();
  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);

  useEffect(() => {
    if (recipesData.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipesData.length);
      const randomRecipeData = recipesData[randomIndex];
      setRandomRecipe(randomRecipeData || null);
    }
  }, [recipesData]);

  const generateNewRecipe = () => {
    if (recipesData.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipesData.length);
      const randomRecipeData = recipesData[randomIndex];
      setRandomRecipe(randomRecipeData || null);
      setShowRecipe(true);
    }
  };

  return (
    <div className="recipe-list">
      <h2>Randomly Chosen Recipe:</h2>
      <div className="recipe-container">
        {showRecipe && randomRecipe && (
          <div>
            <div className="recipe-name-banner">
              <div className="recipe-name">{randomRecipe.Name}</div>
            </div>
            <div className="ingredients">
              <div className="ingredients-title">Ingredients:</div>
              <div className="ingredients-list">
                {randomRecipe.Ingredients.map((ingredient, index) => (
                  <div key={index}>~ {ingredient}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="generate-button-container">
        <button className="generate-button" onClick={generateNewRecipe}>
          Generate New Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeList;
