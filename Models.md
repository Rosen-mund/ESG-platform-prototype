# MODEL.md

## Overview

The platform was designed as a multi-tenant ESG data ingestion and review system capable of handling heterogeneous sustainability datasets from multiple source types. The system ingests uploaded files, preserves the original source payloads, normalizes emissions-related information into a consistent analytical model, and provides a review workflow for suspicious records before they become audit-ready.

The primary architectural goal was to separate raw ingestion data from normalized analytical records while maintaining complete traceability between the two layers. This allows analysts to review anomalies, trace normalized values back to their original uploaded payloads, and maintain an audit-oriented workflow across organizations.

The application currently supports ingestion flows for:
- SAP-style procurement datasets
- Utility consumption datasets
- Travel emissions datasets

The system was implemented using:
- Django REST Framework for backend APIs
- PostgreSQL for persistence
- React for the review dashboard and analyst workflows
- Organization-scoped multi-tenancy within a shared database model

## Functional Requirements

The platform was designed to satisfy the following functional requirements:

1. Support ingestion of ESG-related datasets from multiple source types.
2. Allow organizations to upload sustainability datasets independently within a shared multi-tenant system.
3. Preserve original uploaded payloads before normalization.
4. Normalize heterogeneous source data into a consistent emissions-oriented model.
5. Categorize records into Scope 1, Scope 2, or Scope 3 emissions classifications.
6. Detect potentially suspicious or anomalous records during ingestion.
7. Allow analysts to review suspicious records and approve or reject them.
8. Maintain traceability between normalized records and original uploaded source rows.
9. Provide dashboard analytics scoped to individual organizations.
10. Maintain approval metadata and review timestamps for audit-oriented workflows.

## Non-Functional Requirements

The prototype was designed with the following non-functional requirements in mind:

### 1. Auditability
All normalized records should remain traceable to their original uploaded source payloads.

### 2. Extensibility
The ingestion pipeline should support onboarding additional ESG source types without requiring major architectural changes.

### 3. Multi-Tenant Isolation
Organizations should operate independently within the shared database model without cross-organization data exposure.

### 4. Reviewability
Analysts should be able to inspect suspicious records, review raw source payloads, and approve or reject records through the dashboard.

### 5. Deployment Simplicity
The platform should be deployable using low-cost or free-tier infrastructure suitable for rapid prototyping.

### 6. Maintainability
The backend architecture should separate ingestion, normalization, analytics, and review workflows into distinct layers to simplify debugging and future iteration.

The following concerns were intentionally considered out of scope for the prototype implementation:

- Role-based access control and enterprise authentication
- Large-scale asynchronous ingestion pipelines
- High-volume distributed processing
- Advanced anomaly detection or ML-based validation
- Immutable audit snapshots
- Fine-grained permissions and compliance workflows
- Real-time streaming ingestion
- Automated unit conversion standards across all ESG frameworks
- Horizontal scaling and performance optimization

## Core Design Goals

The data model and ingestion pipeline were designed around five primary goals:

### 1. Preserve Original Source Data
Uploaded datasets should remain traceable to their original source payloads. Instead of directly transforming uploaded rows into analytical records, the system stores raw uploaded data separately before normalization.This preserved source-of-truth information and allows future reprocessing or debugging if normalization logic changes.

### 2. Support Multi-Tenant Isolation

Organizations act as tenant boundaries within the platform. All uploads, records, analytics, and review workflows are scoped to a specific organization to prevent cross-tenant data mixing. The implementation uses a shared PostgreSQL database with organization-level ownership across records.

### 3. Normalize Heterogeneous ESG Inputs
Different ESG sources contain inconsistent schemas, naming conventions, and measurement units. The normalization layer converts these heterogeneous inputs into a unified emissions-oriented representation for downstream analytics and review workflows.

### 4. Maintain Auditability
The system was designed with audit-oriented workflows in mind. Normalized records preserve links to their raw source rows, include approval metadata, and support analyst review states such as pending, approved, and rejected.This ensured that every reviewed record remains explainable and traceable.

### 5. Enable Analyst Review Workflows
Potential anomalies or suspicious records should be reviewable before being considered finalized. The dashboard therefore should included a lightweight approval workflow that allows analysts to inspect suspicious records, review raw source payloads, and approve or reject records.


## Multi-Tenancy Model

- The platform uses an organization-scoped multi-tenant architecture within a shared PostgreSQL database. Each organization acts as an isolated tenant boundary, and all uploads, raw records, normalized records, analytics, and review workflows are associated with a specific organization.
- Rather than creating separate databases per tenant, the system uses organization ownership relationships across models to maintain logical isolation while keeping deployment and querying simpler for a prototype-scale system.
- The frontend persists the currently selected organization context, allowing dashboard analytics, uploads, and suspicious record reviews to remain scoped to the active tenant throughout the application workflow.

## Data Ingestion Architecture

The ingestion pipeline was designed using a layered architecture:

```text
Upload → RawRecord → NormalizedEmissionRecord
```

Uploaded ESG datasets are first stored as raw records without modification. This preserves the original source payloads and acts as the system’s source-of-truth layer.
A separate normalization step then transforms heterogeneous source rows into a consistent emissions-oriented model used for analytics, suspicious record detection, and review workflows.

This separation between raw ingestion data and normalized analytical records was intentionally chosen to improve:
- traceability
- auditability
- debugging
- future reprocessing of ingestion logic

The current prototype supports ingestion flows for:
- SAP procurement datasets
- Utility consumption datasets
- Travel emissions datasets

## Source-of-Truth Tracking

Each normalized emissions record maintains a direct reference to its originating raw uploaded record. The system preserves:
- source type
- original uploaded payload
- ingestion timestamps
- review status
- analyst approval metadata

Raw uploaded data is stored separately and remains unmodified. 

This design ensured that every analytical record in the system can be traced back to:
- which source produced it
- when it was ingested
- whether it was reviewed
- who approved or rejected it

The source-of-truth model was intentionally separated from the normalized analytics layer to improve auditability and simplify debugging or future reprocessing workflows.

## Scope 1 / 2 / 3 Categorization

The normalization layer assigns emissions records to ESG reporting scopes based on source type and activity category.

The current prototype supports:
- Scope 1 emissions for directly generated operational activities
- Scope 2 emissions for utility consumption datasets
- Scope 3 emissions for procurement and travel datasets

Scope categorization is stored directly on normalized records so that dashboard analytics, summaries, and suspicious record reviews can operate on a consistent emissions model.

The categorization logic is intentionally lightweight and rule-based for the prototype implementation while remaining extensible for more advanced ESG classification workflows in future iterations.

## Unit Normalization Strategy

Different ESG source systems use inconsistent measurement formats, naming conventions, and units. To avoid coupling dashboard analytics directly to source-specific formats, the platform introduces a normalization layer before records enter the analytical workflow.

The current prototype stores:
- normalized quantities
- normalized units
- activity categories
- emissions scope classifications

This normalization step was separated from raw ingestion storage so that:
- original uploaded payloads remain preserved
- analytical records maintain a consistent structure
- normalized data can be queried consistently across multiple ESG source types

The architecture also allows future unit conversion rules and ESG-specific mappings to be introduced without restructuring the ingestion pipeline.

## Audit Trail Design

The platform was designed to support review-oriented and audit-friendly workflows for normalized ESG records.

Each normalized record stores:
- review status
- suspicious record indicators
- analyst approval metadata
- approval timestamps
- source traceability references

This audit metadata is maintained directly on normalized records so that analysts can review, approve, or reject suspicious entries while preserving visibility into the original uploaded source data.

By linking normalized records back to their originating raw records, the system ensures that analytical values remain explainable and traceable throughout the review workflow.

## Suspicious Record Workflow

The platform includes an analyst review workflow for potentially anomalous ESG records. During normalization, records can be flagged as suspicious using rule-based validation checks and are surfaced separately within the dashboard.

Analysts can:
- inspect normalized values
- review original source payloads
- approve records
- reject records

Review status, approval metadata, and timestamps are stored directly on normalized records so that review actions remain traceable throughout the audit workflow.

This workflow was introduced because ESG datasets from heterogeneous external systems often require manual verification before records can be considered audit-ready. Separating suspicious records into a dedicated review layer also improves operational visibility and prevents potentially invalid data from blending directly into analytical summaries.

## Entity Relationships and Model Responsibilities

The platform uses a layered data model where organizations, uploads, raw ingestion records, and normalized analytical records are separated into distinct responsibilities.

### Organization

The `Organization` model acts as the tenant boundary for the platform. All uploads, dashboard analytics, suspicious records, and review workflows are scoped to an organization.

This structure was chosen to support multi-tenant isolation while keeping the deployment architecture simple through a shared PostgreSQL database.

### DataSourceUpload

The `DataSourceUpload` model represents a single uploaded ESG dataset and stores upload-level metadata such as source type, uploaded file information, timestamps, and uploader details.

This separation allows upload metadata to remain independent from row-level ingestion records.

### RawRecord

The `RawRecord` model stores uploaded source rows in their original unmodified form.

This layer exists to preserve source-of-truth data, improve traceability, and ensure that normalized analytical records can always be traced back to their original uploaded payloads.

### NormalizedEmissionRecord

The `NormalizedEmissionRecord` model represents the standardized analytical layer used by dashboards, suspicious record detection, and review workflows.

It stores:
- normalized quantities
- units
- scope categorization
- suspicious flags
- review status
- approval metadata

This separation between raw ingestion records and normalized analytical records was introduced to maintain a consistent analytical structure across heterogeneous ESG source systems.

## Why This Model Structure

The platform uses a layered ingestion and normalization architecture to separate raw source data from analytical ESG records.

Raw uploaded payloads are preserved independently from normalized records so that:
- source traceability remains intact
- ingestion issues can be debugged more easily
- analytical workflows remain consistent across heterogeneous source systems
- suspicious records can be reviewed against their original uploaded values

Normalized analytical records were intentionally separated into their own model because dashboard analytics, scope categorization, suspicious record detection, and approval workflows require a consistent emissions-oriented structure independent of the original source format.

Organization-scoped ownership across all ingestion and analytical models was introduced to support multi-tenant isolation while keeping the deployment architecture relatively simple for a prototype-scale system.

The overall structure was designed to prioritize:
- traceability
- auditability
- reviewability
- extensibility of future ESG ingestion workflows