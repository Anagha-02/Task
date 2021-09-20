function saveToLocalStorage(type) {
  var storage;
  try {
    storage = window['localStorage'];
    var x = type;
    storage.setItem('user', x);
    return true;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

function removeFromLocalStorage() {
  var storage;
  try {
    storage = window['localStorage'];
    storage.clear();
    return true;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

function SetStorage({ item }) {

  if (item === 0 || item === null || item === '') {
    return (
      removeFromLocalStorage()
    )
  }
  else
    return (
    saveToLocalStorage(item)

    )


}
export default SetStorage;