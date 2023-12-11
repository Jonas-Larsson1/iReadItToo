export const setPostsLocally = (postObjects) => {

    const existingPosts = JSON.parse(localStorage.getItem('DummyJSONPosts') || '[]')

    const newPosts = postObjects.filter((newPost) => {
        return !existingPosts.some((existingPost) => existingPost.id === newPost.id)
    })

    const updatedPosts = [...existingPosts, ...newPosts]

    localStorage.setItem('DummyJSONPosts', JSON.stringify(updatedPosts))
}

export const getPostsLocally = (postID) => {
    const allPosts = JSON.parse(localStorage.getItem('DummyJSONPosts'))
    if (postID) {
        return [allPosts.find((post) => post.id === postID)] || null
    } else {
        return allPosts
    }
}

export const fetchPosts = async () => {
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

export const displayPosts = (postObjects) => {
    const postListElement = document.getElementById('posts-list')

    postListElement.innerHTML = ''

    postObjects.sort((a,b) => b.id - a.id)

    console.log(postObjects)

    for (let i = 0; i < postObjects.length; i++) {
        const post = postObjects[i]

        const postElement = document.createElement('li')
        postElement.classList.add('post-container')

        const postContentElement = document.createElement('div')
        postContentElement.classList.add('post')
        postContentElement.innerHTML = 
        `
            <h3>${post.title}</h3>
            <u>Post ID: ${post.id}</u>
            <p>${post.body}</p>
        `

        const tagsElement = document.createElement('ul')
        tagsElement.classList.add('tags')
        post.tags.forEach((tag) => {
            const tagElement = document.createElement('li')
            tagElement.innerText = `#${tag}`
            tagsElement.append(tagElement)
        })

        const reactionsElement = document.createElement('div')
        reactionsElement.classList.add('reactions-container')
        reactionsElement.innerHTML = 
        `
            <button class="upvote-button"><i class="fa-solid fa-thumbs-up"></i></button>
            <p class="reactions">${post.reactions}</p>
            <button class="downvote-button"><i class="fa-solid fa-thumbs-down"></i></button>
        `

        postContentElement.appendChild(tagsElement)
        postElement.appendChild(postContentElement)
        postElement.appendChild(reactionsElement) 
        postListElement.append(postElement)
    }
}



export const fetchAndDisplayPosts = () => {
    fetchPosts()
    .then(responseObject => {
        setPostsLocally(responseObject.posts)

        displayPosts(getPostsLocally())
    })
    .catch(error => {
        console.error('Error in fetchAndDisplayPosts:', error)
    })
}

export const generatePostID = () => {
    const existingPosts = getPostsLocally()

    let highestPostID = 0

    for (let i = 0; i < existingPosts.length; i++) {
        if (existingPosts[i].id > highestPostID) {
            highestPostID = existingPosts[i].id
        }
    }

    return (highestPostID + 1)
}
