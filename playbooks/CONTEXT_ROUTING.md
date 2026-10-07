# Context Routing

Dex Company uses progressive context loading. Do not load the whole repository by default.

## Route
`Bootstrap Core → Classify Task → Select Capability → Load Minimum Skill/Playbook/Template → Execute → Validate`

## Core
Bootstrap loads only the canonical startup documents defined by `BOOTSTRAP.md`. Task-specific material is loaded only after a concrete task exists.

## Task classification
Classify the request by the work that must be done, not by provider/model name. Examples include requirements, workflow/agent design, QA, design quality, developer handoff, research, and governance.

## Minimum context rule
Load only material that can change the current decision, execution, or validation. Do not preload unrelated skills or historical records.

If no Dex method is needed for a task, do not load task-specific Dex material.

## Company-managed AI
A company-managed AI may use Dex Company as a reference for generalized work methods when organizational policy permits access.

Company/system/security/access rules always take precedence. Company or client work material must not be copied into Dex Company merely to apply a method. Apply the method inside the authorized company environment.

## Routing result
Before loading task-specific context, identify:
- task class
- required capability
- selected Dex reference(s)
- references intentionally not loaded
