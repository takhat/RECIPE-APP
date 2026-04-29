import { type Recipe } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  recipe: Recipe;
  onClick: () => void;
  onFavoriteButtonClick: (recipe: Recipe) => void;
  isFavorite: boolean;
}

const RecipeCard = ({
  recipe,
  onClick,
  onFavoriteButtonClick,
  isFavorite,
}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-card-title">
        <span
          onClick={(event) => {
            event.stopPropagation(); // ignore onclick on the nested recipe card and only trigger the favorite button click
            onFavoriteButtonClick(recipe);
          }}
        >
          {isFavorite ? (
            <AiFillHeart size={25} color="palevioletred" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
