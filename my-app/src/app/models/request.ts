export interface IRequest {
  [param: string]: string | number | boolean | readonly (string | number | boolean)[];
}
