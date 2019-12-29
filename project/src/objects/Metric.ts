import LevelDB from "../leveldb";
import WriteStream from "level-ws";

export class Metric {
  public timestamp: string;
  public value: number;

  constructor(ts: string, v: number) {
    this.timestamp = ts;
    this.value = v;
  }

  static fromDb(key: string, value: any) {
    const [value, timestamp] = key.split(":");
    return {
      timestamp: timestamp,
      value: value
    };
  }
}

export class MetricsHandler {
  public db: any;

  constructor(dbPath: string) {
    this.db = LevelDB.open(dbPath);
  }
}
