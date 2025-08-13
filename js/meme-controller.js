'use strict'
let gElCanvas
let gCtx
var currMemeId





function renderMeme() {
    getCanvas()
    getGctx()


    addHidden('.gallery-layout')
    removeHidden('.editory')


    let imgId = gMeme.selectedImgId

    if (!imgId) {
        imgId = +localStorage.getItem('selectedImgId')
        if (!imgId) return
    }

    const img = getImg(imgId)

    const elImg = new Image()
    elImg.src = img.url


    elImg.onload = () => {
        resizeCanvas()


        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
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
    const meme = loadFromStorage(currMemeId)
    meme.lines.forEach((line, idx) => {
        gCtx.font = `bold ${line.size}px Arial`
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2
        gCtx.textAlign = 'center'

        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
    })
}

function onSwitchLine() {
    const meme = getGmeme()
    meme.selectedLineIdx = meme.selectedLineIdx === 0 ? 1 : 0
    const elInput = getTxtInput()
    elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
    elInput.placeholder = ''
    renderMeme()
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

function onDecreaseFont() {
    const meme = getGmeme()
    meme.lines[meme.selectedLineIdx].size -= 3
    saveToStorage(currMemeId, meme)
    renderMeme()
}
function onIncreaseFont() {
    const meme = getGmeme()
    meme.lines[meme.selectedLineIdx].size += 3
    saveToStorage(currMemeId, meme)
    renderMeme()
}

function onShowLineData(ev) {
    const { offsetX, offsetY } = ev
    const meme = getGmeme()

    const clickedLine = meme.lines.find(line => {
        return (
            offsetX >= line.x && offsetX <= line.x + line.txt.length

        )
    })
    console.log(clickedLine)


}

function resizeCanvas() {
    gElCanvas.width = 500
    gElCanvas.height = 500
}

function onAddLine() {
    addLine()
    renderMeme()
}

