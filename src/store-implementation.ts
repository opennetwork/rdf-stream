import { Store } from "./store";
import { QuadFind } from "@opennetwork/rdf-dataset";
import { QuadLike, TermLike, DataFactory } from "@opennetwork/rdf-data-model";
import { asyncIterable, asyncIterator, isAsyncIterable } from "./async-iterator";
import { Dataset, DatasetFactory } from "@opennetwork/rdf-dataset";

export class StoreImplementation implements Store {

  private dataFactory: DataFactory;
  private baseIRI?: string;
  private dataset: Dataset = DatasetFactory.dataset();

  constructor(dataFactory: DataFactory, baseIRI?: string) {
    this.dataFactory = dataFactory;
    this.baseIRI = baseIRI;
  }

  remove = async (stream: AsyncIterable<QuadFind> | Iterable<QuadFind>) => {
    for await (const item of asyncIterable(stream)) {
      this.dataset.delete(item);
    }
  };

  removeMatches = async (subject?: TermLike, predicate?: TermLike, object?: TermLike, graph?: TermLike) => {
    this.dataset.deleteMatches(subject, predicate, object, graph);
  };

  deleteGraph = async (graph: TermLike | string) => {
    await this.dataset.delete({
      graph: (
        typeof graph === "string" ? this.dataFactory.namedNode(graph) : graph
      )
    });
  };

  match = (subject?: TermLike, predicate?: TermLike, object?: TermLike, graph?: TermLike) => {
    // TODO investigate swapping dataset so it lazy loads iterables so we can do this a bit better
    return asyncIterable(this.dataset.match(subject, predicate, object, graph));
  };

  import = async (stream: AsyncIterable<QuadLike> | Iterable<QuadLike>) => {
    // Early return so we can just hit addAll directly
    if (!isAsyncIterable(stream)) {
      this.dataset.addAll(stream);
      return this;
    }
    for await (const item of asyncIterable(stream)) {
      this.dataset.add(item);
    }
    return this;
  };

  [Symbol.asyncIterator] = () => asyncIterator(this.dataset);

}
