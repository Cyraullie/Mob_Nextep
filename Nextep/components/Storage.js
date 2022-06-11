//TODO try use asyncstorage ?
import AsyncStorage from '@react-native-async-storage/async-storage';
class Storage {

    async set(name, data) {
      await AsyncStorage.setItem(name, data)
    }

    async get(name){
      return await AsyncStorage.getItem(name)
    }

    async remove(name){
      await AsyncStorage.removeItem(name)
    }
    
}

const StorageKit = new Storage();

export default StorageKit;