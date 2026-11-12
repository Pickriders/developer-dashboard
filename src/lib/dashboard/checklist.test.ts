import { checklist } from "./checklist";
import type { DeveloperAccountDto, DeveloperOnboardingDto } from "@/services/apiService";

const account = (over: Partial<DeveloperAccountDto> = {}): DeveloperAccountDto => ({
  id: "t1",
  name: "Acme",
  companyName: null,
  website: null,
  supportEmail: null,
  supportPhone: null,
  useCase: null,
  expectedMonthlyVolume: null,
  emailVerified: false,
  phoneVerified: false,
  canRequestLive: false,
  liveStatus: "NOT_REQUESTED",
  liveRequestedAt: null,
  liveReviewedAt: null,
  liveRejectionReason: null,
  liveSuspensionReason: null,
  ...over,
});
const progress = (over: Partial<DeveloperOnboardingDto> = {}): DeveloperOnboardingDto => ({
  testKeyCreated: false,
  testOrderCreated: false,
  webhookEndpointAdded: false,
  ...over,
});
const states = (c: ReturnType<typeof checklist>) =>
  Object.fromEntries(c.groups.flatMap((g) => g.steps).map((s) => [s.id, s.state]));

describe("checklist", () => {
  it("starts at verifying the email, with nothing done", () => {
    const c = checklist(account(), progress());

    expect(c.next?.id).toBe("verify_email");
    expect(c).toEqual(expect.objectContaining({ done: 0, total: 7 }));
    expect(c.groups.map((g) => g.title)).toEqual(["Verify your account", "Build in test mode", "Go live"]);
  });

  it("ticks steps from the API's state and points at the first one left", () => {
    const c = checklist(account({ emailVerified: true, phoneVerified: true }), progress({ testKeyCreated: true }));

    expect(c.next?.id).toBe("test_order");
    expect(c.done).toBe(3);
  });

  it("points back at a step skipped earlier", () => {
    const c = checklist(
      account({ emailVerified: true, phoneVerified: false, liveStatus: "PENDING" }),
      progress({ testKeyCreated: true, testOrderCreated: true, webhookEndpointAdded: true }),
    );

    expect(c.next?.id).toBe("verify_phone");
  });

  it.each([
    ["PENDING", "done", "waiting"],
    ["REJECTED", "done", "blocked"],
    ["SUSPENDED", "done", "blocked"],
    ["APPROVED", "done", "done"],
    ["NOT_REQUESTED", "todo", "todo"],
  ] as const)("live access %s: request %s, approval %s", (liveStatus, request, approval) => {
    expect(states(checklist(account({ liveStatus }), progress()))).toEqual(
      expect.objectContaining({ request_live: request, approval }),
    );
  });

  it("puts a refusal first, ahead of steps not done yet", () => {
    const c = checklist(account({ emailVerified: true, phoneVerified: true, liveStatus: "REJECTED" }), progress());

    expect(c.next).toEqual({ id: "approval", state: "blocked" });
  });

  it("has nothing next once everything is done", () => {
    const c = checklist(
      account({ emailVerified: true, phoneVerified: true, liveStatus: "APPROVED" }),
      progress({ testKeyCreated: true, testOrderCreated: true, webhookEndpointAdded: true }),
    );

    expect(c.next).toBeNull();
    expect(c.done).toBe(7);
  });

  it("stops at the approval step while it is in review", () => {
    const c = checklist(
      account({ emailVerified: true, phoneVerified: true, liveStatus: "PENDING" }),
      progress({ testKeyCreated: true, testOrderCreated: true, webhookEndpointAdded: true }),
    );

    expect(c.next).toEqual({ id: "approval", state: "waiting" });
  });
});
