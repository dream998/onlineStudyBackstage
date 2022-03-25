export function setLocalStorageItem(key, value){
    window.localStorage.setItem(key,JSON.stringify(value))
}

export function getLocalStorageItem(key){
    return JSON.parse(window.localStorage.getItem(key))
}