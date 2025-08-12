'use strict'

function addHidden(selector) {
    const element = document.querySelector(selector)
    element.classList.add('hidden')
}
function removeHidden(selector) {
    const element = document.querySelector(selector)
    element.classList.remove('hidden')
}

function toggleHidden(selector1,selector2) {
    const element1 = document.querySelector(selector1)
    element1.classList.toggle('hidden')
    const element2 = document.querySelector(selector2)
    element2.classList.toggle('hidden')
}

