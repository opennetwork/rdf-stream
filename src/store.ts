import { Quad, TermLike } from "@opennetwork/rdf-data-model";
import { Stream } from "./stream";
import { QuadFind } from "@opennetwork/rdf-dataset";
import { Source } from "./source";
import { Sink } from "./sink";

export interface Store extends Stream<Quad>, Source, Sink {

  remove(stream: AsyncIterable<QuadFind> | Iterable<QuadFind>): Promise<void>;
  removeMatches(subject?: TermLike, predicate?: TermLike, object?: TermLike, graph?: TermLike): Promise<void>;
  deleteGraph(graph: TermLike | string): Promise<void>;

}
