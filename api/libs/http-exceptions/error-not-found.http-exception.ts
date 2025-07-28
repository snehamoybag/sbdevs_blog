import HttpException from "./http-exception";

export default class ErrorNotFound extends HttpException {
  constructor(message: string) {
    super("ErrorNotFound: " + message, 404);
  }
}
