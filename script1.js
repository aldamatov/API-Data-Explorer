//

async function fetchUsers (){
   const res = await fetch('https://dummyapi.io/data/v1/user', {
       headers: {
           "app-id": "62574a7d07062e93564424d7"
       }
   })
   const json = await res.json();
   return json;

}
async function fetchUser (id){
     const res = await fetch(`https://dummyapi.io/data/v1/user/${id}`, {

        headers: {
            "app-id": "62574a7d07062e93564424d7"
        }
     })
     const json = await res.json();
   return json;
}
async function fetchUserPosts(id){
    const res = await fetch(`https://dummyapi.io/data/v1/user/${id}/post`, {

       headers:{  
           "app-id": "62574a7d07062e93564424d7"
       }
    })
    const json = await res.json();
  return json;
}

const app = document.querySelector('#app')

function renderAllUsers() {
    fetchUsers().then(response => {
        const data = response.data

       const cartHTML = data.map(user =>{
            return `
                    <div class="col">
                      <div class="card">
                        <img src="${user.picture}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${user.title} ${user.firstName} ${user.lastName}</h5>
                          <a href= "#" class= "btn btn-primary" data-id="${user.id}">Show More</a>
                        </div>
                      </div>
                    </div>
            `
         }).join("");

        const usersDiv = document.createElement('div');
        usersDiv.classList.add('row', 'row-cols-4', 'g-4');
        
        app.appendChild(usersDiv);
         
        usersDiv.innerHTML = cartHTML;

    })
}

async function renderSingleUser (id){
    const [user, userPosts] = await Promise.all([
        fetchUser(id), 
        fetchUserPosts(id)
    ])

    console.log('User', user);
    console.log('Post', userPosts)

        const cartHTML = `
        <div class="card">
           <img src="${user.picture}" class="card-img-top" alt="...">
           <div class="card-body">
            <h5 class="card-title">${user.title} ${user.firstName} ${user.lastName}</h5>
            <div class="card-text">
            <p>Email: ${user.email}</p>
            <p>Date of Birth: ${user.dateOfBirth}</p>
            <p>Gender: ${user.gender}</p>
            <p>Phone: ${user.phone}</p>
            <p>Register date: ${user.registerDate}</p>
            
            <ul>
                <li>Street: ${user.location.street}</li>
                <li>City: ${user.location.city}</li>
                <li>State: ${user.location.state}</li>
                <li>Country: ${user.location.country}</li>
                <li>Timezone: ${user.location.timezone}</li>
            
            </ul>
            </div>
           </div>
        </div>
        `;
        
        app.innerHTML = cartHTML

        const posts = userPosts.data
        const postsHTML = posts.map(post => {

            return `
                
                <div class="col">
                     <div class = "card">
                        <img src="${post.image}"/>
                        <div class="card-body">
                            <h5 class="card-title"> ${post.text}</h5>
                            <div class="card-text">
                                <p>Likes: ${post.likes}</p>
                                <p>Tags: ${post.tags} </p>
                            </div>
                         </div>
                    </div>
                </div>
                
            `
        }).join("")


        const postsDiv = document.createElement('div');
        postsDiv.classList.add('row', 'row-cols-3')
        postsDiv.innerHTML = postsHTML

        app.appendChild(postsDiv)
}

    


document.body.addEventListener('click', (e) => {
    if (e.target.className.includes('btn')){
        const userId = e.target.dataset.id;
        
        renderSingleUser(userId)
    }
})

renderAllUsers();





