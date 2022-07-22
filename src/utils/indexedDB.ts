export default class DB {
  private dbName: string // 数据库名称
  private db: any // 数据库对象
  constructor(dbName: string) {
    this.dbName = dbName
  }

  // 打开数据库
  openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
    const request = window.indexedDB.open(this.dbName, 2)
    request.onsuccess = (event: any) => {
      console.log('数据库打开成功')
      this.db = event.target.result
      console.log(event)
    }
    request.onerror = (event) => {
      console.log('数据库打开失败')
      console.log(event)
    }
    request.onupgradeneeded = (event) => {
      console.log('数据库升级成功')
      const { result }: any = event.target
      const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
      if (indexs && indexs.length > 0) {
        indexs.map((v: string) => {
          store.createIndex(v, v, { unique: false })
        })
      }
      // transaction result底下的方法事务回调放法
      store.transaction.oncomplete = (event: any) => {
        console.log('创建对象仓库成功')
      }
      console.log(event)
    }
  }

  // 新增/修改数据库数据
  updateItem(storeName: string, data: any) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.put({
      ...data,
      updateTime: new Date().getTime()
    }) // put方法同时兼容，add增加
    request.onsuccess = (event: any) => {
      console.log('数据写入成功')
      console.log(event)
    }
    request.onerror = (event: any) => {
      console.log('数据写入失败')
      console.log(event)
    }
  }

  // 删除数据
  deleteItem(storeName: string, key: number | string) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.delete(key)
    request.onsuccess = (event: any) => {
      console.log('数据删除成功')
      console.log(event)
    }
    request.onerror = (event: any) => {
      console.log('数据删除失败')
      console.log(event)
    }
  }

  // 查询所有数据
  getList(storeName: string) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.getAll()
    request.onsuccess = (event: any) => {
      console.log('查询所有数据成功')
      console.log(event.target.result)
    }
    request.onerror = (event: any) => {
      console.log('查询所有数据失败')
      console.log(event)
    }
  }

  // 查询某一条数据
  getItem(storeName: string, key: number | string) {
    const store = this.db.transaction(storeName).objectStore(storeName)
    const request = store.get(key)
    request.onsuccess = (event: any) => {
      console.log('查询某一条数据成功')
      console.log(event.target.result)
    }
    request.onerror = (event: any) => {
      console.log('查询某一条数据失败')
      console.log(event)
    }
  }
}
