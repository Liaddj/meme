'use strict'

function onInit1() {
    renderGallery()
}

function renderGallery() {
    let strHTML = ''
    gImgs = getgImg()

    const elImgContainer = document.querySelector('.img-container')
    strHTML = gImgs.map(img => 
        `<img onclick="onSetImg('${img.id}')"src="${img.url}">`
    ).join('')
    console.log(strHTML)
    elImgContainer.innerHTML = strHTML

}