const allPosts = []

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

const displayPosts = (postsObjects) => {
    const postListElement = document.getElementById('posts-list')
    
    for (let i = 0; i < postsObjects.length; i++) {
        const post = postsObjects[i]


        const postElement = document.createElement('li')
        postElement.classList.add('post')
        postElement.innerHTML = 

            `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            `

        const tagsElement = document.createElement('ul')
        tagsElement.classList.add('tags') 
        post.tags.forEach((tag) => {
            const tagElement = document.createElement('li')
            tagElement.innerText = `#${tag}`
            tagsElement.append(tagElement)
        })
        
        postElement.append(tagsElement) 
        postListElement.append(postElement)
    }

}

const fetchAndDisplayPosts = () => {
    fetchPosts()
    .then(responseObject => {
        responseObject.posts.forEach((post) => {
            if (!allPosts.includes(post)) {
                allPosts.push(post)
            }
        })
        displayPosts(allPosts)
    })
    .catch(error => {
        console.error('Error in fetchAndDisplayPosts:', error)
    })
}

fetchAndDisplayPosts()