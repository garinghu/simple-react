import { observable, computed, autorun, action } from 'mobx'

class Store {
  @observable data = ['hello world']

  
  // @computed get getDataLength () {
  //   return this.data.length
  // }
}

let store = new Store()

export default store 
