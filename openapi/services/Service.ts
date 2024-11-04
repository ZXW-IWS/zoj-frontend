/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponseListString } from '../models/BaseResponseListString';
import type { BaseResponseLong } from '../models/BaseResponseLong';
import type { BaseResponsePageQuestionDto } from '../models/BaseResponsePageQuestionDto';
import type { BaseResponsePageQuestionSubmitDto } from '../models/BaseResponsePageQuestionSubmitDto';
import type { BaseResponseQuestionAdminDto } from '../models/BaseResponseQuestionAdminDto';
import type { BaseResponseQuestionDto } from '../models/BaseResponseQuestionDto';
import type { BaseResponseString } from '../models/BaseResponseString';
import type { BaseResponseUserDto } from '../models/BaseResponseUserDto';
import type { BaseResponseVoid } from '../models/BaseResponseVoid';
import type { QuestionAddReq } from '../models/QuestionAddReq';
import type { QuestionDeleteReq } from '../models/QuestionDeleteReq';
import type { QuestionPageReq } from '../models/QuestionPageReq';
import type { QuestionSubmitPageReq } from '../models/QuestionSubmitPageReq';
import type { QuestionSubmitReq } from '../models/QuestionSubmitReq';
import type { QuestionUpdateReq } from '../models/QuestionUpdateReq';
import type { UserLoginReq } from '../models/UserLoginReq';
import type { UserRegisterReq } from '../models/UserRegisterReq';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * 用户注册接口
     * @param requestBody
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static register(
        requestBody: UserRegisterReq,
    ): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/public/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseVoid OK
     * @throws ApiError
     */
    public static updateQuestion(
        requestBody: QuestionUpdateReq,
    ): CancelablePromise<BaseResponseVoid> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/question/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static addQuestion(
        requestBody: QuestionAddReq,
    ): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/question/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 用户登录接口
     * @param requestBody
     * @returns BaseResponseString OK
     * @throws ApiError
     */
    public static login(
        requestBody: UserLoginReq,
    ): CancelablePromise<BaseResponseString> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/public/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponsePageQuestionSubmitDto OK
     * @throws ApiError
     */
    public static getPage(
        requestBody: QuestionSubmitPageReq,
    ): CancelablePromise<BaseResponsePageQuestionSubmitDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/submit/public/submit/list',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static submitQuestion(
        requestBody: QuestionSubmitReq,
    ): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/submit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponsePageQuestionDto OK
     * @throws ApiError
     */
    public static getByPage(
        requestBody: QuestionPageReq,
    ): CancelablePromise<BaseResponsePageQuestionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/list/page',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns BaseResponseUserDto OK
     * @throws ApiError
     */
    public static getCurrentUser(): CancelablePromise<BaseResponseUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/current',
        });
    }
    /**
     * @returns BaseResponseListString OK
     * @throws ApiError
     */
    public static getTagNameList(): CancelablePromise<BaseResponseListString> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/tag/public/list',
        });
    }
    /**
     * @param questionId
     * @returns BaseResponseQuestionDto OK
     * @throws ApiError
     */
    public static getById(
        questionId: number,
    ): CancelablePromise<BaseResponseQuestionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/get/{questionId}',
            path: {
                'questionId': questionId,
            },
        });
    }
    /**
     * @param questionId
     * @returns BaseResponseQuestionAdminDto OK
     * @throws ApiError
     */
    public static adminGetById(
        questionId: number,
    ): CancelablePromise<BaseResponseQuestionAdminDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/admin/get/{questionId}',
            path: {
                'questionId': questionId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseVoid OK
     * @throws ApiError
     */
    public static deleteQuestion(
        requestBody: QuestionDeleteReq,
    ): CancelablePromise<BaseResponseVoid> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/question/delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
