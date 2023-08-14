import { useState, useEffect } from "react";
import demoData from "../assets/DemoData.json";

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

  const fetchRecipes = () => {
    const recipeList: Recipe[] = demoData.map((item: any) => ({
      Name: item.Name.S,
      Ingredients: item.Ingredients.S.split("\n"),
    }));
    setRecipesData(recipeList);
    localStorage.setItem("recipes", JSON.stringify(recipeList));
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
