# AgroSense - Stack Decision

**Ticket:** GT-001 - Stand it up: stack choice in writing, then a running app
**Status:** Proposed for review
**Date:** 12 September 2026
**Owner:** Michael Kolawole

---

## 1. What we are building

AgroSense is a farmer-facing web application designed to give smallholder farmers practical agricultural intelligence from their phones.

The initial product focuses on:

* Farmer and farm profiles
* Crop information and observations
* Crop Doctor for crop disease detection
* Weather and farm intelligence
* Market intelligence
* An AI farming assistant

The first ML experiment is **Crop Doctor**.

Crop Doctor will initially be framed as a classification problem over a defined set of crop conditions. The experiment will establish an evaluation set and baseline before any production ML model is trained.

The primary user is a smallholder farmer using a phone, potentially with unreliable or poor connectivity.

---

## 2. Chosen stack

### Application

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

### Backend and data

* **Supabase**

  * Supabase Auth for authentication
  * PostgreSQL for application data
  * Row Level Security for protecting farmer-owned data

### Development

* **Yarn** for package management
* **Git/GitHub** for version control and review

### Deployment

The application is designed to be deployed as a web application and accessed from a phone through a browser.

---

## 3. Why this stack

### Next.js

Next.js gives AgroSense a single application framework for the farmer-facing product.

It allows the project to start as a relatively simple web application while leaving room for server-side functionality as the product becomes more sophisticated.

A web-first application also means a farmer can access AgroSense from a phone without first installing a native application.

### React

The AgroSense interface contains several interactive flows:

* account creation
* onboarding
* farm and crop information
* Crop Doctor
* future intelligence features

React provides a component-based approach for these interfaces and allows the product to evolve without introducing a separate frontend framework.

### TypeScript

The application contains relationships between users, farms, crops, observations and eventually ML predictions.

TypeScript provides compile-time checks around these relationships and reduces the likelihood of silently passing incorrectly shaped data between parts of the application.

### Tailwind CSS

Tailwind allows the interface to be developed quickly while keeping the visual system consistent.

This is useful for a mobile-first product where layouts need to work across different phone sizes without introducing a large UI framework dependency.

### Supabase

Supabase provides the two backend capabilities AgroSense needs immediately:

1. Authentication
2. Persistent relational data

PostgreSQL is particularly appropriate because AgroSense has relationships between entities such as:

```text
Farmer
  ↓
Farm
  ↓
Crop
  ↓
Crop Observation
```

These relationships are important to the product and are better represented explicitly than through an unstructured document model.

Supabase Row Level Security also allows access to farmer-owned records to be enforced at the database level rather than relying only on frontend checks.

---

## 4. Why this fits farmers using phones

The initial product is deliberately web-first.

A farmer can access AgroSense through a phone browser rather than requiring an application download before using the product.

The interface is designed around:

* responsive layouts
* simple interaction flows
* limited unnecessary navigation
* small, focused forms
* readable information on mobile screens

Poor connectivity is an explicit product constraint.

The current stack does **not** claim to solve offline use in Sprint 01. Instead, the architecture keeps the initial application simple enough that offline capabilities can be considered separately rather than introducing them before the core product has been validated.

The sprint therefore does not build offline mode.

---

## 5. What this choice rules out

Choosing this stack deliberately means we are **not** building the first version as:

### A native mobile application

We are not starting with React Native or Flutter.

That would introduce a separate mobile application build and deployment path before the core product and farmer workflow have been validated.

A web application gives us a faster path to putting the product in front of a real farmer.

### A custom authentication system

We are not implementing password hashing, sessions, password recovery or authentication infrastructure ourselves.

Supabase Auth owns authentication.

This reduces custom security-sensitive code and lets the application focus on the farmer experience and agricultural product.

### A separate custom backend for the initial foundation

We are not introducing a separate Express/Node backend simply to provide CRUD endpoints for the initial product foundation.

Supabase provides the database, authentication and access-control layer needed for the current scope.

A separate backend can be introduced later if a demonstrated product requirement justifies it.

### A document-first database

We are not using an unstructured document model for the core farmer/farm/crop relationships.

The product has meaningful relational concepts, so PostgreSQL is the current choice.

### Offline-first architecture in this sprint

Offline mode is intentionally excluded from Sprint 01.

This is a future product requirement, not something being silently promised by the current web implementation.

---

## 6. Product constraints that influenced the decision

The stack decision is constrained by the actual product rather than by technology preference alone.

The initial requirements are:

1. A farmer must be able to create an account.
2. A farmer must be able to return without losing their data.
3. A farmer must be able to record their farm.
4. A farmer must be able to record crops associated with that farm.
5. The product must eventually store crop observations produced by Crop Doctor.
6. Farmer-owned information must not be exposed to another farmer.
7. The application must work from a phone browser.
8. The product must be deployable early enough for a real farmer to use it.
9. The ML experiment must be evaluable independently of the UI.

The selected stack satisfies the foundation requirements without requiring infrastructure that the current product does not yet need.

---

## 7. Data model direction

The product data model is intentionally explicit.

The current conceptual relationship is:

```text
User
 │
 └── Farm
      │
      └── Crop
           │
           └── Crop Observation
```

Crop Doctor will eventually write an observation into this chain.

An observation should be distinguishable from the farmer's underlying crop record.

This matters because:

> A farmer, a farm, a crop and an observation are different concepts.

The application should not use routing or UI state to infer these relationships.

The data model should carry the meaning.

---

## 8. Connectivity decision

AgroSense will be built as a responsive web application for Sprint 01.

We recognize that farmers may operate with unreliable connectivity.

For this sprint:

* The application must fail honestly when a required network operation cannot complete.
* It must not display fabricated or stale information as though it were newly retrieved.
* Data entered successfully must persist in the backend.
* Offline mode is not implemented.

Offline support remains future work and will require its own product and technical decision.

---

## 9. Review and challenge

This decision is intentionally being submitted for review before subsequent sprint work is considered complete.

### Challenge 1 — Product direction

During planning, the initial sprint framing drifted toward an IoT/sensor-based product.

That did not match the actual AgroSense product.

The product was explicitly re-centred around:

```text
Farmer
  ↓
Farm
  ↓
Crop
  ↓
Crop Observation
  ↓
Crop Doctor
```

Hardware and field devices are explicitly out of scope.

### Resolution

The stack decision is therefore made against the actual AgroSense product rather than the incorrect sensor interpretation.

The web-first architecture remains appropriate for the farmer-facing application.

---

### Challenge 2 — Connectivity

A web-first application does not automatically provide offline functionality.

This was treated as a product constraint rather than hidden as an implementation detail.

### Resolution

Offline mode is explicitly out of scope for Sprint 01.

The current application must instead fail safely when a network-dependent operation cannot complete.

Offline support will require a separate decision once the core product has been validated.

---

## 10. Reviewer challenge record

The formal review of this decision is expected to challenge:

* whether Next.js is appropriate for the actual farmer workflow
* whether Supabase is sufficient for the current data model
* whether the web-first choice creates unacceptable connectivity problems
* whether the proposed data relationships are appropriate for Crop Doctor
* whether anything in the chosen stack creates unnecessary future constraints

Reviewer objections and responses will be added here after the review.


A decision that receives no meaningful challenge will not be treated as a completed review.

---

## 11. Future work explicitly excluded from this decision

The following are acknowledged but **not implemented as part of GT-001**:

* Offline mode
* Payments
* Multi-language/local-language support

These remain future product work.

Their inclusion here does not mean they are supported by the current application.

---

## 12. Decision

For Sprint 01, AgroSense will use:

> **Next.js + React + TypeScript + Tailwind CSS + Supabase**

The decision prioritizes:

* rapid validation with real farmers
* a phone-accessible web experience
* explicit relational data
* managed authentication
* database-level access control
* a simple deployment path
* enough flexibility to support Crop Doctor and later intelligence features

This is the foundation for the current sprint, not a permanent commitment that prevents future architectural changes.

---

## 13. Success condition

The stack decision is successful when:

1. A fresh checkout can follow the repository instructions and run locally within 30 minutes.
2. The application serves a visible page.
3. The stack choice and tradeoffs are documented.
4. A reviewer has challenged the decision.
5. Reviewer responses are recorded.
6. Offline mode, payments and multi-language remain explicitly out of scope for Sprint 01.
7. The decision is approved before later sprint work is treated as complete.

````

### And update your `README.md`

Your README needs to make the **fresh checkout → running app** path extremely obvious.

# AgroSense AI

AgroSense AI is a farmer-focused web application designed to help smallholder farmers make better decisions using agricultural intelligence.

The first ML experiment is **Crop Doctor**, which will investigate crop disease classification using farmer-provided crop images.

## Sprint 01

**Ground Truth — Reading the Product Before Building the Intelligence**

The first sprint focuses on establishing the product foundation and defining how Crop Doctor will be evaluated before training a production model.

### Current product direction

```text
Farmer
  ↓
Farm
  ↓
Crop
  ↓
Crop Observation
  ↓
Crop Doctor
````

The application currently focuses on:

* Farmer accounts
* Farm onboarding
* Crop information
* Farmer dashboard
* Crop Doctor foundation

## Tech stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* Supabase
* PostgreSQL
* Supabase Auth
* Yarn

The reasoning behind the stack is documented in:

`docs/stack-decision.md`

## Requirements

Before running the project, make sure you have:

* Node.js installed
* Yarn installed
* A Supabase project
* Git installed

## Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit `.env.local` to Git.

## Install

Clone the repository:

```bash
git clone https://github.com/mykol5/agro-sense.git
```

Enter the project:

```bash
cd agro-sense
```

Install dependencies:

```bash
yarn install
```

## Run locally

Start the development server:

```bash
yarn dev
```

Open:

```text
http://localhost:3000
```

The AgroSense application should now be visible in the browser.

## Build check

To verify the production build:

```bash
yarn build
```

If the build succeeds, the application is ready for deployment.

## Authentication

Authentication is handled by Supabase Auth.

The application does not implement its own password hashing or session system.

## Data

The current application uses Supabase PostgreSQL for persistent data.

The core concepts are:

* Profiles
* Farms
* Crops
* Crop observations

Row Level Security is used to protect farmer-owned records.

## Sprint 01 scope

Sprint 01 includes:

* Product foundation
* Farmer authentication
* Farm onboarding
* Crop information
* Farmer-facing dashboard
* Crop Doctor problem framing
* Evaluation-set definition
* Baseline evaluation

## Explicitly out of scope

The following are future work:

* Offline mode
* Payments
* Multi-language/local-language support

They are not implemented as part of Sprint 01.

## Development

Create a feature branch for your ticket:

```bash
git checkout -b <branch-name>
```

Make changes, test them locally, commit them, and push the branch.

```bash
git add .
git commit -m "describe the change"
git push -u origin <branch-name>
```

Open a pull request after pushing.

Every sprint decision and implementation should be reviewed before subsequent work depends on it.

## Project status

AgroSense is currently being developed as part of the Sprint 01 Ground Truth cycle.

The immediate objective is to establish a working, reviewed, deployed product foundation and a challenge-tested evaluation plan for Crop Doctor.

````

### Then your GT-001 flow is

```bash
git checkout -b feat/GT-001-stand-it-up-stack-choice-in-writing-then-a-running

mkdir docs
````

Create:

```text
docs/stack-decision.md
```

and replace your README with the version above.

Then:

```bash
yarn install
yarn dev
```

Make sure `http://localhost:3000` works.

Then:

```bash
git add README.md docs/stack-decision.md
git commit -m "docs: document AgroSense stack decision"
git push -u origin feat/GT-001-stand-it-up-stack-choice-in-writing-then-a-running
```

Then **open the PR**.

One thing, though: **don't mark GT-001 done yet.** The reviewer challenge/approval is part of the acceptance criteria. Let Lars actually challenge it, then we incorporate his real feedback into `stack-decision.md`.
