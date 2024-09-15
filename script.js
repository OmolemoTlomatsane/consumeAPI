const searchMealByNameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

if (document.getElementById('search-btn')){
    const searchButton = document.getElementById('search-btn')
    const searchInput = document.getElementById('search-input')
    const mealsContainer = document.getElementById('meal-container')
    const randomButton = document.getElementById('random-btn')
//Search button functionality to get mealName from input
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
        .then(data =>{
            displayMeals(data.meals)
        })
        .catch(error =>  {
            mealsContainer.innerHTML = `<p class="empty">${error}</p>`
        })
    }
    
    //Displaying the meals
    function displayMeals(meals){
    mealsContainer.innerHTML = ''
    if (meals){
        meals.forEach(meal => {
            const mealDiv = document.createElement('div')
            mealDiv.classList.add('meals')
            mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><strong>Category: </strong>${meal.strCategory}</p>
            <p><strong>Area: </strong>${meal.strArea}</p>
            <a href="info.html?mealId=${meal.idMeal}">More Info</a>`
            mealsContainer.appendChild(mealDiv)
        });
    }
    else{
         mealsContainer.innerHTML = '<p class="empty"> Meal does not exist. Try another meal! </p>'
    }}

    //Displaying the random meal
    randomButton.addEventListener('click', ()=>{
    fetch(randomMealURL)
    .then(response => response.json())
    .then(data => {
        displayMeals([data.meals[0]])
        })
    .catch(error => {
         mealsContainer.innerHTML = `<p class="empty">${error}</p>`
    })})

}

// Code for info.html
if (document.getElementById('mealInformation')){
    const mealInfo = document.getElementById('mealInformation')

    //Function to get URL query parameters
    function getParam(param){
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get(param)
    }
    //Getting the meal ID from the URL
    const mealId = getParam('mealId')

    if (mealId){
        fetchMealById(mealId)
    }
    //function to fetch meal details by ID
    function fetchMealById(id){
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data =>{
            displayMealInfo(data.meals[0])})
            .catch(error =>{
                mealInfo.innerHTML = `<p class="empty">${error}</p>`
            })
        }
    //Function to display meal information
    function displayMealInfo(meal){
        mealInfo.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src= "${meal.strMealThumb}" alt="${meal.strMeal}" >
        <p><strong> Category:</strong>${meal.strCategory}</p>
        <p><strong> Area:</strong>${meal.strArea}</p>
        <h3>Ingredients:</h3>
        <p>${meal.strIngredient1}</p>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
        <iframe src="https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}" allowfullscreen></iframe>`
    }
}
