interface ISessionIntervals {
  WORK: number,
  LONG: number,
  SHORT: number,
}

export const sessionIntervals: ISessionIntervals = {
  WORK: 25,
  LONG: 15,
  SHORT: 5
}

interface ISessionTypes {
  WORK: string,
  LONG: string,
  SHORT: string
}

export const sessionTypes: ISessionTypes = {
  WORK: "Work Session",
  LONG: "Long Break",
  SHORT: "Short Break"
};

export const INTERVAL_DELAY = 1;

export const MAX_WORK_INTERVAL_COUNT = 4;