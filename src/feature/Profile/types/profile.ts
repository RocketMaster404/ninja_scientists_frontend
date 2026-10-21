// Speglar MyProfileSummaryDto i backend
export interface MyProfileSummary {
  id: number;
  title: string;
  startTime: string;       // ISO-text utan tidszon, t.ex. "2026-10-30T20:00:00"
  endTime: string | null;  // null när meetupen saknar sluttid
  location: string;
  city: string;
  host: string;
  category: string;
  hasReviewed: boolean;
}

// Speglar MyProfileOverviewDto: svaret från GET /api/me/meetups
export interface MyProfileOverview {
  upcoming: MyProfileSummary[];
  past: MyProfileSummary[];
}