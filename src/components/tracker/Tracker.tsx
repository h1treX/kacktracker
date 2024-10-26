import {FC, useMemo} from "react";
import {Button, Card} from "antd-mobile";
import {TrackerHelper} from "./trackerHelper";

export type TrackerProps = TrackerHelper;

export const Tracker: FC<TrackerProps> = (
  {
    onStart,
    onEnd,
    startDate,
  }
) => {
  const cardTitle: string = useMemo(
    () => startDate ? "Tracker" : "Click \"Start\" to start tracking",
    [startDate],
  );

  return <Card title={cardTitle}>
    {startDate
      ? <div>
        <span>Current Session</span>
        <Timer startDate={startDate}/>
        <Button color={"danger"} onClick={onEnd}>Stop</Button>
      </div>
      : <Button color="primary" fill="solid" onClick={onStart}>Start</Button>}

  </Card>;
}

const Timer: FC<{ startDate?: Date }> = ({startDate}) => {

  return (
    <div>
      Timer
    </div>
  );
};

const formatNumber = (num: number) => num.toString().padStart(2, '0');
