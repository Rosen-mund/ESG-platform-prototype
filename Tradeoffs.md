# TRADEOFFS.md

## Overview

The prototype was intentionally scoped to prioritize a stable ingestion pipeline, source traceability, analyst review workflows, and multi-tenant ESG analytics within a limited implementation window.

The following sections describe several deliberate tradeoffs made during development, why those decisions were chosen, and what additional capabilities would likely be required in a production-scale system.

## Tradeoff 1 — Lightweight Rule-Based Suspicious Detection

The prototype uses lightweight rule-based validation checks to identify suspicious ESG records instead of implementing statistical anomaly detection or machine learning workflows.

This decision was made to prioritize:
- explainability
- traceability
- deterministic review behavior
- simpler debugging during ingestion

A rule-based approach also aligned better with the prototype’s audit-oriented workflow because flagged records can be directly explained during analyst review.

A production-scale implementation would likely require:
- configurable anomaly thresholds
- historical trend analysis
- organization-specific validation rules
- statistical or ML-based anomaly detection

## Tradeoff 2 — Synchronous Ingestion Pipeline

The ingestion workflow was implemented synchronously within the API request cycle instead of using asynchronous job queues or distributed processing workers.

This simplified:
- deployment
- debugging
- ingestion traceability
- local development workflows

For prototype-scale datasets, synchronous processing provided sufficient performance while reducing infrastructure complexity.

A production-scale ESG ingestion platform would likely require:
- asynchronous processing queues
- retry mechanisms
- ingestion monitoring
- background normalization workers
- large-file streaming support

## Tradeoff 3 — Simplified ESG Mapping and Unit Conversion

The prototype implements a simplified normalization and scope categorization layer rather than a complete enterprise ESG accounting framework.

The current implementation focuses on:
- consistent analytical structure
- scope categorization
- source traceability
- review workflows

instead of supporting comprehensive emissions factor libraries or framework-specific ESG calculations.

This tradeoff allowed the system to prioritize architectural clarity and ingestion consistency across heterogeneous source systems.

A production implementation would likely require:
- standardized emissions factor databases
- regional conversion rules
- framework-specific ESG mappings
- configurable unit conversion pipelines
- organization-specific reporting logic