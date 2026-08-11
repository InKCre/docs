# Operational Realities

- runtime reality: multiple runtimes can operate around the same info-base.
- runtime reality: a block may carry inline content or an opaque pointer to actual bytes stored elsewhere.
- existing system limitation: storage-backed content access may be deferred, so consumers need one hydration contract rather than interpreting block pointers directly.
- runtime reality: collection may be a tracked pull run, an event-driven record, or an extension-owned protocol request; only run-oriented collection requires a Job lifecycle.
- product boundary: an InKCre deployment is one owner context. Runtime clients are peer nodes, while users or accounts named by an external protocol remain protocol-bound projections rather than InKCre tenants.
