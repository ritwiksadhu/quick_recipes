let cards=document.querySelectorAll(".card");const options={method:"GET",headers:{"X-RapidAPI-Key":"ac5a7b84eemshaa4d26d4c507eb3p11c86ejsn69d1e81988b6","X-RapidAPI-Host":"recipe-by-api-ninjas.p.rapidapi.com"}};async function fetchData(e){cards__container.innerHTML="";let t='https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=""&offset=20';e&&(t=`https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${e}&offset=30`),await fetch(t,options).then(e=>e.json()).then(e=>{if(e.length<1){cards__container.innerHTML=`
            <div class="mx-auto flex flex-col justify-center items-center">
            <img class="" src="https://media.tenor.com/ZMRCVyLo0GQAAAAC/gordon-ramsay-kitchen.gif" alt="">
            <h1 class="text-4xl" >NO RESULTS FOUND</h1>
            </div>
            `;return}e.forEach(e=>cardComponent(e)),cardClickFunctionality(e)}).catch(e=>console.error(e))}function cardComponent(e){let t=document.createElement("div");t.setAttribute("data-id",`${e.title}`),t.classList.add("card"),t.innerHTML=`
    <div class=" h-fit w-fit px-2  serving absolute mt-2 mx-1 rounded-full bg-green-300 border-2 "> <img src="./icons/plate.svg" class="w-6 inline-block" alt="">  ${e.servings}</div>
        <img class="w-full" src="../food1.jpg" alt="" />
        <div class="p-1">
      <h3 class="font-bold mx-1 inline-block">Title: </h3> <span>${e.title}</span><br/>
    </div>
    `,cards__container.append(t)}function cardClickFunctionality(e){(cards=document.querySelectorAll(".card")).forEach(t=>{t.addEventListener("click",i=>{document.body.style.overflow="clip";showDetails(e.find(e=>e.title==t.dataset.id)),detailspage.classList.remove("hidden")})})}function showDetails(e){details__title.innerHTML="Title :"+e.title;e.ingredients.split("|").forEach(e=>{let t=document.createElement("p");t.innerText=`${e}.`;let i=document.createElement("li");i.append(t),i.classList.add("list-disc"),details__ingredients.append(i)});e.instructions.split(".").filter(e=>e.length>5).forEach(e=>{let t=document.createElement("p");t.innerText=`${e}.`;let i=document.createElement("li");i.append(t),i.classList.add("list-decimal"),details__instructions.append(i)})}fetchData(),closebtn.addEventListener("click",()=>{document.body.style.overflow="auto",detailspage.classList.add("hidden")}),searchForm.addEventListener("submit",e=>{e.preventDefault();let t=e.target.querySelector("input").value;t&&(cards__container.innerHTML="",fetchData(t)),e.target.reset()});