'use strict'
let gElCanvas
let gCtx
var currMemeId
let gRect = {}





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
        gCtx.font = `bold ${line.size}px meme`
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2
        gCtx.textAlign = 'center'

        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
        meme.lines[meme.selectedLineIdx].txtSize = gCtx.measureText(meme.lines[meme.selectedLineIdx].txt).width
        const size = meme.lines[meme.selectedLineIdx].txtSize
        console.log(size)
        // createRect(line.x, line.y, size, 'red')
    })
}

function createRect(x = 0, y = 0, size = 0, color = 'transparent') {
    gCtx.strokeStyle = color
    gCtx.lineWidth = 1
    gRect = { x: x / 1.8, y: y - 30, size1: size + 5, size2: size / 4.5, }
    gCtx.strokeRect(gRect.x, gRect.y, gRect.size1, gRect.size2)
}

function onSwitchLine() {
    const meme = getGmeme()
    meme.selectedLineIdx = meme.selectedLineIdx === 0 ? 1 : 0
    const elInput = getTxtInput()
    console.log(meme.lines[meme.selectedLineIdx].txt)
    elInput.value = meme.lines[meme.selectedLineIdx].txt
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
    const dataUrl = gElCanvas.toDataURL()
    const { x, y, siz1, size2 } = gRect
    gCtx.clearRect(x, y, siz1, size2)

    elLink.href = dataUrl
    elLink.download = 'my-image.jpg'
}

function onDeleteLine() {
    const meme = getGmeme()
     meme.lines.splice(meme.selectedLineIdx,1)
     meme.selectedLineIdx = meme.selectedLineIdx === 0 ? 1 : 0
     const elInput = getTxtInput()
     elInput.value = meme.lines[meme.selectedLineIdx].txt
     renderMeme()
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
    const meme = loadFromStorage(currMemeId)

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

function onUploadToFB(url) {
    // console.log('url:', url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}


function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.btn-download-fb').innerHTML = `
            <a href="${uploadedImgUrl}">Image Url</a>
            <p>Image url: ${uploadedImgUrl}</p>
           
            <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
                Share on Facebook  
            </button>
             <a href="#" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
                     Facebook
                    </a>
        `
    }

    uploadImg(canvasData, onSuccess)
}