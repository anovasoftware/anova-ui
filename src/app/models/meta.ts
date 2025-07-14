export interface Meta {
  version?: string;
  databaseKey?: string;
  parameters?: { [key: string]: any };
  [key: string]: any;
}
