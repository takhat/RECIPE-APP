import type { Recipe } from "./types";

export const searchRecipes = async (searchTerm: string, page: number, diet: string) => {
  const baseUrl = new URL(`http://localhost:5001/api/recipes/search?`);
  baseUrl.searchParams.append("diet", diet);
  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", String(page));
  

  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

export const getRecipeSummary = async (recipeId: string) => {
  const url = new URL(`http://localhost:5001/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

export const getFavoriteRecipes = async () => {
  const url = new URL(`http://localhost:5001/api/recipes/favorite`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

export const addFavoriteRecipe = async (recipe: Recipe) => {
  const url = new URL(`http://localhost:5001/api/recipes/favorite`);
  const body = {
    recipeId: recipe.id
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }); 
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const removeFavoriteRecipe = async (recipe: Recipe) => {
  const url = new URL(`http://localhost:5001/api/recipes/favorite`);
  const body = {
    recipeId: recipe.id
  };

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }); 
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};