export interface UserBasic {
  phone: number | null;
  birthdate: string;
  document: string;
  documentType: number;
  conditions: boolean;
  comunications: boolean;
}
export interface IPlanUser {
    id      : number,
    pack    : string,
    img     : string,
    price   : string,
    period  : string,
    state   : boolean,
    cobertura : string,
    saldo   : string,
    plan    : string,
    offers  : Offer[]
   
}

export interface Offer {
  name: string, 
  description: string, 
  state: boolean
}
export interface User {
  documentType: number;
  document: string,
  secureFor: number,
  gender: number,
  name: string,
  fatherLastname: string,
  motherLastname: string,
  birthdate: string
}
export interface RadioItem {
  val: number;
  desc: string;
}

export interface IStorage {
  typeStorage: string;
  getItem(key: string): any;
  getItemObject<T>(key: string): T;
  removeItem(key: string): void;
  setItem<T = string>(key: string, data: T): void;
  clear(): void;
}

export interface Item {
  val: string;
  desc: string;
  state: boolean;
}