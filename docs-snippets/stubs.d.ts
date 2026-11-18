/**
 * Just enough of each framework the examples use, so they type-check without installing them.
 * What's checked for real is every call into `pickriders` (installed from npm) and React/Next.js
 * (installed for the dashboard). Keep these to the shapes the examples touch.
 */

declare module "server-only" {}

declare module "express" {
  import type { IncomingMessage, ServerResponse } from "node:http";
  export interface Request extends IncomingMessage {
    body: unknown;
    params: Record<string, string>;
  }
  export interface Response extends ServerResponse {
    json(body: unknown): Response;
    status(code: number): Response;
  }
  type Handler = (req: Request, res: Response) => unknown;
  export interface Application {
    use(handler: unknown): Application;
    post(path: string, handler: Handler): Application;
    post(path: string, middleware: unknown, handler: Handler): Application;
    get(path: string, handler: Handler): Application;
    listen(port: number, callback?: () => void): unknown;
  }
  interface Express {
    (): Application;
    json(): unknown;
    raw(options: { type: string }): unknown;
  }
  const express: Express;
  export default express;
}

declare module "fastify" {
  import type { IncomingMessage, ServerResponse } from "node:http";
  interface FastifyRequest {
    body: unknown;
    headers: IncomingMessage["headers"];
    raw: IncomingMessage;
  }
  interface FastifyReply {
    code(status: number): FastifyReply;
    send(body?: unknown): FastifyReply;
    raw: ServerResponse;
    hijack(): void;
  }
  interface FastifyInstance {
    addContentTypeParser(
      type: string,
      options: { parseAs: "buffer" | "string" },
      parser: (
        req: FastifyRequest,
        body: Buffer,
        done: (err: Error | null, body?: unknown) => void,
      ) => void,
    ): void;
    post(
      path: string,
      handler: (req: FastifyRequest, reply: FastifyReply) => unknown,
    ): void;
    listen(options: { port: number }): Promise<string>;
  }
  export default function Fastify(options?: object): FastifyInstance;
}

declare module "@nestjs/common" {
  export function Controller(path?: string): ClassDecorator;
  export function Post(path?: string): MethodDecorator;
  export function HttpCode(code: number): MethodDecorator;
  export function Req(): ParameterDecorator;
  export function Headers(name?: string): ParameterDecorator;
  export class BadRequestException extends Error {
    constructor(message?: string);
  }
  export interface RawBodyRequest<T> {
    rawBody?: Buffer;
    req?: T;
  }
}

declare module "vue" {
  export interface Ref<T> {
    value: T;
  }
  export type MaybeRefOrGetter<T> = T | Ref<T> | (() => T);
  export function shallowRef<T>(value: T): Ref<T>;
  export function readonly<T>(value: T): Readonly<T>;
  export function toValue<T>(source: MaybeRefOrGetter<T>): T;
  export function watchEffect(
    effect: (onCleanup: (fn: () => void) => void) => void,
  ): () => void;
}

declare module "svelte/store" {
  export interface Readable<T> {
    subscribe(run: (value: T) => void): () => void;
  }
  export function readable<T>(
    value: T,
    start: (set: (value: T) => void) => () => void,
  ): Readable<T>;
}

declare module "@sveltejs/kit" {
  export type RequestHandler = (event: {
    request: Request;
    params: Record<string, string>;
  }) => Response | Promise<Response>;
  export function json(body: unknown, init?: ResponseInit): Response;
  export function error(status: number, message: string): never;
}

declare module "h3" {
  export interface H3Event {
    readonly __h3: true;
  }
  export function defineEventHandler<T>(
    handler: (event: H3Event) => T,
  ): (event: H3Event) => T;
  export function toWebRequest(event: H3Event): Request;
}

declare module "vitest" {
  export function describe(name: string, fn: () => void): void;
  export function it(name: string, fn: () => unknown): void;
  export function expect<T>(value: T): {
    toBe(expected: unknown): void;
    toEqual(expected: unknown): void;
    toHaveBeenCalledWith(...args: unknown[]): void;
  };
  export const vi: {
    fn<T extends (...args: never[]) => unknown>(
      impl?: T,
    ): T & { mock: { calls: unknown[][] } };
  };
}
