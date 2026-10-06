# Skill — Validation Gates

## Principle
Repeated failure should become a gate rather than another reminder.

## Procedure
1. Capture the exact failure.
2. Identify the earliest deterministic signal that can detect it.
3. Convert that signal into a checklist, schema, lint rule, test, assertion, hook, or review gate.
4. Define PASS / FAIL / Not Checked.
5. Run the gate against a known failing case and a known passing case when feasible.
6. Record false positives/negatives.
7. Promote the gate only after evidence shows it reduces recurrence.

A gate must not claim broader quality than it actually tests.
