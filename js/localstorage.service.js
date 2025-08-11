'use strict'


function saveToStorage(key, val) {
    const json = JSON.stringify(val)
    console.log(json)
    localStorage.setItem(key, json)

}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
}