/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FilleControllerService {
    /**
     * uploadFile
     * @param accesstoken Accesstoken
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static uploadFileUsingPost(
        accesstoken?: string,
        requestBody?: Blob,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file/upload',
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
     * getImage
     * @param filename filename
     * @returns string OK
     * @throws ApiError
     */
    public static getImageUsingGet(
        filename: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file/userheader/{filename}',
            path: {
                'filename': filename,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
