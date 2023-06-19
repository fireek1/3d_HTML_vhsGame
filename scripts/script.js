const cube = document.querySelector('.cube')
const scene = document.querySelector('.scene')
const ui = document.querySelector('.ui')
const pyramid = document.querySelector('.pyramid')
const enemy = document.querySelector('.eye')
const grass = document.querySelector('.grass')

let translateZ = 0
let translateX = 0

let rotateX = 0
let rotateY = 0
let rotateZ = 0

let prevMouseX = 0
let prevMouseY = 0

let originZ = 0
let originX = 0

let perspective = 500
let cover = 0
let blur = 0

let dx = 0
let dy = 0

let isMoving = false
let currentKey = null

const speed = 7

let enemyCount = 0

// document.onkeydown = (e) => {
//     if (e.code === 'KeyS') {
//         dx = Math.sin(rotateX * Math.PI / 180)
//         dy = -Math.cos(rotateX * Math.PI / 180)
//         translateX += dx * speed
//         translateZ += dy * speed
//         isMoving = true
//     } else if (e.code === 'KeyW') {
//         dx = -Math.sin(rotateX * Math.PI / 180)
//         dy = Math.cos(rotateX * Math.PI / 180)
//         translateX += dx * speed
//         translateZ += dy * speed
//         isMoving = true
//     } else if (e.code === 'KeyA') {
//         dx = Math.sin(rotateX * Math.PI / 180 + Math.PI / 2)
//         dy = -Math.cos(rotateX * Math.PI / 180 + Math.PI / 2)
//         translateX += dx * speed
//         translateZ += dy * speed
//         isMoving = true
//     } else if (e.code === 'KeyD') {
//         dx = -Math.sin(rotateX * Math.PI / 180 + Math.PI / 2)
//         dy = Math.cos(rotateX * Math.PI / 180 + Math.PI / 2)
//         translateX += dx * speed
//         translateZ += dy * speed
//         isMoving = true
//     } else if (e.code === 'Space') {
//         rotateX = 0
//         rotateY = 0
//         rotateZ = 0
//         perspective = 500
//     } else if (e.code === 'ArrowUp') {
//         perspective += 10
//     } else if (e.code === 'ArrowDown') {
//         perspective -= 10
//     } else if (e.code === 'ArrowLeft' && blur > 0) {
//         blur -= 1
//     } else if (e.code === 'ArrowRight') {
//         blur += 1
//     }

//     if (translateZ >= 5000 && cover < 1) {
//         cover += 0.005
//     }

//     originX = -translateX + 150
//     originZ = -translateZ + 500

//     console.log(e.code)


//     cube.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateX}deg) rotateX(${rotateY * Math.cos(rotateX * Math.PI / 180)}deg) rotateZ(${rotateZ * Math.sin(rotateX * Math.PI / 180)}deg)`
//     cube.style.transformOrigin = `${originX}px 50% ${originZ}px`
//     scene.style.perspective = `${perspective}px`
//     ui.style.backgroundColor = `rgba(0, 0, 0, ${cover})`;
//     ui.style.backdropFilter = `blur(${blur}px)`
// }

document.onkeyup = (e) => {
    if (e.code === 'KeyW' || e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD') {
        dx = 0
        dy = 0
    }
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

    cube.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateX}deg) rotateX(${rotateY * Math.cos(rotateX * Math.PI / 180)}deg) rotateZ(${rotateZ * Math.sin(rotateX * Math.PI / 180)}deg)`

    prevMouseX = currentMouseX
    prevMouseY = currentMouseY
}

function moveChatacter() {
    if (isMoving) {
        cube.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateX}deg) rotateX(${rotateY * Math.cos(rotateX * Math.PI / 180)}deg) rotateZ(${rotateZ * Math.sin(rotateX * Math.PI / 180)}deg)`
        cube.style.transformOrigin = `${originX}px 50% ${originZ}px`
        requestAnimationFrame(moveChatacter)
    }
}

let coverEye = 0

document.onkeydown = (e) => {
    if (e.code === 'KeyW' || e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD') {
        isMoving = true
        currentKey = e.code
        moveChatacter()
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

    if (translateZ >= 5000 && cover < 1) {
        cover += 0.005
    }

    scene.style.perspective = `${perspective}px`
    ui.style.backgroundColor = `rgba(0, 0, 0, ${cover})`;
    ui.style.backdropFilter = `blur(${blur}px) brightness(1.25)`;
}

document.onkeyup = (e) => {
    if (e.code === 'KeyW' || e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD') {
        isMoving = false
        currentKey = null
    }
}

setInterval(function () {
    if (isMoving && currentKey !== null) {
        if (currentKey === "KeyW") {
            dx = -Math.sin(rotateX * Math.PI / 180)
            dy = Math.cos(rotateX * Math.PI / 180)
            translateX += dx * speed
            translateZ += dy * speed
        } else if (currentKey === "KeyA") {
            dx = Math.sin(rotateX * Math.PI / 180 + Math.PI / 2)
            dy = -Math.cos(rotateX * Math.PI / 180 + Math.PI / 2)
            translateX += dx * speed
            translateZ += dy * speed
        } else if (currentKey === "KeyS") {
            dx = Math.sin(rotateX * Math.PI / 180)
            dy = -Math.cos(rotateX * Math.PI / 180)
            translateX += dx * speed
            translateZ += dy * speed
        } else if (currentKey === "KeyD") {
            dx = -Math.sin(rotateX * Math.PI / 180 + Math.PI / 2)
            dy = Math.cos(rotateX * Math.PI / 180 + Math.PI / 2)
            translateX += dx * speed
            translateZ += dy * speed
        }
        originX = -translateX + 150
        originZ = -translateZ + 500
    }
}, 1000 / 60);

// document.onmousedown = (e) => {
//     // rotateEnemy()
// }

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// function rotateEnemy() {
//     const newEnemy = enemy.cloneNode(true)
//     document.querySelector('.cube').appendChild(newEnemy)
//     const enemyX = random(translateX - 2000, translateX + 2000)
//     const enemyZ = random(translateZ - 2000, translateZ + 2000)

//     deltaX = translateX - enemyX
//     deltaZ = translateZ - enemyZ

//     const angle = Math.atan2(deltaZ, deltaX)
//     const degrees = angle * (180 / Math.PI);
//     // newEnemy.classList.remove('eye')
//     newEnemy.id = `enemy-${enemyCount}`

//     newEnemy.style.transform = `translate3d(${enemyX}px, 100px, ${enemyZ}px) rotateZ(${degrees}deg)`
//     newEnemy.style.scale = '0.1'
//     enemyCount++
//     console.log(enemyZ)

// }

// setInterval(() => {
//     enemy
// })


function spawnEnemy() {
    const newEnemy = enemy.cloneNode(true);
    ui.appendChild(newEnemy)
    newEnemy.style.left = `${random(25, 75)}%`
    newEnemy.style.top = `${random(0, 100)}%`
    newEnemy.style.scale = `${random(0.5, 3)}`
    newEnemy.style.opacity = `1`
    grass.style.height = `100000px`
}

setInterval(() => {
    if (cover >= 1) {
        spawnEnemy()
    }
    // console.log('hi')
}, 1000)