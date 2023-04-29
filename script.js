// detail__ingredients
// details__instruction
// closebtn
// searchFrom
let cards = document.querySelectorAll(".card")
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ac5a7b84eemshaa4d26d4c507eb3p11c86ejsn69d1e81988b6',
		'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
	}
};

async function fetchData(query){
    cards__container.innerHTML =""
    let callingAPI = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=""&offset=20`
    if(query){
        callingAPI = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${query}&offset=30`
    }
    await fetch(callingAPI, options)
	.then(response => response.json())
	.then((response) =>{
        if(response.length <1){
            cards__container.innerHTML = `
            <div class="mx-auto flex flex-col justify-center items-center">
            <img class="" src="https://media.tenor.com/ZMRCVyLo0GQAAAAC/gordon-ramsay-kitchen.gif" alt="">
            <h1 class="text-4xl" >NO RESULTS FOUND</h1>
            </div>
            `
            return
        }
        
        // DYNAMICALLY ADDING CARDS
        response.forEach(element =>cardComponent(element));

        //CLICK FUNCTIONALITY ON CARDS
        cardClickFunctionality(response)
    })
	.catch(err => console.error(err));
}
fetchData()


// CARD COMPONENT
function cardComponent(element){
    let div = document.createElement("div")
    div.setAttribute("data-id",`${element.title}`)
    div.classList.add("card")
    div.innerHTML = `
    <div class=" h-fit w-fit px-2  serving absolute mt-2 mx-1 rounded-full bg-green-300 border-2 "> <img src="./icons/plate.svg" class="w-6 inline-block" alt="">  ${element.servings}</div>
        <img class="w-full" src="../food1.jpg" alt="" />
        <div class="p-1">
      <h3 class="font-bold mx-1 inline-block">Title: </h3> <span>${element.title}</span><br/>
    </div>
    `
    cards__container.append(div)
}

// CLICK FUNCTIONALITY ON CARDS
function cardClickFunctionality(response){
    
    cards = document.querySelectorAll(".card")
    cards.forEach((card)=>{
        card.addEventListener("click",(e)=>{
            document.body.style.overflow = "clip"
            let foundItem = response.find((elem)=>elem.title == card.dataset.id)
            showDetails(foundItem)
            detailspage.classList.remove("hidden")
        })
    })
}

// DETAILS PAGE FUNCTIONALITY
function showDetails(data){

    // title 
    details__title.innerHTML = "Title :" + data.title

    // ingredients
    let ingredients = data.ingredients.split("|")
    ingredients.forEach((elem)=>{
        let p = document.createElement("p")
        p.innerText = `${elem}.`
        let li = document.createElement("li")
        li.append(p)
        li.classList.add("list-disc")
        details__ingredients.append(li)
        })
        
        // steps
    let instructions = data.instructions.split(".").filter((elem)=>elem.length > 5)
    instructions.forEach((elem)=>{
        let p = document.createElement("p")
        p.innerText = `${elem}.`
        let li = document.createElement("li")
        li.append(p)
        li.classList.add("list-decimal")
        details__instructions.append(li)
    })
}

// CLOSE BUTTON FUNCTIONALITY
closebtn.addEventListener("click",()=>{
    document.body.style.overflow = "auto"
    detailspage.classList.add("hidden")
})

// SEARCH FUNCTIONALITY
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    let inputValue = e.target.querySelector("input").value
    if(inputValue){
        cards__container.innerHTML = ""
        fetchData(inputValue)
    }
    e.target.reset()
})

// SEARCH ITEMS












//     // ingredients
//     // : 
//     // "3 Eggs; seperated|1 1/2 c Milk|1 1/4 Whole grain flourof any combo:wheat ;brown rice ,millet etc|1/4 c Bran or cornmeal|Chopped pecans or walnuts; sesame seeds, sunflower, or flax seeds|Canola; sesame or corn oil"
//     // instructions
//     // : 
//     // "1.Place the yolks in large bowland whip with a fork.Beat the whites seperatly in a grease free bowluntil they hold stiff peaks.Stir milk into the yolksfollowed by the whole grain flourand bran or cornmeal.fold in the beaten egg whites gently with a forkusing a light whipping motion until well mixed. 2.Heat and oil a griddle with oil.spoon the batter on the griddle to form pancakes not more than 3 inch in diameter .sprinkle on top your choice of seeds or nutsas the pancakes begin to puff and bubble on topturn them over.Watch them closely until the bottoms become dark and seem to cry out \"Im done\"."
//     // servings
//     // : 
//     // "10 To 12 serv"
//     // title
//     // : 
//     // "Health Nut Pancakes"


// let 