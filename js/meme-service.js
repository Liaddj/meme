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

function addImgs() {
    gImgs.forEach
}


function getImg(id) {
    const img = gImgs.find(img => img.id === id)
    return img
}

function setLineTxt(txt) {
    console.log(txt)
    gMeme.lines[0].txt = txt
    console.log(gMeme)
}

function setImg() {
    
}