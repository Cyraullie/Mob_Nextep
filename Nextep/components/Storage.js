//TODO try use asyncstorage ?
class Storage {

    set(name, data) {
      localStorage.setItem(name, data)
    }

    get(name){
      return localStorage.getItem(name)
    }

    remove(name){
        localStorage.removeItem(name)
    }
    
}

const StorageKit = new Storage();

export default StorageKit;