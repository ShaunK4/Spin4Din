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
    }
  };

  return (
    <div className="recipe-list">
      <h2>Randomly Chosen Recipe:</h2>
      <div className="random-recipe">
        {randomRecipe && <span>{randomRecipe.Name}</span>}
      </div>

      {randomRecipe && (
        <div className="ingredients">
          <h3>Ingredients:</h3>
          <p>{randomRecipe.Ingredients.join("\n")}</p>
        </div>
      )}

      <button className="generate-button" onClick={generateNewRecipe}>
        Generate New Recipe
      </button>
    </div>
  );
}

export default RecipeList;
