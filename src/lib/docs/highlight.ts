/**
 * A small syntax highlighter for the docs' examples (bash, JavaScript, Python, PHP, JSON). It
 * (and Go) colours strings, comments, numbers, keywords and JSON keys, which is all a short example needs,
 * without shipping a grammar library. Anything it doesn't know stays plain text.
 */
export type Lang = "bash" | "javascript" | "python" | "php" | "go" | "json" | "text";
export type TokenType = "plain" | "comment" | "string" | "number" | "keyword" | "key" | "variable";
export type Token = { type: TokenType; text: string };

const KEYWORDS: Record<Lang, string[]> = {
  bash: ["curl", "export", "echo"],
  javascript: [
    "const",
    "let",
    "await",
    "async",
    "function",
    "return",
    "if",
    "else",
    "new",
    "import",
    "from",
    "export",
    "true",
    "false",
    "null",
    "throw",
    "try",
    "catch",
  ],
  python: [
    "import",
    "from",
    "def",
    "return",
    "if",
    "else",
    "elif",
    "True",
    "False",
    "None",
    "for",
    "in",
    "not",
    "and",
    "or",
    "raise",
    "with",
    "as",
  ],
  php: ["function", "return", "if", "else", "true", "false", "null", "new", "echo", "use", "throw", "fn"],
  go: ["func", "return", "if", "for", "range", "var", "package", "import", "nil", "true", "false", "continue", "type"],
  json: ["true", "false", "null"],
  text: [],
};

const COMMENT: Partial<Record<Lang, RegExp>> = {
  bash: /^#[^\n]*/,
  python: /^#[^\n]*/,
  // Line comments, and block comments (/** … */ doc comments in the SDK examples).
  javascript: /^(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/,
  go: /^(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/,
  php: /^(\/\/|#)[^\n]*|^\/\*[\s\S]*?\*\//,
};

export function highlight(code: string, lang: Lang): Token[] {
  if (lang === "text") return [{ type: "plain", text: code }];
  const keywords = new Set(KEYWORDS[lang]);
  const tokens: Token[] = [];
  const push = (type: TokenType, text: string) => {
    const last = tokens[tokens.length - 1];
    if (last && last.type === type && type === "plain") last.text += text;
    else tokens.push({ type, text });
  };

  let rest = code;
  while (rest.length) {
    const comment = COMMENT[lang]?.exec(rest);
    // A `#` only starts a comment at the start of a line or after a space (not in "a#b").
    const prev = tokens.length ? tokens[tokens.length - 1].text.slice(-1) : "\n";
    if (comment && (rest[0] !== "#" || /\s/.test(prev))) {
      push("comment", comment[0]);
      rest = rest.slice(comment[0].length);
      continue;
    }
    const string = /^("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)/.exec(rest);
    if (string) {
      // A JSON key is a string followed by a colon.
      const isKey = lang === "json" && /^\s*:/.test(rest.slice(string[0].length));
      push(isKey ? "key" : "string", string[0]);
      rest = rest.slice(string[0].length);
      continue;
    }
    const variable = (lang === "php" || lang === "bash") && /^\$[A-Za-z_]\w*/.exec(rest);
    if (variable) {
      push("variable", variable[0]);
      rest = rest.slice(variable[0].length);
      continue;
    }
    const number = /^-?\d[\d_]*(\.\d+)?/.exec(rest);
    if (number && !/[\w.]/.test(prev)) {
      push("number", number[0]);
      rest = rest.slice(number[0].length);
      continue;
    }
    const word = /^[A-Za-z_][\w-]*/.exec(rest);
    if (word) {
      push(keywords.has(word[0]) ? "keyword" : "plain", word[0]);
      rest = rest.slice(word[0].length);
      continue;
    }
    push("plain", rest[0]);
    rest = rest.slice(1);
  }
  return tokens;
}
