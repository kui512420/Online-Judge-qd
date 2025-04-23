/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FilleControllerService {
    /**
     * @param accesstoken
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static uploadFile(
        accesstoken?: string,
        requestBody?: {
            file: Blob;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file/upload',
            headers: {
                'Accesstoken': accesstoken,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param filename
     * @returns string OK
     * @throws ApiError
     */
    public static getImage(
        filename: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file/userheader/{filename}',
            path: {
                'filename': filename,
            },
        });
    }
}
