const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_PATTERN =
  /^(?=.*\d)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[()[\]{}<>`~!@#№%$^&*\-_=+:;"'\\|,.?/]).{8,}$/;

export const passwordValidator: (
  _: any,
  value: any,
) => Promise<Error | void> = (_, value: string | undefined) => {
  if (value) {
    if (value.length < MIN_PASSWORD_LENGTH) {
      return Promise.reject(
        new Error(
          `Password must be at least ${MIN_PASSWORD_LENGTH} chars length`,
        ),
      );
    }
    if (!PASSWORD_PATTERN.test(value)) {
      return Promise.reject(
        new Error(
          'Password must contain at least 1 lowercase, 1 uppercase, 1 digit and 1 special char',
        ),
      );
    }
  }
  return Promise.resolve();
};
