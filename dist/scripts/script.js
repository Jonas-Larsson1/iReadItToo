
// setPostsLocally = (postsObjects) => {
//     postsObjects.forEach(post => {
//         localStorage.setItem(`post.id.${post.id}`, JSON.stringify(post))
//     })
// }

// getPostsLocally = (postID) => {
//     if (postID) {
//         return localStorage.getItem(`post.id.${postID}`)
//     } else {
//         const allKeys = Object.keys(localStorage)
//         const allPostKeys = []
//         const allPostObjects = []
//         allKeys.forEach(key => {
//             if (key.includes(`post.id.`)) {
//                 allPostKeys.push(key)
//             }
//         })
//         allPostKeys.forEach(postKey => {
//             allPostObjects.push(JSON.parse(localStorage.getItem(postKey)))
//         })
//         return allPostObjects
//     }
// }

const setPostsLocally = (postObjects) => {
    const existingPosts = JSON.parse(localStorage.getItem('DummyJSONPosts') || '[]')

    const newPosts = postObjects.filter((newPost) => {
        return !existingPosts.some((existingPost) => existingPost.id === newPost.id)
    })

    const updatedPosts = [...existingPosts, ...newPosts]

    localStorage.setItem('DummyJSONPosts', JSON.stringify(updatedPosts))
}

const getPostsLocally = (postID) => {
    const allPosts = JSON.parse(localStorage.getItem('DummyJSONPosts'))
    if (postID) {
        return [allPosts.find((post) => post.id === postID)] || null
    } else {
        return allPosts
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

const displayPosts = (postObjects) => {
    const postListElement = document.getElementById('posts-list')
    console.log(postObjects)
    for (let i = 0; i < postObjects.length; i++) {
        const post = postObjects[i]


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
        setPostsLocally(responseObject.posts)

        displayPosts(getPostsLocally(4))
    })
    .catch(error => {
        console.error('Error in fetchAndDisplayPosts:', error)
    })
}

fetchAndDisplayPosts()
