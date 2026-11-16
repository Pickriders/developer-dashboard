import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { AccountNotice, standingNotice } from "./account-notice";

let account: Record<string, unknown> | undefined;
let allowed = true;
jest.mock("@/lib/dashboard/hooks", () => ({ useAccount: () => ({ data: account }) }));
jest.mock("@/lib/workspace", () => ({ useWorkspace: () => ({ team: { id: "t1" }, can: () => allowed }) }));
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const base = {
  status: "ACTIVE",
  suspensionReason: null,
  liveStatus: "NOT_REQUESTED",
  liveRejectionReason: null,
  liveSuspensionReason: null,
  canRequestLive: true,
} as const;

describe("standingNotice", () => {
  it("says nothing for a team in good standing", () => {
    expect(standingNotice(base, true)).toBeNull();
    expect(standingNotice({ ...base, liveStatus: "APPROVED" }, true)).toBeNull();
    expect(standingNotice({ ...base, liveStatus: "PENDING" }, true)).toBeNull();
  });

  it("puts a team suspension first, with its reason and the error keys get", () => {
    const notice = standingNotice(
      {
        ...base,
        status: "SUSPENDED",
        suspensionReason: "Suspected fraud.",
        liveStatus: "REJECTED",
        liveRejectionReason: "Add a website.",
      },
      true,
    );
    expect(notice).toMatchObject({ kind: "team_suspended", reason: "Suspected fraud.", canAskAgain: false });
    expect(notice?.body).toContain("account_suspended");
  });

  it("shows a live suspension with its reason", () => {
    expect(
      standingNotice({ ...base, liveStatus: "SUSPENDED", liveSuspensionReason: "Chargebacks." }, true),
    ).toMatchObject({
      kind: "live_suspended",
      reason: "Chargebacks.",
      canAskAgain: false,
    });
  });

  it("offers to ask again after a rejection, only to someone who may and once the owner is verified", () => {
    const rejected = { ...base, liveStatus: "REJECTED", liveRejectionReason: "Add your website." } as const;
    expect(standingNotice(rejected, true)).toMatchObject({
      kind: "live_rejected",
      reason: "Add your website.",
      canAskAgain: true,
    });
    expect(standingNotice(rejected, false)?.canAskAgain).toBe(false);
    expect(standingNotice({ ...rejected, canRequestLive: false }, true)?.canAskAgain).toBe(false);
  });
});

describe("AccountNotice", () => {
  const render = () => renderToStaticMarkup(<AccountNotice />);

  beforeEach(() => {
    allowed = true;
  });

  it("renders nothing while the account loads or is fine", () => {
    account = undefined;
    expect(render()).toBe("");
    account = { ...base };
    expect(render()).toBe("");
  });

  it("shows a rejection in red with what to fix and a way to ask again", () => {
    account = { ...base, liveStatus: "REJECTED", liveRejectionReason: "Add your company website." };
    const html = render();
    expect(html).toContain('role="alert"');
    expect(html).toContain("Your live access request wasn&#x27;t approved");
    expect(html).toContain("Add your company website.");
    expect(html).toContain('href="/?request=live"');
  });

  it("shows a team suspension with its reason and no way to ask again", () => {
    account = { ...base, status: "SUSPENDED", suspensionReason: "Suspected fraud on live orders." };
    const html = render();
    expect(html).toContain("Your team is suspended");
    expect(html).toContain("Suspected fraud on live orders.");
    expect(html).not.toContain("<a ");
  });
});
