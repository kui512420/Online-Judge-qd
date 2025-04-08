/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_Page_QuestionListVo_ } from '../models/BaseResponse_Page_QuestionListVo_';
import type { BaseResponse_QuestionViewVo_ } from '../models/BaseResponse_QuestionViewVo_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { QuestionPostRequest } from '../models/QuestionPostRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionControllerService {
    /**
     * question
     * @param accessToken AccessToken
     * @param requestBody
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static questionUsingPost(
        accessToken?: string,
        requestBody?: QuestionPostRequest,
    ): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/question',
            headers: {
                'AccessToken': accessToken,
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
     * questionInfo
     * @param id id
     * @returns BaseResponse_QuestionViewVo_ OK
     * @throws ApiError
     */
    public static questionInfoUsingGet(
        id: number,
    ): CancelablePromise<BaseResponse_QuestionViewVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/questionInfo/{id}',
            path: {
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
     * @param findType
     * @param id
     * @param pageNow
     * @param pageSize
     * @param questionName
     * @param submitNumOrderType
     * @param tags
     * @returns BaseResponse_Page_QuestionListVo_ OK
     * @throws ApiError
     */
    public static questionsUsingGet(
        findType?: number,
        id?: number,
        pageNow?: number,
        pageSize?: number,
        questionName?: string,
        submitNumOrderType?: number,
        tags?: Array<string>,
    ): CancelablePromise<BaseResponse_Page_QuestionListVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/questions',
            query: {
                'findType': findType,
                'id': id,
                'pageNow': pageNow,
                'pageSize': pageSize,
                'questionName': questionName,
                'submitNumOrderType': submitNumOrderType,
                'tags': tags,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * submit
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static submitUsingPost(): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/submit',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
