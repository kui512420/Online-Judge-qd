/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Map_object_object_ } from '../models/BaseResponse_Map_object_object_';
import type { BaseResponse_Map_string_string_ } from '../models/BaseResponse_Map_string_string_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { EmailRequest } from '../models/EmailRequest';
import type { UserLoginRequset } from '../models/UserLoginRequset';
import type { UserRegisterRequest } from '../models/UserRegisterRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * captcha
     * @returns any OK
     * @throws ApiError
     */
    public static captchaUsingGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/captcha',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * captcha
     * @returns any OK
     * @throws ApiError
     */
    public static captchaUsingPut(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/captcha',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * captcha
     * @returns any OK
     * @throws ApiError
     */
    public static captchaUsingPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/captcha',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * captcha
     * @returns any OK
     * @throws ApiError
     */
    public static captchaUsingDelete(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/user/captcha',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * captcha
     * @returns any OK
     * @throws ApiError
     */
    public static captchaUsingOptions(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/user/captcha',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * captcha
     * @returns any OK
     * @throws ApiError
     */
    public static captchaUsingHead(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/user/captcha',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * captcha
     * @returns any OK
     * @throws ApiError
     */
    public static captchaUsingPatch(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/user/captcha',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * sendEmail
     * @param requestBody
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static sendEmailUsingPost(
        requestBody?: EmailRequest,
    ): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/email',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getLogin
     * @param accesstoken Accesstoken
     * @returns BaseResponse_Map_object_object_ OK
     * @throws ApiError
     */
    public static getLoginUsingGet(
    ): CancelablePromise<BaseResponse_Map_object_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get/login',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * register
     * @param requestBody
     * @returns BaseResponse_Map_string_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static registerUsingPost(
        requestBody?: UserLoginRequset,
    ): CancelablePromise<BaseResponse_Map_string_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * refreshToken
     * @param refreshToken RefreshToken
     * @returns BaseResponse_Map_object_object_ OK
     * @throws ApiError
     */
    public static refreshTokenUsingGet(
    ): CancelablePromise<BaseResponse_Map_object_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/refreshToken',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * register
     * @param requestBody
     * @returns BaseResponse_Map_string_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static registerUsingPost1(
        requestBody?: UserRegisterRequest,
    ): CancelablePromise<BaseResponse_Map_string_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
