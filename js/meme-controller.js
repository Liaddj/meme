'use strict'
let gElCanvas
let gCtx
let chooseImg


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    resizeCanvas()
}

function renderMeme() {
    const meme = getGmeme()

    const img = getImg(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = img.url

    elImg.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gElCanvas.width = (elImg.naturalWidth / elImg.naturalHeight) * gElCanvas.height
       
       
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawAllTextLines()
    }

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

















function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}