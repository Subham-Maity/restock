export interface IFilter {
  id: string;
  name: string;
  options: any[];
}

export interface KeyFilter {
  [key: string]: string[];
}
