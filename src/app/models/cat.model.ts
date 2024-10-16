export interface Breed {
    name: string;
    origin: string;
    temperament: string;
  }
  
  export interface Cat {
    id: string;
    url: string;
    breeds: Breed[];
  }
  