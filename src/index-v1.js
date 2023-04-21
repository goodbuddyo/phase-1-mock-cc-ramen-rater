index-v1.js

// write your code here
const init=() => {


  // renderOneMenuRamen DOM Manipulators
  function renderOneMenuRamen(ramen) {
    // Build Ramen
    let card=document.createElement('span')
    card.className='card'
    // innerHTML is coming from us so it should be safe, note backticks
    card.innerHTML=`
      <a class="r-image" id="${ramen.id}}"><img src="${ramen.image}"></a>
      <div class="content">
      <h4>${ramen.name}</h4>
      <p class="r-rating">
        <span class="donation-count">${ramen.rating}</span> Rated
      </p>
      <p class="r-comment">
        ${ramen.comment}
      </p>
      <p class="r-restaurant">
        ${ramen.restaurant}
      </p>
      </div>
      `
    // add card to dom
    document.querySelector('div#ramen-menu').appendChild(card)
  }


  // Fetch requests
  // GET all ramen resources and render
  function getAllRamens() {
    fetch('http://localhost:3000/ramens')
      .then(res => res.json())
      .then(ramenData => ramenData.forEach(ramen => renderOneMenuRamen(ramen)))
  }



  getAllRamens()

}

document.addEventListener("DOMContentLoaded",init);

