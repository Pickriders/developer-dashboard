import { highlight } from "./highlight";
import { DOC_PAGES, docHref, neighbours, searchDocs } from "./pages";

describe("highlight", () => {
  const types = (code: string, lang: Parameters<typeof highlight>[1]) =>
    highlight(code, lang)
      .filter((t) => t.type !== "plain")
      .map((t) => [t.type, t.text]);

  it("colours JSON keys apart from values", () => {
    expect(types('{"amount": 350000, "live": false, "id": "ord_1"}', "json")).toEqual([
      ["key", '"amount"'],
      ["number", "350000"],
      ["key", '"live"'],
      ["keyword", "false"],
      ["key", '"id"'],
      ["string", '"ord_1"'],
    ]);
  });

  it("finds comments, strings and keywords in code", () => {
    expect(types('const key = "sk_test_1"; // secret', "javascript")).toEqual([
      ["keyword", "const"],
      ["string", '"sk_test_1"'],
      ["comment", "// secret"],
    ]);
    expect(types("# a comment\nimport os", "python")).toEqual([
      ["comment", "# a comment"],
      ["keyword", "import"],
    ]);
  });

  it("keeps a # inside a URL, and PHP variables", () => {
    expect(types("curl https://x.test/docs#errors", "bash")).toEqual([["keyword", "curl"]]);
    expect(types("$secret = 'whsec_1';", "php")).toEqual([
      ["variable", "$secret"],
      ["string", "'whsec_1'"],
    ]);
  });

  it("never loses or changes a character", () => {
    const code = `curl -X POST https://api.test/v1/orders \\\n  -H "Authorization: Bearer $KEY" -d '{"a":1}'`;
    expect(
      highlight(code, "bash")
        .map((t) => t.text)
        .join(""),
    ).toBe(code);
  });
});

describe("docs pages", () => {
  it("have unique slugs, and a description short enough for search results", () => {
    expect(new Set(DOC_PAGES.map((p) => p.slug)).size).toBe(DOC_PAGES.length);
    for (const page of DOC_PAGES) expect(page.description.length).toBeLessThanOrEqual(160);
  });

  it("link /docs itself and each page under it", () => {
    expect(docHref("")).toBe("/docs");
    expect(docHref("errors")).toBe("/docs/errors");
  });

  it("know what comes next", () => {
    expect(neighbours("").previous).toBeNull();
    expect(neighbours("").next?.slug).toBe("quickstart");
    expect(neighbours(DOC_PAGES[DOC_PAGES.length - 1].slug).next).toBeNull();
  });

  it("search by title, keyword or description, every word counting", () => {
    expect(searchDocs("webhook")[0].slug).toBe("webhooks");
    expect(searchDocs("kobo")[0].slug).toBe("money");
    expect(searchDocs("signature")[0].slug).toBe("webhooks");
    expect(searchDocs("404")[0].slug).toBe("errors");
    expect(searchDocs("first delivery")[0].slug).toBe("quickstart");
    expect(searchDocs("webhook kobo")).toEqual([]);
    expect(searchDocs("   ")).toEqual([]);
  });
});

describe("the changelog", () => {
  it("is newest first, each entry with a real date and its own anchor", () => {
    const { CHANGELOG } = jest.requireActual("./changelog") as typeof import("./changelog");
    expect(CHANGELOG.length).toBeGreaterThan(0);
    expect(CHANGELOG.map((e) => e.date)).toEqual([...CHANGELOG.map((e) => e.date)].sort().reverse());
    expect(new Set(CHANGELOG.map((e) => e.id)).size).toBe(CHANGELOG.length);
    for (const e of CHANGELOG) expect(Number.isNaN(Date.parse(e.date))).toBe(false);
  });
});
