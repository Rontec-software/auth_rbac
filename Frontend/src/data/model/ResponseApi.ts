interface objError {
  message: string;
  field: string;
}

export default interface ResponseApi<T> {
  success: boolean;
  status: number;
  json: T | null;
  errors?: objError[];
}
