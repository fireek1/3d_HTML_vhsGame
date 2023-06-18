const cube = document.querySelector('.cube')
const scene = document.querySelector('.scene')
const ui = document.querySelector('.ui')

let translateZ = 0
let translateX = 0

let rotateX = 0
let rotateY = 0

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
    }
    if (e.code === 'KeyS') {
        translateZ -= 10
        originZ += 10
    }
    if (e.code === 'KeyA') {
        translateX += 10
        originX -= 10
    }
    if (e.code === 'KeyD') {
        translateX -= 10
        originX += 10
    }
    if (e.code === 'Space') {
        rotateX = 0
        rotateY = 0
        perspective = 500
    }
    if (e.code === 'ArrowUp') {
        perspective += 10
    }
    if (e.code === 'ArrowDown') {
        perspective -= 10
    }

    if (e.code === 'ArrowLeft') {
        blur -= 1
    }
    if (e.code === 'ArrowRight') {
        blur += 1
    }

    if(translateZ >= 5000 && cover < 1) {
        cover += 0.005
    }

    
    cube.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateX}deg) rotateX(${rotateY}deg)`
    cube.style.transformOrigin = `${originX}px 50% ${originZ}px`
    scene.style.perspective = `${perspective}px`
    ui.style.backgroundColor = `rgba(0, 0, 0, ${cover})`;
    ui.style.backdropFilter = `blur(${blur}px)`
}




document.onmousemove = (e) => {
    const currentMouseX = e.clientX
    const currentMouseY = e.clientY

    const deltaX = currentMouseX - prevMouseX
    const deltaY = currentMouseY - prevMouseY

    rotateY += -deltaY * 0.2
    rotateX += deltaX * 0.2

    cube.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateX}deg) rotateX(${rotateY}deg)`

    prevMouseX = currentMouseX
    prevMouseY = currentMouseY
}
