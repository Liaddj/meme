'use strict'
let gElCanvas
let gCtx
var currMemeId





function renderMeme() {
    getCanvas()
    getGctx()

    addHidden('.gallery-layout')
    removeHidden('.editory')

    resizeCanvas()

    let imgId = gMeme.selectedImgId

    if (!imgId) {
        imgId = +localStorage.getItem('selectedImgId')
        if (!imgId) return
    }

    const img = getImg(imgId)

    const elImg = new Image()
    elImg.src = img.url
   

    elImg.onload = () => {


        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height )
        drawAllTextLines()
    }
    saveMeme(imgId)
    currMemeId = imgId
}

function saveMeme(id) {
    const meme = getGmeme()
    saveToStorage(id, meme)
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

function downloadImg(elLink) {
    const img = findImg(currMemeId)
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-image.jpg'
}


function onSetLineColor(val) {
    SetLineColor(val)
    saveMeme(currMemeId)
    renderMeme()
}










function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}