import HttpException from "./http-exception";

export default class ErrorForbidden extends HttpException {
  constructor(message: string) {
    super("ErrorForbidden: " + message, 403);
  }
}
