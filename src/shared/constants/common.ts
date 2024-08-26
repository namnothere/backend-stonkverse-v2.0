export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';

export const FORWARDED_FOR_TOKEN_HEADER = 'x-forwarded-for';

export enum RESULT_STATUS {
  FAILED = 0,
  SUCCEED = 1,
}

export const MESSAGES = {
  OK: 'ok',

  LOGIN_INCORRECT: 'login incorrect',

  USERNAME_ALREADY_EXIST: 'username already exist',
  USER_NOT_FOUND: 'user not found',

  ACTIVATION_CODE_INCORRECT: 'activation code incorrect',
  INCORRECT_PASSWORD: 'incorrect password',

  USER_NOT_VERIFIED: 'user not verified',
  USER_ALREADY_VERIFIED: 'user already verified',

  COURSE_NOT_FOUND: 'course not found',

  USER_DOES_NOT_OWN_COURSE: 'user does not own course',
  USER_ALREADY_OWN_COURSE: 'user already own course',
};

export const ROLES_KEY = 'roles';
export const CLOUDINARY = 'Cloudinary';
