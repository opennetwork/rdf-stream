import { Stream } from "./stream";
import { Quad, TermLike } from "@opennetwork/rdf-data-model";

export interface Source extends Stream<Quad> {
  match(subject?: TermLike, predicate?: TermLike, object?: TermLike, graph?: TermLike): Stream<Quad>;
}
