/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Page_QuestionListVo_ } from '../models/BaseResponse_Page_QuestionListVo_';
import type { BaseResponse_QuestionViewVo_ } from '../models/BaseResponse_QuestionViewVo_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionControllerService {
    /**
     * questionInfo
     * @param id id
     * @returns BaseResponse_QuestionViewVo_ OK
     * @throws ApiError
     */
    public static questionInfoUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_QuestionViewVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/questionInfo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * questions
     * @param pageNow pageNow
     * @param pageSize pageSize
     * @returns BaseResponse_Page_QuestionListVo_ OK
     * @throws ApiError
     */
    public static questionsUsingGet(
        pageNow?: number,
        pageSize?: number,
    ): CancelablePromise<BaseResponse_Page_QuestionListVo_> {
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
