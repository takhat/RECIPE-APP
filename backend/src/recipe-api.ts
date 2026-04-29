const apiKey = process.env.API_KEY;

export const searchRecipes = async (
  searchTerm: string,
  page: number,
  diet: string
) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

  const queryParams = {
    apiKey,
    query: searchTerm,
    diet: diet,
    number: "10",
    offset: (page * 10).toString(),
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url);
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};

// get Summary for each recipe card
export const getRecipeSummary = async (recipeId: string) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );

  const queryParams = {
    apiKey,
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(url);
    const summaryJson = await response.json();
    return summaryJson;
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteRecipesByIDs = async (ids: string[]) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  const url = new URL(`https://api.spoonacular.com/recipes/informationBulk`);

  const params = {
    apiKey,
    ids: ids.join(","),
  };
  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url);
    const recipesJson = await response.json();
    return { results: recipesJson };
  } catch (error) {
    console.log(error);
  }
};
