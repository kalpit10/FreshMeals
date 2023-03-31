import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

//we mapped it to convert the array of javascript elements to jsx elements
function AvailableMeals() {
  //BECAUSSE OF ASYNCHRONOUS DATA WHICH IS WHY WE SUE ASYNC/AWAIT IT WILL RENDER FOR
  //THE FIRST TIME BUT IT WILL BE EMPTY BUT AFTER THAT IT WILL UPDATE ITSELF WITH SOME
  //DATA SO IT WILL RE-RENDER WITH THE UPDATED COMPONENT SO WE NEED A STATE FOR THI
  const [meals, setMeals] = useState([]);
  //For loading text on screen
  const [isLoading, setIsLoading] = useState(true);
  //For any errors on screen
  const [httpError, setHttpError] = useState();
  //async is not allowed directly with useEffect so we will create a function
  //inside useEffect
  useEffect(() => {
    //fetchMeals IS AN ASYNC FUNCTION AND IT ALWASY RETURNS A PROMISE
    //THAT IS WHY WE USE THE AWAIT KEYWORD
    // Asynchronous code runs in parallel.Synchronous code runs in sequence one after another
    //What is promise used for?
    // Promises are used to handle asynchronous operations in JavaScript.
    const fetchMeals = async () => {
      //we can get a response here for fetching our meals
      const response = await fetch(
        "https://freshmeals-project-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      //we use async await because it returns a promise
      const responseData = await response.json();
      //Firebase returns it in a object so we have to create a key value pair
      //where keys are the meals m1, m2 etc. and the value are the nested objects
      //with the description and all..
      //we have to return that like this everytime in any project
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          //we have an id field because in our meals data we have the id field
          id: key, //keys are the id's
          //response data for the given key in which we have a name field(check firebase)
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      //after first time we will update it with some loaded meals and re-render it
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    //Handling an error inside of a promise
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    // try {
    //   fetchMeals().then().catch();
    // } catch(error) {
    //   setIsLoading(false);
    //   setHttpError(error.message);
    // }
  }, []);

  //if we are loading so it will show us this..
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  //meals is the updated state
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
export default AvailableMeals;
