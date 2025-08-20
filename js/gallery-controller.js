'use strict'

let gImgsGallery


function onInit() {
    gImgs = getgImg()
    renderGallery(gImgs)
}

function renderGallery(imgs) {
    let strHTML = ''


    const elImgContainer = document.querySelector('.img-container')
    strHTML = imgs.map((img) =>
        `<img onclick="onImgSelect(${img.id})"src="${img.url}">`
    ).join('')

    elImgContainer.innerHTML = strHTML

}

function onSearch(el) {
    const searchValue = el.value.toLowerCase()

    const filteredImgs = gImgs.filter(img =>
        img.keywords.join(' ').toLowerCase().includes(searchValue)
    )

    renderGallery(filteredImgs)
}