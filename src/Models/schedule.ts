import { Show } from "./showType";

/** One row in a schedule rail (TV or web/streaming). */
export type ScheduleRailItem = {
  showId: number;
  show: Show;
  episodeName: string;
  airtime: string;
  airdate: string;
  channelLabel: string;
};
