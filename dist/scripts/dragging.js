// export function initDraggable(elementID) {
//     const element = document.getElementById(elementID)

//     element.addEventListener('mousedown', mouseDown)
//     document.addEventListener('mouseup', closeDragElement)
//     document.addEventListener('mousemove', moveElement)
// }
// let posX1 = 0, posY1 = 0, posX2 = 0, posY2 = 0, isDragging = false

// const mouseDown = (event) => {
//     const element = event.target
//     element.classList.add('dragging')
//     event.preventDefault()
//     posX2 = event.clientX
//     posY2 = event.clientY
// }

// const moveElement = (event) => {
//     const element = event.target
//     event.preventDefault()

//     posX1 = posX2 - event.clientX
//     posY1 = posY2 - event.clientY
//     posX2 = event.clientX
//     posY2 = event.clientY



//     if (isDragging) {
//         const element = document.querySelector('.dragging')
//         if (element) {
//             element.style.top = (element.offsetTop - posY1) + "px";
//             element.style.left = (element.offsetLeft - posX1) + "px";
//         }
//     }
// }


// const closeDragElement = () => {
//     isDragging = false
//     const element = document.querySelector('.dragging')
//     if (element) {
//             element.classList.remove('dragging')
//     }
// }

export function initDraggable(elementID) {
    element = document.getElementById(elementID)

    element.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)
}

let offsetX, offsetY, element, isDragging = false

const handleMouseDown = (event) => {
    // event.preventDefault()
    // const element = event.target
    isDragging = true
    offsetX = event.clientX - element.getBoundingClientRect().left
    offsetY = event.clientY - element.getBoundingClientRect().top
    element.classList.add('dragging')
}

const handleMouseUp = () => {
    isDragging = false
    // const element = document.querySelector('.dragging')
    if (element) {
        element.classList.remove('dragging')
    }
}

const handleMouseMove = (event) => {
    if (isDragging) {
        event.preventDefault()
        // const element = document.querySelector('.dragging')
        if (element) {
            element.style.left = event.clientX - offsetX + 'px';
            element.style.top = event.clientY - offsetY + 'px';
        }
    }
}