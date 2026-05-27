# DECISIONS.md

## Overview

The assignment intentionally left several implementation details ambiguous, particularly around ESG source formats, normalization rules, suspicious record handling, audit workflows, and multi-tenant behavior.

The following sections document the major architectural and product decisions made during implementation, why those decisions were chosen for the prototype, and what additional clarification would have been requested from a product or domain stakeholder in a production environment.

## Multi-Tenancy Decisions

### Ambiguity

The assignment required multi-tenancy support but did not specify whether tenants should be isolated through separate databases, schemas, or logical ownership within a shared database.

### Decision

The prototype uses organization-scoped ownership within a shared PostgreSQL database.

All uploads, raw records, normalized records, dashboard analytics, and review workflows are associated with an `Organization`.

### Why

This approach helped keeping the deployment architecture simpler while still maintaining logical tenant isolation throughout the ingestion and analytics workflows.

For a prototype-scale system, organization-scoped filtering provided sufficient separation without introducing the operational complexity of multi-database tenancy management.

### Questions for PM

- What level of tenant isolation is expected in production?
- Are enterprise customers expected to require dedicated databases or regional data isolation?
- Will organizations eventually require role-based access control within tenants?


## Ingestion Pipeline Decisions

### Ambiguity

The assignment required ingestion and normalization of multiple ESG source types but did not specify how raw uploaded data should be preserved, transformed, or linked to downstream analytical records.

### Decision

The ingestion pipeline was separated into three layers:

```text
Upload → RawRecord → NormalizedEmissionRecord
```

Uploaded datasets are first stored as raw records before being transformed into normalized analytical records.

### Why

This structure preserves the original uploaded payloads while allowing the analytical layer to maintain a consistent schema across heterogeneous ESG source systems.

Separating raw ingestion records from normalized records also improves:
- traceability
- debugging
- suspicious record review workflows
- future reprocessing of normalization logic

The normalized layer was intentionally designed independently from the uploaded source format so that dashboard analytics and approval workflows could operate consistently across all supported source types.

### Questions for PM

- Should normalization rules be versioned over time?
- Should uploaded raw payloads be immutable after ingestion?
- Is reprocessing historical uploads expected when normalization logic changes?
- Should ingestion eventually support asynchronous processing for large datasets?

## Source Handling Decisions

### Ambiguity

The assignment required support for three ESG source types but did not define the exact real-world schemas, required fields, or ingestion depth expected for each source.

### Decision

The prototype supports simplified ingestion flows for:
- SAP-style procurement datasets
- Utility consumption datasets
- Travel emissions datasets

Only a focused subset of fields required for emissions normalization, scope categorization, dashboard analytics, and suspicious record review workflows was implemented.

### Why

Real-world ESG datasets are highly heterogeneous and often contain large amounts of operational metadata unrelated to emissions analysis.

The prototype therefore prioritizes:
- ingestion consistency
- normalization stability
- traceability
- review workflows

instead of attempting full enterprise ERP or sustainability platform coverage.

The ingestion layer was designed to preserve raw uploaded payloads so that additional mappings and normalization rules can be introduced later without redesigning the pipeline.

### Questions for PM

- Which ESG reporting frameworks are expected to be supported?
- Which source fields are considered mandatory for production workflows?
- Should ingestion support configurable source mappings per customer?
- Are uploaded files expected to follow strict templates or partially inconsistent schemas?

## Scope Classification Decisions

### Ambiguity

The assignment required Scope 1, Scope 2, and Scope 3 categorization but did not specify the exact emissions mapping rules, emission factors, or ESG classification standards expected for the prototype.

### Decision

The prototype uses lightweight rule-based scope categorization during normalization based on source type and activity category.

The current implementation supports:
- Scope 1 classifications for directly generated operational activities
- Scope 2 classifications for utility consumption datasets
- Scope 3 classifications for procurement and travel datasets

Scope information is stored directly on normalized records and used throughout dashboard analytics and suspicious record review workflows.

### Why

The goal of the prototype was to establish a consistent analytical workflow across heterogeneous ESG sources rather than implement a complete enterprise emissions accounting framework.

A rule-based categorization layer provided:
- predictable normalization behavior
- simpler analytical aggregation
- easier review workflows
- clearer auditability during ingestion

The categorization logic was intentionally kept modular so that additional ESG mappings and reporting standards can be introduced later without restructuring the ingestion pipeline.

### Questions for PM

- Which ESG reporting frameworks should act as the source of truth for scope classification?
- Should emission factors be configurable per organization or region?
- Are customers expected to customize categorization logic for internal reporting requirements?
- How should mixed-activity datasets with overlapping scope classifications be handled?

## Suspicious Record Detection Decisions

### Ambiguity

The assignment required visibility into suspicious or potentially invalid records but did not define what should qualify as suspicious, how anomaly detection should work, or whether the workflow should be automated or analyst-driven.

### Decision

The prototype uses lightweight rule-based validation checks during normalization to flag potentially suspicious records.

Flagged records are surfaced separately within the dashboard where analysts can:
- inspect normalized values
- review original source payloads
- approve records
- reject records

Review status and approval metadata are stored directly on normalized records.

### Why

Real-world ESG ingestion workflows often involve incomplete, inconsistent, or operationally unusual source data that requires manual verification before downstream reporting.

A lightweight rule-based approach was chosen because it provides:
- explainable anomaly detection behavior
- simpler auditability
- easier debugging
- predictable review workflows

The analyst review layer was intentionally separated from the ingestion layer so that suspicious records could be reviewed independently without blocking the entire ingestion pipeline.

### Questions for PM

- What business rules should define suspicious ESG records in production?
- Should anomaly thresholds vary by organization or source type?
- Are false positives acceptable if review visibility improves?
- Should suspicious record detection eventually include statistical or ML-based anomaly detection?


## Approval Workflow Decisions

### Ambiguity

The assignment required analyst approval before records become audit-ready but did not specify how approval states, reviewer attribution, or record locking behavior should be implemented.

### Decision

The prototype implements a lightweight analyst review workflow directly on normalized records using:
- review status fields
- analyst attribution
- approval timestamps
- suspicious record indicators

Analysts can approve or reject suspicious records through the dashboard after reviewing both normalized values and the original uploaded source payload.

### Why

The approval workflow was introduced to simulate real-world ESG validation processes where sustainability data often requires operational review before downstream reporting or auditing.

Storing approval metadata directly on normalized records simplified:
- review state management
- audit traceability
- dashboard integration
- suspicious record workflows

The workflow was intentionally designed as a lightweight review layer integrated into the ingestion pipeline rather than a separate enterprise approval engine.

### Questions for PM

- Should approved records become immutable after review?
- Are multiple approval stages required for enterprise workflows?
- Should different reviewer roles have different permissions?
- Is historical approval versioning required for audit compliance?

## Frontend and UX Decisions

### Ambiguity

The assignment focused primarily on ingestion and review workflows but did not define how analysts should navigate organizations, review records, or manage first-time onboarding flows within the dashboard.

### Decision

The frontend was designed as an organization-scoped dashboard application where uploads, analytics, and suspicious record workflows remain tied to the currently selected organization.

The interface includes:
- persistent organization selection
- organization switching from the top navigation
- onboarding empty states
- suspicious record review modals
- collapsible dashboard navigation
- organization-aware uploads and analytics

The frontend also persists the selected organization context locally so that users can continue workflows across page reloads.

### Why

The dashboard was designed to prioritize operational visibility and reduce friction between ingestion, analytics, and review workflows.

Organization-scoped navigation simplified:
- multi-tenant workflow management
- dashboard filtering
- upload targeting
- suspicious record review consistency

Persistent organization context and onboarding flows were introduced to improve usability during repeated analyst workflows and first-time platform usage.

### Questions for PM

- Should analysts be able to review multiple organizations simultaneously?
- Is role-based dashboard access required?
- Should onboarding workflows differ for administrators versus analysts?
- Are real-time ingestion updates or notifications expected in production?