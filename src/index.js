// write your code here
const init=() => {

  //  Listen for form click
  document.querySelector('#new-ramen').addEventListener('submit',handleSubmit)

  // Event handler
  let name,restaurant,image,rating,comment

  function handleSubmit(e) {
    e.preventDefault()
    let ramenObj={
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target.comment.value
    }
    // updated html textarea - comment
    // console.log(JSON.stringify(ramenObj))
    renderOneMenuRamen(ramenObj)
    addRamenToMenu(ramenObj)
  }

  // POST a ramen - (the Create part of Crud)
  function addRamenToMenu(ramenObj) {
    //console.log(JSON.stringify(ramenObj))
    fetch('http://localhost:3000/ramens',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ramenObj)
    })
      .then(res => res.json())
      .then(ramen => console.log(ramenObj))
  }

  // PATCH an ramen - (the UPDATE part of Crud)
  // Accept request header = content types client can understand
  function updateDetail(ramenObj) {
    //console.log(JSON.stringify(ramenObj))
    fetch(`http://localhost:3000/ramens/${ramenObj.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(ramenObj)
    })
      .then(res => res.json())
    //.then(ramen => console.log(ramen))
  }

  // renderOneMenuRamen DOM Manipulators
  function renderOneMenuRamen(ramen) {
    // Build Ramen
    let card=document.createElement('span')
    card.className='card'
    // innerHTML is coming from us so it should be safe, note backticks
    card.innerHTML=`
      <a class="r-image" id="${ramen.id}}"><img src="${ramen.image}"></a>
      <!-- <div class="content">
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
      </div> -->
      `
    // add card to dom
    document.querySelector('div#ramen-menu').appendChild(card)

    // listener for click on Ramen menu img to update detail
    card.querySelector('a.r-image').addEventListener('click',() => {
      //console.log(ramen.name)
      document.querySelector('img.detail-image').src=ramen.image
      document.querySelector('h2.name').textContent=ramen.name
      document.querySelector('h3.restaurant').textContent=ramen.restaurant
      document.querySelector('span#rating-display').textContent=ramen.rating
      document.querySelector('p#comment-display').textContent=ramen.comment

      updateDetail(ramen)
    })
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

