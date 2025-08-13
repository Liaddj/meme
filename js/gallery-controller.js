'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    let strHTML = ''
    gImgs = getgImg()
    

    const elImgContainer = document.querySelector('.img-container')
    strHTML = gImgs.map((img) => 
        `<img onclick="onImgSelect(${img.id})"src="${img.url}">`
    ).join('')
   
    elImgContainer.innerHTML = strHTML

}