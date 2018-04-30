import { observable, computed, autorun, action } from 'mobx'

class Store {
  @observable data = 'Hello World'

}

let store = new Store()

export default store 
