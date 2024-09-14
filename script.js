const searchMealByNameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const searchButton = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const mealsContainer = document.getElementById('meal-container')
const randomButton = document.getElementById('random-btn')

searchButton.addEventListener('click',()=>{
    const mealName = searchInput.value.trim()
    if (mealName !== ''){
        fetchMealByName(mealName)
    }
    else{
        mealsContainer.innerHTML = '<p class="empty"> Enter a meal Name! </p>'
    }
})

//Search meals by name from API
function fetchMealByName(mealName){
    fetch(searchMealByNameURL + mealName)
    .then(response => response.json())
    .then(data => {
        displayMeals(data.meals)
        })
    .catch(error => {
        mealsContainer.innerHTML = `<p class="empty">error: ${error}</p>`
    })
}

//Displaying the meals
function displayMeals(meals){
    mealsContainer.innerHTML = ''
    if (meals){
        meals.forEach(meal => {
            mealDiv = document.createElement('div')
            mealDiv.classList.add('meals')
            mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"
            <h3>${meal.strMeal}</h3>
            <p><strong>Category: </strong>${meal.strCategory}</p>
            <p><strong>Area: </strong>${meal.strArea}</p>`
            mealsContainer.appendChild(mealDiv)           
        });
    }
    else{
         mealsContainer.innerHTML = '<p class="empty"> Meal does not exist. Try another meal! </p>'
    }
}

//Displaying the random meal
randomButton.addEventListener('click', ()=>{
    fetch(randomMealURL)
    .then(response => response.json())
    .then(data => {
        displayMeals([data.meals[0]])
        })
    .catch(error => {
         mealsContainer.innerHTML = `<p class="empty">error: ${error}</p>`
    })
})