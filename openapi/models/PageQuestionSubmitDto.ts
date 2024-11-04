/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
import type { QuestionSubmitDto } from './QuestionSubmitDto';
export type PageQuestionSubmitDto = {
    records?: Array<QuestionSubmitDto>;
    total?: number;
    size?: number;
    current?: number;
    orders?: Array<OrderItem>;
    optimizeCountSql?: PageQuestionSubmitDto;
    searchCount?: PageQuestionSubmitDto;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
};

