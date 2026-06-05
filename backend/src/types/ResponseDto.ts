export interface ResponseDto<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const successResult = <T>(
  data: T,
  message: string
): ResponseDto<T> => ({
  success: true,
  message,
  data,
});

export const errorResult = <T>(
  message: string
): ResponseDto<T> => ({
  success: false,
  message,
});