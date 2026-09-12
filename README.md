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
```

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

```
```
