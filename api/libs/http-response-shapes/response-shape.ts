export default class ResponseShape {
  constructor(
    readonly status: "success" | "fail" | "error",
    readonly message: string,
    readonly code: number,
    readonly data: Record<string, unknown> | null,
  ) {}
}
