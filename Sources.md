# SOURCES.md

## Overview

The prototype supports three ESG-related source categories:
- SAP-style procurement datasets
- Utility consumption datasets
- Travel emissions datasets

Because real-world ESG ingestion systems vary significantly across organizations and reporting standards, the prototype is built mainly focusing on a simplified but structurally representative subset of fields required for normalization, scope categorization, suspicious record review, and dashboard analytics.

## SAP Procurement Dataset

### Real-World Format Researched

The procurement ingestion flow was inspired by ERP-style procurement exports commonly generated from SAP systems. Real-world procurement datasets often contain:
- vendor information
- purchase categories
- invoice metadata
- transaction quantities
- currencies
- operational cost centers
- material classifications

These exports are typically delivered as CSV or spreadsheet-based reporting extracts.

### What Was Learned

Real procurement datasets contain large amounts of operational metadata that may not directly contribute to emissions analysis. Mapping procurement activity into ESG categories often requires organization-specific interpretation and external emissions factor mappings.

The ingestion layer therefore focused on preserving source traceability while normalizing a smaller analytical subset of fields.

### Sample Data Structure Used

The prototype sample datasets primarily focused on:
- vendor name
- procurement category
- quantity
- unit
- transaction amount
- activity description

These fields were chosen because they were sufficient to support:
- Scope 3 categorization
- normalization workflows
- suspicious record review
- dashboard aggregation
  
### File Format Choice

SAP-style procurement datasets were modeled as CSV files because ERP procurement exports are commonly distributed as tabular spreadsheet or CSV-based reporting extracts.

CSV ingestion also simplified:
- row-based normalization
- transactional parsing
- bulk upload workflows
- analytical aggregation

The structure aligned naturally with procurement-style tabular records containing vendors, quantities, categories, and transaction metadata.

### What Would Break in Real Deployments

A production-scale procurement ingestion system would likely encounter:
- inconsistent ERP export schemas
- missing supplier metadata
- organization-specific procurement taxonomies
- inconsistent units and currencies
- duplicate transactional records
- evolving ERP export formats across business units

## Utility Consumption Dataset

### Real-World Format Researched

The utility ingestion flow was based on electricity and energy consumption reports commonly exported from utility providers or sustainability reporting systems.

Typical utility datasets contain:
- meter identifiers
- billing periods
- energy consumption values
- facility information
- usage units
- provider metadata

### What Was Learned

Utility reporting formats vary significantly between providers and regions. Even relatively simple energy datasets often contain inconsistent billing periods, unit representations, and facility naming conventions.

The ingestion workflow therefore focused on preserving raw uploaded records while normalizing a simplified analytical structure for dashboard reporting and Scope 2 categorization.

### Sample Data Structure Used

The prototype datasets primarily focused on:
- facility name
- reporting period
- consumption quantity
- unit
- energy source type

These fields were sufficient to support:
- Scope 2 classification
- normalized analytical reporting
- suspicious record detection
- organization-level dashboard aggregation

### File Format Choice

Utility consumption datasets were modeled as CSV files because energy usage reports are commonly exported as tabular billing or meter-consumption reports.

CSV-based ingestion simplified:
- periodic consumption parsing
- facility-level aggregation
- unit normalization
- dashboard analytics workflows

The tabular structure aligned well with recurring utility reporting patterns such as monthly consumption records and billing periods.

### What Would Break in Real Deployments

A production-scale utility ingestion workflow would likely require handling:
- regional unit conversion differences
- incomplete billing periods
- multiple energy providers
- facility hierarchy mapping
- renewable energy adjustments
- inconsistent meter-level reporting structures

## Travel Emissions Dataset

### Real-World Format Researched

The travel ingestion workflow was inspired by corporate travel reporting exports commonly generated from travel management systems and expense platforms.

Typical travel datasets contain:
- employee travel details
- transportation mode
- trip distance
- departure and destination information
- booking metadata
- expense information

### What Was Learned

Travel emissions reporting often depends heavily on derived calculations rather than directly reported emissions values. Real-world travel datasets also contain inconsistent location formats, duplicate expense records, and varying transportation classifications.

The prototype therefore focused on a simplified ingestion structure centered around activity normalization and Scope 3 categorization.

### Sample Data Structure Used

The prototype datasets primarily focused on:
- travel type
- distance
- unit
- destination
- trip description

These fields were sufficient to support:
- Scope 3 categorization
- normalized emissions workflows
- suspicious record review
- dashboard analytics

### File Format Choice

Travel emissions datasets were modeled using JSON because travel-related activity data is often more hierarchical and event-oriented than utility or procurement reporting.

JSON structures provided greater flexibility for representing:
- trip metadata
- travel segments
- destinations
- transportation types
- nested travel activity details

Using JSON also helped simulate ingestion workflows where travel data may originate from APIs or external travel management systems instead of flat reporting exports.

### What Would Break in Real Deployments

A production-scale travel ingestion system would likely require handling:
- inconsistent airport and location naming
- duplicate reimbursement entries
- international unit conversions
- multi-leg trip aggregation
- transportation-specific emissions calculations
- integrations with external travel management systems
