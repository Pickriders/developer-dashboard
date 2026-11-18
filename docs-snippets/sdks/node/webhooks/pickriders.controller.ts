// @file src/webhooks/pickriders.controller.ts
import {
  BadRequestException,
  Controller,
  Headers,
  HttpCode,
  Post,
  Req,
  type RawBodyRequest,
} from "@nestjs/common";
import { SignatureVerificationError } from "pickriders";

import { pickriders } from "../pickriders";

// main.ts: NestFactory.create(AppModule, { rawBody: true })
@Controller("webhooks/pickriders")
export class PickridersWebhooksController {
  @Post()
  @HttpCode(200)
  async receive(
    @Req() req: RawBodyRequest<Request>,
    @Headers("pickriders-signature") signature: string,
  ) {
    try {
      const event = await pickriders.webhooks.constructEvent(req.rawBody!, signature);
      await pickriders.webhooks.dispatch(event);
      return { received: true };
    } catch (error) {
      if (error instanceof SignatureVerificationError)
        throw new BadRequestException(error.message);
      throw error; // a 500: Pickriders sends the event again later
    }
  }
}
