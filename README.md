# RECIPE_APP
# [DEMO](https://youtu.be/-e37_cer0GY)

A Reach Frontend that uses Node backend to call 3rd party apis for recipes. It uses PostgresSql db - offered by Neon DB serverless db service to store, update, and retrieve favorite recipe ids.

## Frontend - 
### src/components
1. Recipe Card 
2. Recipe Modal

### src/App.tsx
1. fetchFavoriteRecipes: A useEffect Hook to fetch all favorited recipes when the page loads.
2. handleSearchSubmit: gets called when the user clicks the "search" icon after entering a "search term" to fetch the recipes.
3. handleViewMoreClick: gets called when the user clicks the "view more" button to view additional recipes.
4. addFavoriteRecipe: gets called when the user clicks the "heart" icon on the recipe card to favorite a recipe. Favorited recipes appear in the "Favorites" tab.
5. removeFavoriteRecipe: gets called when the user click the "heart" icon again to unfavorite a recipe. Unfavorited recipes get removed from the "Favorites" tab. 

### src/types.ts
1. Recipe interface 
2. Recipe Summary interface

### src/api.ts
1. searchRecipes() = `<localBaseUrl>/api/recipes/search?searchTerm=<soup>&page=<1>`
Returns recipes based on the search term and page number (returns 10 per page). Displayed as recipe cards in "Recipe Search" tab.
2. getRecipeSummary() = `<localBaseUrl>/api/recipes/${recipeId}/summary`
Returns recipe summary when a specific recipe card is clicked. Displayed as recipe modal.
3. getFavoriteRecipes() = GET `<localBaseUrl>/api/recipes/favorite`
Returns a collection of favorite recipes. Displayed as recipe cards in "Favorites" tab.
4. addFavoriteRecipe() = POST `<localBaseUrl>/api/recipes/favorite` 
Adds a recipe to favorites. Displayed as a recipe card in "Favorites" tab.
5. deleteFavoriteRecipe() = DELETE `<localBaseUrl>/api/recipes/favorite`
Removes a recipe from favorites. The recipe card no longer appears in the "Favorites" tab.

### src/App.css
Styles the App.

## Backend - 

### src/prisma/schema
Defines the model. 
`Prisma` lets us interact with the db using code.

### src/index.ts
Handles api calls using `Express`.

### src/recipe-api.ts
1. searchRecipes() = `<3rdPartybaseUrl>/api/recipes/search?searchTerm=<soup>&page=<1>`
Takes a search term and calls 3rd party api to return a collection of recipes by that term.
2. getRecipeSummary() = `<3rdPartybaseUrl>/api/recipes/${recipeId}/summary`
Takes a recipe id and calls 3rd party api to return recipe summary for that recipe. (displayed as modal)
3. getFavoriteRecipesByIDs() = `3rdPartybaseUrl/recipes/informationBulk`
Takes a list of recipe ids and calls 3rd party api to return recipe data for those ids.

Ref : https://www.freecodecamp.org/news/full-stack-project-create-a-recipe-app-using-react-node-js/
