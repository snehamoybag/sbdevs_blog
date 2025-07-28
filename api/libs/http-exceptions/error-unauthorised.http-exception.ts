import HttpException from "./http-exception";

export default class ErrorUnauthorised extends HttpException {
  constructor(message: string) {
    super("ErrorUnauthorised: " + message, 401);
  }
}
