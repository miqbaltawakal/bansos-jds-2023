export const local = {
    getLocal,
    setLocal,
    clear,
    clearItem
  }
  
  var localStorage = window.localStorage
  
  function getLocal(key) {
    console.log("calling local")
    try{
      return JSON.parse(localStorage.getItem(key))
    } catch (e){
      console.error(e)
      return {}
    }
  }
  
  function setLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }
  
  function clear(){
    localStorage.clear()
  }
  
  function clearItem(key){
    localStorage.removeItem(key)
  }
  