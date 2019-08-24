# RDF Stream

Loose in memory implementation of [https://rdf.js.org/stream-spec/](https://rdf.js.org/stream-spec/)

Primary differences:

- No internal use of `EventEmitter`, in favour of `AsyncIterable` & `Promise`
- Allows import of `QuadLike` which means we can pass direct JSON objects to it
- Allows import of `Iterable` as well as `AsyncIterable`
- Allows import from `ReadableStream` as it is an `AsyncIterable`
