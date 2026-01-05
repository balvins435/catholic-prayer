
export interface Prayer {
  title: string;
  category: string;
  text: string;
}

export interface DailyReadings {
  date: string;
  feast: string;
  firstReading: {
    citation: string;
    text: string;
  };
  responsorialPsalm: {
    citation:string;
    text: string;
  };
  secondReading: {
    citation: string;
    text: string;
  } | null;
  gospel: {
    citation: string;
    text: string;
  };
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';
