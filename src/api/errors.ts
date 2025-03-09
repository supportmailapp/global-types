import { SetupTicketsErrorCode } from "../utils/enums";

interface ClientAPIErrorExtraFields {
  response?: any;
  data?: any;
}

interface IClientAPIError {
  /**
   * The error message.
   */
  message: string;
  /**
   * The error code.
   */
  code: SetupTicketsErrorCode;
  /**
   * The response from an API call that was made on the server.
   */
  response: any;
  /**
   * Additional data that may be useful for debugging.
   */
  data: any;
}

export class ClientAPIError implements IClientAPIError {
  public message: string;
  public code: SetupTicketsErrorCode;
  public response: any;
  public data: ClientAPIErrorData | undefined;

  constructor(
    message: string,
    code: SetupTicketsErrorCode,
    { response = undefined, data = undefined }: ClientAPIErrorExtraFields
  ) {
    this.message = message;
    this.code = code;
    this.response = response;
    this.data = data;
  }

  public toString(): string {
    return `${this.code}: ${this.message}`;
  }

  public toJSON() {
    return {
      message: this.message,
      code: this.code,
      extra: {
        response: this.response,
        data: this.data,
      },
    };
  }
}

export type ClientAPIErrorData = MissingPermissionsError;

export type MissingPermissionsData = {
  /**
   * The permissions that the bot is missing.
   *
   * Stringified permission flags.
   *
   * @example
   * ```json
   * ["MANAGE_MESSAGES", "VIEW_CHANNEL"]
   */
  missing: string[];
};

export type MissingPermissionsError = ClientAPIError & {
  code: SetupTicketsErrorCode.MissingPermissions;
  data: MissingPermissionsData;
};
