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
            color: 'red'
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

function _saveMeme() {
  saveToStorage(storageMemes, gMeme)
}

function getImg(imgId) {
  
    return gImgs.find(img => img.id === imgId) 
}

function setLineTxt(txt) {
    console.log(txt)
    gMeme.lines[0].txt = txt
    console.log(gMeme)
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    localStorage.setItem('selectedMemeId', imgId)
}