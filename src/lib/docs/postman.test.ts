import { endpoints } from "./openapi";
import { postmanCollection } from "./postman";

describe("the Postman collection", () => {
  const collection = postmanCollection(undefined, "https://api.test/developer/api/v1");
  const all = collection.item.flatMap((folder) => folder.item);

  it("is a v2.1 collection with the key as a bearer token and the base URL as a variable", () => {
    expect(collection.info.schema).toBe("https://schema.getpostman.com/json/collection/v2.1.0/collection.json");
    expect(collection.auth.bearer[0].value).toBe("{{apiKey}}");
    expect(collection.variable.map((v) => v.key)).toEqual(["baseUrl", "apiKey"]);
    expect(all).toHaveLength(endpoints().length);
  });

  it("has Create an order, ready to send", () => {
    const create = all.find((i) => i.name === "Create an order")!;
    expect(create.request.method).toBe("POST");
    expect(create.request.url.raw).toBe("{{baseUrl}}/orders");
    expect(JSON.parse(create.request.body!.raw)).toEqual(
      expect.objectContaining({ type: "single", service_area: "NG-LA" }),
    );
    expect(create.request.header).toEqual(
      expect.arrayContaining([expect.objectContaining({ key: "Idempotency-Key", value: "{{$guid}}" })]),
    );
  });

  it("turns {id} into a Postman path variable, and optional query values start off", () => {
    const get = all.find((i) => i.request.method === "GET" && i.request.url.raw === "{{baseUrl}}/orders/:id")!;
    expect(get.request.url.variable).toEqual([expect.objectContaining({ key: "id" })]);
    const list = all.find((i) => i.request.method === "GET" && i.request.url.raw === "{{baseUrl}}/orders")!;
    expect(list.request.url.query?.find((q) => q.key === "limit")).toEqual(
      expect.objectContaining({ value: "5", disabled: false }),
    );
    expect(list.request.url.query?.find((q) => q.key === "starting_after")?.disabled).toBe(true);
  });
});
