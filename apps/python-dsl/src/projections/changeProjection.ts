import type { Text } from "@codemirror/state";
import { arg, block, contextVariable } from "@puredit/parser";
import type { Match } from "@puredit/parser";
import { stringLiteralValue } from "@puredit/projections";
import { svelteProjection } from "@puredit/projections";
import type { Projection } from "@puredit/projections";
import ChangeProjection from "./ChangeProjection.svelte";
import type { ContextColumns, ContextTables } from "./context";
import { pythonParser } from "./parser";

const db = contextVariable("db");
const table = arg("table", ["string"]);

export const [pattern, draft] = pythonParser.statementPattern`
with ${db}.change(${table}) as table:
    ${block({ table: "table" })}
`;

export const widget = svelteProjection(ChangeProjection);

interface OuterContext {
  tables: ContextTables;
}

interface InnerContext {
  columns: ContextColumns;
}

export const changeProjection: Projection = {
  name: "change table",
  description: "Applies changes to the specified table of the database",
  pattern,
  draft,
  requiredContextVariables: ["db"],
  widgets: [widget],
  contextProvider(
    match: Match,
    text: Text,
    context: OuterContext
  ): InnerContext {
    const tableName = stringLiteralValue(match.args.table, text);
    return {
      columns: context.tables[tableName]?.columns || {},
    };
  },
};
