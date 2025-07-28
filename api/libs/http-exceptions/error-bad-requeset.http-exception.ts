import HttpException from "./http-exception";

export default class ErrorBadRequest extends HttpException {
  constructor(message: string) {
    super("ErrorBadRequest: " + message, 400);
  }
}
