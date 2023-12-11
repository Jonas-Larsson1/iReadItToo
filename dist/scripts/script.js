import { initDraggable } from './dragging.js';
import { setPostsLocally, generatePostID, fetchAndDisplayPosts } from './posts.js'

const postBubble = document.querySelector('#post-bubble')
// const crossBubble = document.querySelector('#cross-bubble')
const newPostContainer = document.querySelector('#new-post-container')
const newPostForm = document.querySelector('#new-post-form')
const asideElement = document.querySelector('#aside')

initDraggable(newPostContainer.id)

const toggleHidden = (elementID) => {
    const element = document.getElementById(`${elementID}`)
    element.classList.toggle('hidden')
}

postBubble.addEventListener('click', () => {
    toggleHidden(newPostContainer.id)
    // toggleHidden(postBubble.id)
    toggleHidden(asideElement.id)
    postBubble.classList.toggle('fa-pencil')
    postBubble.classList.toggle('fa-xmark')
})

// crossBubble.addEventListener('click', () => {
//     toggleHidden(newPostContainer.id)
//     toggleHidden(postBubble.id)
//     toggleHidden(asideElement.id)
// })

newPostForm.addEventListener('submit', event => {
    event.preventDefault()

    let postTitleElement = document.getElementById('newTitle')
    let postBodyElement = document.getElementById('newBody')
    let postTagsElement = document.getElementById('newTags')

    let newPostObject = 
        {
            title: postTitleElement.value,
            body: postBodyElement.value,
            tags: postTagsElement.value.split(" "),
            reactions: 0,
            id: generatePostID()
        } 

    if (newPostObject.title && newPostObject.body) {
        setPostsLocally([newPostObject])
        fetchAndDisplayPosts()
    } 

    postTitleElement.value = ''
    postBodyElement.value = ''
    postTagsElement.value = ''
})


fetchAndDisplayPosts()
