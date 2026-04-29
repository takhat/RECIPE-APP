import express from "express";
import cors from "cors";
import "dotenv/config";
import * as RecipeAPI from "./recipe-api.ts";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const app = express(); // Create an Express application
// 1. Create a native Node-Postgres connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Wrap it in the Prisma 7 driver adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the Prisma constructor
const prismaClient = new PrismaClient({ adapter });
export default prismaClient;

app.use(express.json()); // convert the body of requests and responses into JSON objects
app.use(cors()); // Enable CORS (security) for all routes

app.get("/api/recipes/search", async (req, res) => {
  // http://localhost:5001/api/recipes/search?searchTerm=Breakfast&page=1
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const diet = req.query.diet as string;
  const results = await RecipeAPI.searchRecipes(searchTerm, page, diet);

  return res.json(results);
});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const results = await RecipeAPI.getRecipeSummary(recipeId);
    return res.json(results);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/recipes/favorite", async (req, res) => {
  const recipeId = req.body.recipeId;
  try {
    const favoriteRecipe = await prismaClient.favoriteRecipes.create({
      data: {
        recipeId: recipeId,
      },
    });
    return res.status(201).json(favoriteRecipe);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while saving the favorite recipe." });
  }
});

app.get("/api/recipes/favorite", async (req, res) => {
  try {
    const favoriteRecipes = await prismaClient.favoriteRecipes.findMany();
    const recipeIds = favoriteRecipes.map((recipe) =>
      recipe.recipeId.toString()
    );

    const favorites = await RecipeAPI.getFavoriteRecipesByIDs(recipeIds);
    return res.json(favorites);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching favorite recipes." });
  }
});

app.delete("/api/recipes/favorite", async (req, res) => {
  const recipeId = parseInt(req.body.recipeId);
  try {
    await prismaClient.favoriteRecipes.delete({
      where: {
        recipeId: recipeId,
      },
    });
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the favorite recipe." });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});
