export interface ICourse {
  id: number;
  name: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated?: boolean;
  authors: number[];
  [key: string]: string | number | Date | boolean | undefined | (string | number)[];
}
