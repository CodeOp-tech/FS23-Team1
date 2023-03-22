import React, { useEffect } from "react";
import { Local } from "../helpers/Local";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

export default function RecipeView(props) {
  const {
    recipe,
    setRecipe,
    recipeInstructions,
    ingredientList,
    handleClick,
    AddOrDelete,
  } = props;

  const recipeSteps = [];
  if (recipeInstructions) {
    for (let step of recipeInstructions[0].steps) {
      recipeSteps[step.number] = step.step;
    }
  }

  useEffect(() => {
    /*
    We check if the recipe.id is empty to know if the recipe is already in the state or not.
    If it is not we get it from the local storage and set the state.
    This prevents us from getting an infinite loop: https://react.dev/reference/react/useEffect#my-effect-keeps-re-running-in-an-infinite-cycle
    */
    if (recipe.id === undefined) {
      setRecipe(Local.getFeaturedRecipe()); //set the state from the recipe we stored in the localStorage
    }
  }, [recipe]);

  return (
    <Container
      className="container"
      style={{
        display: "grid",
        justifyContent: "center",
      }}
    >
      <div className="ingredient-container">
        <h3 style={{ width: "18rem" }}>{recipe.title}</h3>
        <Card className="mb-3" style={{ width: "18rem" }}>
          <Card.Img
            style={{ width: "18rem" }}
            src={recipe.image}
            alt={recipe.title}
            className="recipe-image"
          />
        </Card>

        <div>
          {/* if added to fav heart isn't filled once clicked it calls addFav fn from App.js clicked again it calls deleteFav */}
          <button
            type="button"
            onClick={() => AddOrDelete(recipe.id)}
            className="btn btn-secondary"
          >
            <i className="bi bi-heart"> Save</i>
          </button>
          <h5 className="bi bi-hand-thumbs-up-fill">{recipe.likes}</h5>
          <h5 className="bi bi-clock-fill">
            {" "}
            Ready in {recipe.preparationTime} mins
          </h5>
        </div>

        <Card style={{ width: "18rem" }}>
          <Card.Header>
            <strong>Ingredient List</strong>
          </Card.Header>
        </Card>
        {ingredientList &&
          ingredientList.map((ingredient, index) => {
            return (
              <Card style={{ width: "18rem" }} key={index}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {ingredient.name} {ingredient.amount.metric.value}{" "}
                    {ingredient.amount.metric.unit}{" "}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            );
          })}
      </div>
      <div className="steps-container">
        <Card style={{ width: "18rem" }} className="mt-3">
          <Card.Header>
            <strong> Step-by-step preparation</strong>
          </Card.Header>
        </Card>
        {/* <h3>Step-by-step preparation</h3> */}
        {recipeInstructions &&
          recipeSteps.map((step, index) => {
            return (
              <Card style={{ width: "18rem" }} key={index}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong> {index}.</strong> {step}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            );
          })}

        <Card style={{ width: "18rem" }}>
          <Card.Header>
            <strong>Nutrition</strong>
          </Card.Header>
        </Card>

        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              calories: {recipe.nutrition.calories}
            </ListGroup.Item>
            <ListGroup.Item>carbs: {recipe.nutrition.carbs}</ListGroup.Item>
            <ListGroup.Item>fat: {recipe.nutrition.fat}</ListGroup.Item>
            <ListGroup.Item>protein: {recipe.nutrition.protein}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </Container>
  );
}
