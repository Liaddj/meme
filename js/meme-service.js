'use strict'
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel'
            ,
            size: 20,
            color: 'red',
            x: 250,
            y: 50,
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var storageMemes = `${gMeme.selectedImgId}`


function _makeGimgs() {

    for (let i = 2; i <= 18; i++) {
        gImgs.push({
            id: i,
            url: `img/${i}.jpg`,
            keywords: []
        })
    }
}



function getGmeme() {
    return gMeme
}

function getgImg() {
    _makeGimgs()
    return gImgs
}

function SetLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function getImg(imgId) {

    return gImgs.find(img => img.id === imgId)
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    localStorage.setItem('selectedImgId', imgId)
}

function addLine() {
    const elCanvas = getCanvas()
    if (gMeme.lines.length < 2) {
        gMeme.lines.push(
            {
                txt: '---------',
                size: 20,
                color: 'red',
                x: elCanvas.width / 2,
                y: elCanvas.height - 50,
            }
        )
        updateselectedLineIdx()
    }
}



function findImg(id) {
    return gImgs.find(img => img.id === id)
}

function updateselectedLineIdx() {
    gMeme.selectedLineIdx = 1
}