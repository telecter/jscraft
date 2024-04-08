import { serveDirWithTs } from "https://deno.land/x/ts_serve/mod.ts"

Deno.serve((req) => serveDirWithTs(req))