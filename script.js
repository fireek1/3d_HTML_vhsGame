const cube = document.querySelector('.cube')
const scene = document.querySelector('.scene')
const ui = document.querySelector('.ui')
const pyramid = document.querySelector('.pyramid')

let translateZ = 0
let translateX = 0

let rotateX = 0
let rotateY = 0
let rotateZ = 0

let prevMouseX = 0
let prevMouseY = 0

let originZ = 500
let originX = 150

let perspective = 500
let cover = 0
let blur = 0

document.onkeydown = (e) => {

    if (e.code === 'KeyW') {
        translateZ += 10
        originZ -= 10
    } else if (e.code === 'KeyS') {
        translateZ -= 10
        originZ += 10
    } else if (e.code === 'KeyA') {
        translateX += 10
        originX -= 10
    } else if (e.code === 'KeyD') {
        translateX -= 10
        originX += 10
    } else if (e.code === 'Space') {
        rotateX = 0
        rotateY = 0
        rotateZ = 0
        perspective = 500
    } else if (e.code === 'ArrowUp') {
        perspective += 10
    } else if (e.code === 'ArrowDown') {
        perspective -= 10
    } else if (e.code === 'ArrowLeft' && blur > 0) {
        blur -= 1
    } else if (e.code === 'ArrowRight') {
        blur += 1
    }

    if(translateZ >= 5000 && cover < 1) {
        cover += 0.005
    }
   
    cube.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateX}deg) rotateX(${rotateY * Math.cos(rotateX * Math.PI / 180)}deg) rotateZ(${rotateZ * Math.sin(rotateX * Math.PI / 180)}deg)`
    cube.style.transformOrigin = `${originX}px 50% ${originZ}px`
    scene.style.perspective = `${perspective}px`
    ui.style.backgroundColor = `rgba(0, 0, 0, ${cover})`;
    ui.style.backdropFilter = `blur(${blur}px)`
}

document.onmousemove = (e) => {
    const currentMouseX = e.clientX 
    const currentMouseY = e.clientY

    const deltaX = (currentMouseX - prevMouseX)
    const deltaY = currentMouseY - prevMouseY
    const deltaZ = (currentMouseX - prevMouseX)

    rotateY += -deltaY * 0.2 
    rotateX += deltaX * 0.2
    rotateZ += -deltaY * 0.2

    cube.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateX}deg) rotateX(${rotateY * Math.cos(rotateX * Math.PI / 180)}deg) rotateZ(${rotateZ * Math.sin(rotateX * Math.PI / 180)}deg)` //Math.sin(rotateX * Math.PI / 180)

    prevMouseX = currentMouseX
    prevMouseY = currentMouseY
}
