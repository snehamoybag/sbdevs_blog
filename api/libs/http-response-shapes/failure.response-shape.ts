import ResponseShape from "./response-shape";

export default class FailureResponse extends ResponseShape {
  constructor(
    message: string,
    code: number,
    data: Record<string, unknown> | null = null,
  ) {
    super("fail", message, code, data);
  }
}
