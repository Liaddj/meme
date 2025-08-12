'use strict'
let gElCanvas
let gCtx





function renderMeme() {
    getCanvas()
    getGctx()

    addHidden('.gallery-layout')
    removeHidden('.editory')

    resizeCanvas()
    // let meme = localStorage.getItem(`${gMeme.selectedImgId}`)
    // console.log(meme)
    let imgId = gMeme.selectedImgId

    if (!imgId) {
        imgId = +localStorage.getItem('selectedImgId')
        if (!imgId) return
    }

    const img = getImg(imgId)

    const elImg = new Image()
    elImg.src = img.url

    elImg.onload = () => {
        const aspectRatio = elImg.naturalWidth / elImg.naturalHeight
        gElCanvas.height = gElCanvas.width / aspectRatio
        getGctx()
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawAllTextLines()
    }

}

function getCanvas() {
    gElCanvas = document.querySelector('.canvas')
    return gElCanvas
}

function getGctx() {
    gCtx = gElCanvas.getContext('2d')
    return gCtx
}

function drawAllTextLines() {
    const meme = getGmeme()

    const selectedLine = meme.lines[meme.selectedLineIdx]
    console.log(selectedLine)

    if (selectedLine && selectedLine.txt) {
        drawText(selectedLine)
    }
}

function drawText(line) {
    const { txt, size, color } = line

    gCtx.font = `${size}px Arial`
    gCtx.fillStyle = color
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'

    const x = gElCanvas.width / 2
    const y = gElCanvas.height / 2

    gCtx.strokeText(txt, x, y)
    gCtx.fillText(txt, x, y)
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onImgSelect(imgId) {
    setImg(imgId)
    
    renderMeme(imgId)

}















function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}