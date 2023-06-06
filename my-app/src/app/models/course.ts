export interface ICourse {
  id: number;
  name: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated?: boolean;
}
