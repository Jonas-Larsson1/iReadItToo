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

const displayPosts = (posts) => {
    console.log(posts)
}

const fetchAndDisplayPosts = () => {
    fetchPosts()
    .then(posts => {
        displayPosts(posts)
    })
    .catch(error => {
        console.error('Error in fetchAndDisplayPosts:', error)
    })
}

fetchAndDisplayPosts()