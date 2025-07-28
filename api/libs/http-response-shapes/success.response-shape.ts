import ResponseShape from "./response-shape";

export default class SuccessResponse extends ResponseShape {
  constructor(message: string, data: Record<string, unknown> | null = null) {
    const statusCode = 200;
    super("success", message, statusCode, data);
  }
}
