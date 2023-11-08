const fetchPosts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/posts');
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }
  
      const responseJSON = await response.json()
      
      return responseJSON
  
    } catch (error) {
      console.error('Error in fetchPosts():', error);
    }
}

const displayPosts = (postsObjectsArray) => {
    const postListElement = document.getElementById('posts-list')
    
    for (let i = 0; i < postsObjectsArray.length; i++) {
        const post = postsObjectsArray[i]

        const postElement = document.createElement('li')
        postElement.classList.add('post')
        postElement.innerHTML = 
        `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `

        postListElement.appendChild(postElement)
    }

    // console.log(postsObjectsArray[3].title)
}

const fetchAndDisplayPosts = () => {
    fetchPosts()
    .then(responseObject => {
        displayPosts(responseObject.posts)
    })
    .catch(error => {
        console.error('Error in fetchAndDisplayPosts:', error)
    })
}

fetchAndDisplayPosts()