import { Store } from "./store";
import { StoreImplementation } from "./store-implementation";
import { DataFactory, DefaultDataFactory } from "@opennetwork/rdf-data-model";

export * from "./sink";
export * from "./source";
export * from "./store";
export * from "./stream";

export function createStore(dataFactory?: DataFactory, baseIRI?: string): Store {
  return new StoreImplementation(
    dataFactory || DefaultDataFactory,
    baseIRI
  );
}
