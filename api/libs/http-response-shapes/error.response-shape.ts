import ResponseShape from "./response-shape";

export default class ErrorResponse extends ResponseShape {
  constructor(
    message: string,
    code: number,
    data: Record<string, unknown> | null = null,
  ) {
    super("error", message, code, data);
  }
}
