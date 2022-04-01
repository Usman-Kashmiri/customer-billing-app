export interface IHttpResponse {
  status: number | string | boolean;
  message: string;
  data: any;
  success: boolean;
  error? : any;
}
