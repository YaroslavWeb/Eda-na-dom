export interface ICategory {
  readonly id: string;
  name: string;
  image: string;
}

export interface IDelivery {
  readonly id: string;
  name: string;
  logo: string;
  city: string;
  categories: string[];
  timeOpen: string;
  timeClose: string;
  minPrice: string;
  // payment         : boolean[]
  // latitude        : string
  // longitude       : string
  linkSite: string;
  linkApp: string;
  linkInst: string;
  phoneNumber: string;
  baners: { uri: string }[];
}
