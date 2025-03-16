/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_PageInfo_QuestionListVo_ } from '../models/BaseResponse_PageInfo_QuestionListVo_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionControllerService {
    /**
     * questions
     * @param pageNow pageNow
     * @param pageSize pageSize
     * @returns BaseResponse_PageInfo_QuestionListVo_ OK
     * @throws ApiError
     */
    public static questionsUsingGet(
        pageNow?: number,
        pageSize?: number,
    ): CancelablePromise<BaseResponse_PageInfo_QuestionListVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/questions',
            query: {
                'pageNow': pageNow,
                'pageSize': pageSize,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
