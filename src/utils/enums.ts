export enum ReportNotificationType {
  ActionTaken = 0,
  ReportSummary = 1,
  ModeratorInfo = 2,
}

export enum BlacklistScope {
  global = 0,
  all = 1,
  tickets = 2,
  reports = 3,
  tags = 4,
}

export enum ReportStatus {
  ignored = 0,
  open = 1,
  timeouted = 2,
  kicked = 3,
  banned = 4,
  messageDeleted = 5,
  resolved = 6, // Resolved without any further action
}

export enum TicketStatus {
  closed = 0,
  open = 1,
  closeRequested = 2,
}

export enum TicketState {
  unanswered = 1,
  pendingQR = 2,
  uResponded = 3,
  awaitingRes = 4,
}

export enum SpecialReportChannelType {
  Category = 0,
  Channel = 1,
}

export enum BillingPeriod {
  lifetime = 0,
  twoWeeks = 1,
  oneMonth = 2,
  twoMonths = 3,
  sixMonths = 4,
  oneYear = 5,
}

export enum ClientAPIErrorCodes {
  MissingPermissions = 0,
  CategoryCreateFailed = 1,
  ForumCreationFailed = 2,
  GuildNotFound = 3,
  CommunityNotEnabled = 4,
  CategoryNotFound = 5,
}

/**
 * An enum representing the type of entity.
 */
export enum EntityType {
  role = 0,
  user = 1,
  guild = 2,
}

export enum LogEventType {
  TestEvent = "testEvent",

  TicketCreated = "ticketCreate",
  TicketClosed = "ticketClose",
  TicketReopened = "ticketReopen",
  TicketDeleted = "ticketDelete",
}
