import { initDraggable } from './dragging.js';

const postBubble = document.querySelector('.post-bubble')
const crossBubble = document.querySelector('.cross-bubble')
const newPostContainer = document.querySelector('#new-post-container')
const newPostForm = document.querySelector('#new-post-form')

initDraggable(newPostContainer.id)

const toggleHidden = (elementID) => {
    const element = document.getElementById(`${elementID}`)
    element.classList.toggle('hidden')
}

postBubble.addEventListener('click', () => {
    toggleHidden(newPostContainer.id)
    postBubble.classList.toggle('fa-pencil')
    postBubble.classList.toggle('fa-xmark')
})
crossBubble.addEventListener('click', () => {
    toggleHidden(newPostContainer.id)
})

newPostForm.addEventListener('submit', event => {
    event.preventDefault()
    console.log(event)
})

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

        displayPosts(getPostsLocally())
    })
    .catch(error => {
        console.error('Error in fetchAndDisplayPosts:', error)
    })
}

fetchAndDisplayPosts()
