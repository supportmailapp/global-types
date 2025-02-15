export enum NotificationLevel {
  /**
   * ... nothing
   */
  None = 0,
  /**
   * "Your report has been accepted."
   */
  Anonym = 1,
  /**
   * "Your report has been accepted." + [Report Details]
   */
  OnlyReport = 2,
  /**
   * "Your report has been accepted." + [Action Details]
   */
  OnlyAction = 3,
  /**
   * "Your report has been accepted." + [Report Details] + [Action Details]
   */
  Full = 4,
}

export enum BlacklistModule {
  global = 0,
  all = 1,
  tickets = 2,
  reports = 3,
  tags = 4,
}

export enum BlacklistEntryType {
  role = 0,
  user = 1,
  guild = 2,
}

export enum LogModule {
  Ticket = "ticket",
  Report = "report",
  Blacklist = "blacklist",
}

export enum LogTypes {
  // TicketLogType
  createTicket = 1001,
  closeTicket = 1002,
  deleteTicket = 1003,
  reopenTicket = 1004,
  closeRequested = 1005,
  closeAccepted = 1006,
  closeDenied = 1007,
  closeRequestDeleted = 1008,
  ticketPingsUpdated = 1009,
  messageForwardingToggled = 1010,
  ticketAnonymityUpdated = 1011,
  allowedTicketBotsUpdated = 1012,
  ticketUserFeedbackUpdated = 1013,
  pausedTickets = 1014,
  resumedTickets = 1015,

  // ReportLogType
  createReport = 2001,
  updateReport = 2002,
  deleteReport = 2003,
  reportsChannelUpdated = 2004,
  reportPingsUpdated = 2005,
  reportImmunityUpdated = 2006,
  modRolesUpdated = 2007,
  reportingChannelsUpdated = 2008,
  reportButtonsToggled = 2009,
  pausedReports = 2010,
  resumedReports = 2011,

  // BlacklistLogType
  addToBlacklist = 3001, // Someone was added to a blacklist
  removeFromBlacklist = 3002, // Someone was removed from a blacklist
  clearBlacklist = 3003, // When blacklist is cleared
  blacklistImmunityUpdated = 3004, // When immunity is updated
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
