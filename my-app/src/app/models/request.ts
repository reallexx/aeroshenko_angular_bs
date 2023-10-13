export interface IRequest {
  [param: string]: string | number | boolean | (string | number | boolean)[];
}
