/* tslint:disable */
/* eslint-disable */
/**
 * This is generated by openapi-ts-client-gen - do not edit directly!
 */
import request from 'superagent';

export interface IRequestParams {
  method: string;
  url: string;
  queryParameters?: { [key: string]: string | boolean | number | Date | undefined };
  body?: Object;
}

export abstract class ApiService {
  protected executeRequest<T>(params: IRequestParams, requestModFn?: (req: request.SuperAgentRequest) => void) {
    return new Promise<T>((resolve, reject) => {
      let req = request(params.method, params.url)
        .set('Content-Type', 'application/json');

      if (requestModFn) {
        requestModFn(req);
      }

      const queryParameters = params.queryParameters;
      if (queryParameters) {
        Object.keys(queryParameters).forEach(key => {
          const value = queryParameters[key];
          if (Object.prototype.toString.call(value) === '[object Date]') {
            queryParameters[key] = (value as Date).toISOString();
          }
        });

        req = req.query(queryParameters);
      }
      if (params.body) { req.send(params.body); }

      req.end((error: any, response: any) => {
        if (error || !response.ok) {
          if (response && response.body) {
            const customError: any = new Error(response.body.message);
            customError.status = response.body.status;
            customError.type = response.body.type;
            reject(customError);
            return;
          }

          reject(error);
        } else {
          resolve(response.body);
        }
      });
    });
  }
}

export namespace Api {
  let baseApiUrl: string;
  let requestModFn: ((req: request.SuperAgentRequest) => void) | undefined;

  export const Initialize = (params: { host: string; protocol?: string; }) => {
    baseApiUrl = `${params.protocol || 'https'}://${params.host}`;
  };

  export const SetRequestModifier = (fn: (req: request.SuperAgentRequest) => void) => {
    requestModFn = fn;
  };



    export interface IUser {
      'email': string;
      'name': string;
      'address'?: string;
      'id': number;
      'date_created': Date;
      'date_updated': Date;
    }


    export interface ICreateUserRequest {
      'email': string;
      'name': string;
      'address'?: string;
    }


    export interface IUsersGetParams {
      page_number?: any;
      page_size?: any;
    }

    export interface IUsersGetUserByIdParams {
      user_id: any;
    }

    export interface IUsersDeleteUserParams {
      user_id: any;
    }
    export class UsersService extends ApiService {

      public async get(_params: IUsersGetParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/users`
        };

        requestParams.queryParameters = {
          page_number: _params.page_number,
          page_size: _params.page_size,
        };
        return this.executeRequest<IUser[]>(requestParams, requestModFn);
      }

      public async createUser(_params: ICreateUserRequest) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/users`
        };

        requestParams.body = _params;
        return this.executeRequest<IUser>(requestParams, requestModFn);
      }

      public async getUserById(_params: IUsersGetUserByIdParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/users/${_params.user_id}`
        };
        return this.executeRequest<IUser>(requestParams, requestModFn);
      }

      public async deleteUser(_params: IUsersDeleteUserParams) {
        const requestParams: IRequestParams = {
          method: 'DELETE',
          url: `${baseApiUrl}/users/${_params.user_id}`
        };
        return this.executeRequest<void>(requestParams, requestModFn);
      }
    }
}
