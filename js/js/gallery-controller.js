'use strict'

function onInit1() {
    renderGallery()
}

function renderGallery() {
    let strHTML = ''
    gImgs = getgImg()
    console.log(gImgs)

    const elImgContainer = document.querySelector('.img-container')
    strHTML = gImgs.map((img) => 
        `<img onclick="onImgSelect(${img.id})"src="${img.url}">`
    ).join('')
   
    elImgContainer.innerHTML = strHTML

}