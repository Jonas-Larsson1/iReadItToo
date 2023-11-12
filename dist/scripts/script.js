
setPostsLocally = (postsObjects) => {
    postsObjects.forEach(post => {
        localStorage.setItem(`post.id.${post.id}`, JSON.stringify(post))
    })
}

getPostsLocally = (postID) => {
    if (postID) {
        return localStorage.getItem(`post.id.${postID}`)
    } else {
        const allKeys = Object.keys(localStorage)
        const allPostKeys = []
        const allPostObjects = []
        allKeys.forEach(key => {
            if (key.includes(`post.id.`)) {
                allPostKeys.push(key)
            }
        })
        allPostKeys.forEach(postKey => {
            allPostObjects.push(JSON.parse(localStorage.getItem(postKey)))
        })
        return allPostObjects
    }
}

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
    const newPosts = []
    fetchPosts()
    .then(responseObject => {
        responseObject.posts.forEach((post) => {
            if (!localStorage.getItem(`post.id.${post.id}`)) {
                newPosts.push(post)
            }
        })
        setPostsLocally(newPosts)

        displayPosts(getPostsLocally())
    })
    .catch(error => {
        console.error('Error in fetchAndDisplayPosts:', error)
    })
}

fetchAndDisplayPosts()
