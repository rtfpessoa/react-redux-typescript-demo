export interface BaseResponse<D> {
  data: D;
}

export interface HTTPResponse<D> extends BaseResponse<ResponseData<D>> {
  data: ResponseData<D>;
}

interface ResponseData<D> {
  children: Array<D>;
}
