import {useCallback, useMemo, useState} from "react";

export interface TrackerHelper {
  onStart: () => void;
  onEnd: () => void;
  startDate?: Date;
}

export function useTrackerHelper(save: (obj: any) => void): TrackerHelper  {
  const [startDate, setStartDate] = useState<Date>();

  const onStart = useCallback(() => {
    setStartDate(new Date());
  }, []);

  const onEnd = useCallback(() => {
    const endDate = new Date();
    save({startDate, endDate});
    setStartDate(undefined);
  }, [startDate, save]);

  return useMemo(() => ({
    onStart, onEnd, startDate,
  }), [onStart, onEnd, startDate]);
}