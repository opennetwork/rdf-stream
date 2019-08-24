import { QuadLike } from "@opennetwork/rdf-data-model";

export interface Sink {
  import(stream: AsyncIterable<QuadLike> | Iterable<QuadLike>): Promise<this>;
}
