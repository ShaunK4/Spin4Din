import { useEffect, useState } from "react";
// import { RandomReveal } from "react-random-reveal";
import axios from "axios";
import { getApiUrl } from "../Api.tsx";
import "./RecipeList.css";

interface Recipe {
  Name: string;
  Ingredients: string[];
}

function RecipeList() {
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (recipesData.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipesData.length);
      const randomRecipeData = recipesData[randomIndex];
      setRandomRecipe(randomRecipeData || null);
    }
  }, [recipesData]);

  const fetchRecipes = async () => {
    try {
      if (recipesData.length === 0) {
        const apiUrl = getApiUrl();
        const response = await axios.get(`${apiUrl}`);
        const recipeList: Recipe[] = response.data.body.map((item: any) => ({
          Name: item.Name,
          Ingredients: item.Ingredients.split("\n"),
        }));
        setRecipesData(recipeList);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

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
                {randomRecipe.Ingredients.join("\n")}
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
