# Codex native Voice build watch — 2026-09-01

## Scope

이 문서는 직전 Codex provider watch 이후 새로 확인된 OpenAI `openai/codex` upstream `main`의 native Voice build 변경을 Dex Company 관점에서 기록합니다. 이 근거는 **upstream-main evidence**이며 current stable capability evidence가 아닙니다.

Official sources:

- https://github.com/openai/codex/commit/fc7d34ad67d0c398b8d2745e329273ee9ecebbaa
- https://github.com/openai/codex/releases/tag/rust-v0.151.0

## Confirmed

- OpenAI PR #41890 / commit `fc7d34ad67d0c398b8d2745e329273ee9ecebbaa` adds `third_party/voice/build_native.py` for building a shared-library prefix from the previously pinned native Voice source inputs.
- The recipe supports native x64 and ARM64 hosts for GNU/Linux, macOS and Windows MSVC.
- Toolchain paths must be supplied explicitly. Dependency discovery is constrained to the build prefix, and command logs plus `build-state.json` are retained for provenance and failure analysis. `built.json` is written only after every build/install command succeeds.
- Windows requires a normal Visual Studio SDK environment plus GNU make, a POSIX shell for upstream libffi and an NMake bootstrap path. The recipe does not install those prerequisites or patch upstream sources.
- Optional plugins and fallback dependency resolution are disabled in the recipe; runtime closure remains a separate verification step.
- OpenAI explicitly states that a successful prefix build still does **not** prove final Cargo/Bazel linkage, safe private runtime loading or an installed Voice-capable Codex package.
- The latest official stable release remains Codex `0.151.0`; this Voice build recipe is not evidence that stable `0.151.0` exposes a new native Voice capability.

## Inference

- The sequence from pinned source preparation to a reproducible native build recipe is a stronger upstream investment signal for future native Voice than the source-preparation commit alone.
- Windows MSVC being an explicit supported build target improves the probability of future cross-platform portability, but it does not establish end-user availability, microphone policy, packaging behavior or approved Windows-host compatibility.
- Requiring explicit toolchains, isolated dependency discovery and build-state provenance aligns with Dex reliability and supply-chain goals, but Dex should not copy or depend on the upstream build system until a stable/user-facing contract exists.

## Proposal / Dex policy

- Keep native Voice `watch-only` / disabled. Do not add a Dex execution capability or dependency from this upstream commit alone.
- Do not automatically install Visual Studio components, GNU make, POSIX shell, GStreamer/codec libraries or other native Voice build prerequisites on the approved worker host.
- Do not fetch, compile or package upstream Voice dependencies merely to probe an unreleased capability.
- Preserve the existing desktop Work/Codex Voice product surface as an OpenAI-owned human intake/coordination surface; do not conflate it with this upstream native runtime work.
- Re-evaluate after an official stable or user-facing native Voice contract exists. Any activation must pass explicit permission/privacy, packaging, provenance, runtime-closure, rollback and approved-host E2E gates.

## Future activation gates

- [ ] Official stable/user-facing Codex native Voice contract is published and version-scoped.
- [ ] Microphone/audio capture, recording/retention/privacy and user-consent behavior are documented.
- [ ] Input/output device selection, interruption, timeout and kill-switch behavior are verified.
- [ ] Windows packaging/runtime dependencies and minimum supported host requirements are confirmed without broadening worker privileges.
- [ ] Native runtime closure and private-library loading are inspected; no unexpected external dependency or search-path escalation is present.
- [ ] Source/license/provenance review covers bundled native dependencies and their redistribution obligations.
- [ ] Approved-host E2E passes with subscription-first authentication and without paid API or automatic paid fallback.
- [ ] Rollback/uninstall path is verified before any operational enablement.

## Verification

### PASS

- Official upstream commit reviewed.
- Latest official stable release rechecked: `0.151.0`.
- Current Dex Runtime `main` remains on the approved stable/watch-disabled policy boundary; no native Voice runtime dependency was introduced.
- Existing Runtime Issue #30 remains the single tracking authority for high-permission Windows/browser/Voice security watch items.

### FAIL

- None in the documentation/tracking scope.

### Not Checked

- Which future stable release, if any, will include PR #41890.
- Final Cargo/Bazel linkage and installed-package integration.
- User-facing native Voice availability in Codex CLI/App/IDE/App Server.
- Microphone/privacy/retention semantics for the upstream native runtime.
- Approved Windows worker-host native Voice build or E2E.

## Decision

`proposal accepted under standing provider-optimization approval`: record the upstream build signal and strengthen the future gate only. Do not activate, build, install or broaden permissions.

This checkpoint does not change the current Dex priority order: `#17 -> #28 -> #34/#35`.
