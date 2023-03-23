import React from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import "./Favorites.css";
import noFavNugget from "../img/noFavNugget.gif";
import { FcClock } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";

const FavoritesView = (props) => {
  const { allFav, showRecipeFavCb, recipeInstructionsCb, ingredientListCb } =
    props;

  const handleClick = (recipe_id) => {
    recipeInstructionsCb(recipe_id);
    ingredientListCb(recipe_id);
    showRecipeFavCb(recipe_id); //time, nutrition
    console.log("someone is clicking on a fav card");
  };

  //get all from fav by user id and display it
  return (
    <div>
      <h1 style={{ padding: 20, "text-align": "center" }}>
        My favorite recipes
      </h1>

      <Container
        style={{
          display: "grid",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        {allFav ? (
          <Row xs={1} md={2} className="g-4">
            <Col>
              {allFav.map((recipe) => (
                <Card
                  key={recipe.user_id}
                  className="card-recipe"
                  style={{ width: "18rem" }}
                  onClick={(e) => handleClick(recipe.recipe_id)}
                >
                  <div className="container">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      id="buttononrecipe"
                    >
                      <i id="heartbutton" className="bi bi-heart"></i>
                    </button>
                    <Card.Img variant="top" src={recipe.recipe_image_url} />
                  </div>

                  <Card.Body>
                    <Card.Title>{recipe.recipe_title}</Card.Title>
                    <Card.Subtitle>
                      <FcClock size="2rem" />
                      Ready in {recipe.preparationTime} mins
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        ) : (
          <div>
            <p>
              Your list is empty. Time to add favorites for some happy cooking.
            </p>
            <img src={noFavNugget} width="200" height="200"></img>
          </div>
        )}
      </Container>
    </div>
    //show all boards from DB
  );
};

export default FavoritesView;
