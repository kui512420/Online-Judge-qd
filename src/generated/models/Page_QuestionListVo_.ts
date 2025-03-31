/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
import type { QuestionListVo } from './QuestionListVo';
export type Page_QuestionListVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<QuestionListVo>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

