import { IStorage } from "../models/general";

export class LocalStorage implements IStorage{
  typeStorage = 'local';

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  getItemObject(key: string) {
    const itemStorage: string|null = this.getItem(key);
    const value = itemStorage ? JSON.parse(atob(itemStorage)) : null;
    return value
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  setItem(key: string, data: any) {
    const type = typeof data;
    const value = type === 'object' ? JSON.stringify(data) : data.toString();
    localStorage.setItem(key, value);
  }

  clear() {
    localStorage.clear();
  }
}

export class SessionStorage implements IStorage{
  typeStorage = 'session';

  getItem(key: string) {
    return sessionStorage.getItem(key);
  }

  getItemObject(key: string) {
    return JSON.parse(sessionStorage.getItem(key) as string);
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  setItem(key: string, data: any) {
    const type = typeof data;
    const value = type === 'object' ? JSON.stringify(data) : data.toString();
    sessionStorage.setItem(key, value);
  }

  clear() {
    sessionStorage.clear();
  }
}


export class StorageService {
  private typeStorage = 'session';
  private storage: IStorage;

  constructor() {
    this.storage = this.setStorage();
  }


  setStorage(): IStorage {
    switch (this.typeStorage) {
      case 'session':
        return new SessionStorage();
        break;
      case 'local':
        return new LocalStorage();
        break;
      default:
        return new LocalStorage();
        break;
    }
  }

  get(): IStorage {
    return this.storage;
  }

  getItem(key: string): any {
    return this.storage.getItem(key);
  }

  getItemObject<T>(key: string): T {
    const itemStorage = this.getItem(key);
    return itemStorage ? JSON.parse(itemStorage) : null;
  }
 
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem<T = string>(key: string, obj: T): void {
    this.storage.setItem(key, obj);
  }

  setItemObject(key: string, obj: any): void {
    const dataTmp = JSON.stringify(obj);
    this.setItem(key, dataTmp);
  }

  clear(): void {
    this.storage.clear();
  }

}