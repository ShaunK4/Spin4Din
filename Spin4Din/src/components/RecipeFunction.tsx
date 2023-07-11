import { useState, useEffect } from "react";
import axios from "axios";
import { getApiUrl } from "../Api.tsx";

export interface Recipe {
  Name: string;
  Ingredients: string[];
}

export function useRecipesData() {
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setRecipesData(JSON.parse(storedRecipes));
    } else {
      fetchRecipes();
    }
  }, []);

  const fetchRecipes = async () => {
    try {
      const apiUrl = getApiUrl();
      const response = await axios.get(`${apiUrl}`);
      const recipeList: Recipe[] = response.data.body.map((item: any) => ({
        Name: item.Name,
        Ingredients: item.Ingredients.split("\n"),
      }));
      setRecipesData(recipeList);
      localStorage.setItem("recipes", JSON.stringify(recipeList));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return recipesData;
}

export function useExpandedRecipeIndex() {
  const [expandedRecipeIndex, setExpandedRecipeIndex] = useState<number[]>([]);

  const handleExpandIngredients = (index: number) => {
    if (expandedRecipeIndex.includes(index)) {
      setExpandedRecipeIndex((prevExpanded) =>
        prevExpanded.filter((item) => item !== index)
      );
    } else {
      setExpandedRecipeIndex((prevExpanded) => [...prevExpanded, index]);
    }
  };

  return [expandedRecipeIndex, handleExpandIngredients] as const;
}
