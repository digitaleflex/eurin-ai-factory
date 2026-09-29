# Factory Pattern Catalog — Melvynx

> Version: 1.0
>
> Purpose: convert observations from Melvynx repositories into explicit engineering patterns that can be evaluated for Eurin AI Factory.
>
> This catalog is **not** a source of truth for Factory architecture. A pattern becomes part of the Factory only after the normal Decision Gate and, where architectural impact exists, an ADR.

## Reading key

- **OBSERVED** — directly observed in a referenced repository.
- **INFERRED** — interpretation of an observed structure.
- **ADOPT** — already represented in the Factory.
- **ADAPT** — useful, but must be adapted to Factory constraints.
- **DEFER** — valid idea, intentionally postponed.
- **REJECT** — not appropriate for the Factory core.

## Catalog

| ID | Pattern | Source | Problem solved | Factory mapping | Priority | Status |
|---|---|---|---|---|---|---|
| MP-01 | Portable Skill Contract | aiblueprint, api2cli | Makes specialized knowledge portable between agent runtimes | `skills/SKILL_CONTRACT.md`, loading protocol | P0 | ADOPT |
| MP-02 | Explicit Agent Routing | aiblueprint, agent-burn | Prevents agents from receiving the wrong repository/domain instructions | `skills/skill-selection.md`, orchestration context loading | P0 | ADAPT |
| MP-03 | Layered Agent Instructions | aiblueprint, agent-burn | Keeps always-on constraints separate from specialized skills | `rules/MASTER_RULES.md` + agent contracts + skills | P0 | ADOPT |
| MP-04 | Contract-First Agent Output | api2cli, Factory runtime | Makes automation consumable by machines rather than relying on prose | `AgentResult`, workflow schema, handoff contract | P0 | ADOPT |
| MP-05 | Adapter Boundary | api2cli, agent-burn | Decouples orchestration from concrete providers/runtimes | Agent Adapter, planned Provider Adapter | P0 | ADOPT |
| MP-06 | Standard Agent-Friendly CLI | api2cli | Gives agents a deterministic interface to external capabilities | Issue #14 Factory CLI | P0 | PLANNED |
| MP-07 | Security Hooks / Automated Guardrails | aiblueprint, agent-burn | Stops unsafe operations before execution | No equivalent complete layer yet | P0 | GAP |
| MP-08 | API/Schema Validation Boundary | next-zod-route | Rejects invalid input at the boundary instead of deep in business logic | Workflow loader/schema validation; future adapter schemas | P0 | ADOPT |
| MP-09 | Durable Execution Store | saveit.now / Factory design | Survives process restarts and enables audit/recovery | Issue #6 | P0 | PLANNED |
| MP-10 | Artifact + Handoff Registry | Factory design, agent workflows | Makes produced artifacts and transitions traceable | Issue #18 | P0 | PLANNED |
| MP-11 | Project Manifest | Factory design | Makes project-specific capabilities and constraints explicit | Issue #13 | P0 | PLANNED |
| MP-12 | Compatibility Matrix | Factory design / reusable tooling | Prevents integrations from silently assuming incompatible environments | Issue #24 | P1 | PLANNED |
| MP-13 | Provider Adapter | api2cli / agent-plugin pattern | Allows multiple model/tool providers behind one contract | Issue #16 | P1 | PLANNED |
| MP-14 | Repo-Local Skill Packs | agent-burn | Allows a repository to define domain-specific agent knowledge without changing the global core | Project integration package + skill loading | P1 | ADAPT |
| MP-15 | Machine-Readable Rule Packs | cursor.rules | Converts coding/architecture conventions into files agents can load deterministically | Existing rules/skills; candidate project rule packs | P1 | ADAPT |
| MP-16 | Small, Composable Runtime Modules | agent-burn | Limits blast radius and makes testing/migration easier | Runtime modules already separated by concern | P1 | ADOPT |
| MP-17 | Specialized CLI + Skill Pair | api2cli | Gives an agent both operational commands and the instructions needed to use them | Future CLI + Skill distribution | P1 | ADAPT |
| MP-18 | Cross-Repository Documentation Impact Check | agent-burn | Prevents runtime changes from leaving user-facing docs inconsistent | QA/DoD; candidate docs-impact check | P1 | ADAPT |
| MP-19 | TDD / Red-Green-Refactor as Agent Skill | agent-burn | Makes behavioral changes test-led and repeatable | Testing skill + QA workflow | P1 | ADOPT |
| MP-20 | Structural Search for Refactors | agent-burn | Makes large code migrations safer than text-only replacement | Future developer/QA skill | P2 | DEFER |
| MP-21 | Environment/Toolchain Contract | aiblueprint, agent-burn | Reduces "works locally" differences through explicit runtime/tooling expectations | Project Manifest + compatibility matrix | P1 | ADAPT |
| MP-22 | Human-Readable + Machine-Readable Outputs | api2cli | Lets humans inspect results while agents consume stable data | Runtime events/results + future CLI | P1 | ADAPT |

## What we should NOT copy automatically

The following are observations, not architecture mandates:

- Bun as the runtime.
- Rust as the Factory runtime.
- A specific monorepo tool.
- A specific framework or UI library.
- Any provider-specific AI SDK.
- A marketplace/commercial distribution model.
- Automatic execution that bypasses Human Approval.
- A large plugin system before the core contracts are stable.

## Adoption rule

A pattern enters Factory core only when:

1. The pattern solves a real Factory problem.
2. The current architecture does not already solve it adequately.
3. Alternatives are considered.
4. Operational and security cost are known.
5. Blast radius is understood.
6. A small implementation/test can validate the assumption.
7. The decision is recorded in the appropriate ADR or decision log.

## Recommended sequence

### P0 — strengthen the core

1. MP-07 Security Hooks / Guardrails
2. MP-06 Factory CLI
3. MP-11 Project Manifest
4. MP-13 Provider Adapter
5. MP-09 Durable Execution Store
6. MP-10 Artifact/Handoff Registry

### P1 — make the Factory reusable

7. MP-02 Explicit Agent Routing
8. MP-14 Repo-Local Skill Packs
9. MP-15 Machine-Readable Rule Packs
10. MP-17 CLI + Skill pairing
11. MP-21 Environment/Toolchain Contract
12. MP-18 Documentation Impact Check

### P2 — optimize the engineering loop

13. MP-20 Structural Search
14. Additional provider routing and advanced learning mechanisms

## Core principle

External repositories are **pattern evidence**, not authority.

The Factory decides what to adopt.

**L'IA produit. Eurin décide.**
