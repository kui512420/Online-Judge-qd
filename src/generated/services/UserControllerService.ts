/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_Map_object_object_ } from '../models/BaseResponse_Map_object_object_';
import type { BaseResponse_Map_string_string_ } from '../models/BaseResponse_Map_string_string_';
import type { BaseResponse_Page_User_ } from '../models/BaseResponse_Page_User_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { EmailRequest } from '../models/EmailRequest';
import type { UserLoginRequset } from '../models/UserLoginRequset';
import type { UserPasswordRequest } from '../models/UserPasswordRequest';
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
     * export
     * @returns any OK
     * @throws ApiError
     */
    public static exportUsingPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/export',
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
        accesstoken?: string,
    ): CancelablePromise<BaseResponse_Map_object_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get/login',
            headers: {
                'Accesstoken': accesstoken,
            },
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
        refreshToken?: string,
    ): CancelablePromise<BaseResponse_Map_object_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/refreshToken',
            headers: {
                'RefreshToken': refreshToken,
            },
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
    /**
     * deleteUsers
     * @param requestBody
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static deleteUsersUsingDelete(
        requestBody?: Array<number>,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/user/user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * deleteUser
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static deleteUserUsingDelete(
        id: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/user/user/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * putUserRole
     * @param id id
     * @param userRole userRole
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static putUserRoleUsingPut(
        id: number,
        userRole: string,
    ): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/user/{id}/{userRole}',
            path: {
                'id': id,
                'userRole': userRole,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getUserList
     * @param email
     * @param id
     * @param page
     * @param size
     * @param type
     * @param userAccount
     * @returns BaseResponse_Page_User_ OK
     * @throws ApiError
     */
    public static getUserListUsingGet(
        email?: string,
        id?: number,
        page?: number,
        size?: number,
        type?: number,
        userAccount?: string,
    ): CancelablePromise<BaseResponse_Page_User_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/userList',
            query: {
                'email': email,
                'id': id,
                'page': page,
                'size': size,
                'type': type,
                'userAccount': userAccount,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * setUerName
     * @param accesstoken Accesstoken
     * @param requestBody
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setUerNameUsingPut(
        accesstoken?: string,
        requestBody?: string,
    ): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/userName',
            headers: {
                'Accesstoken': accesstoken,
            },
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
     * setUserPassword
     * @param accesstoken Accesstoken
     * @param requestBody
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setUserPasswordUsingPut(
        accesstoken?: string,
        requestBody?: UserPasswordRequest,
    ): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/userPassword',
            headers: {
                'Accesstoken': accesstoken,
            },
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
     * setUserProfile
     * @param accesstoken Accesstoken
     * @param requestBody
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setUserProfileUsingPut(
        accesstoken?: string,
        requestBody?: string,
    ): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/userProfile',
            headers: {
                'Accesstoken': accesstoken,
            },
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
