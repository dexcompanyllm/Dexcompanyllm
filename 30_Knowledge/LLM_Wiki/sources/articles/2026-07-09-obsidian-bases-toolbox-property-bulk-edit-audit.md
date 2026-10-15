---
type: llm-wiki-source
status: captured
title: "Obsidian Bases Toolbox property bulk edit audit"
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
confidence: medium
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
sourceKind: community-plugin-and-official-docs
source:
  - "https://forum.obsidian.md/t/enhance-bases-usability-experience-with-bases-toolbox/115907"
  - "https://github.com/grub-basket/Bases-Toolbox"
  - "https://community.obsidian.md/plugins/bases-toolbox"
  - "https://obsidian.md/help/plugin-security"
  - "https://obsidian.md/help/bases"
  - "https://obsidian.md/help/bases/syntax"
publisher: "Obsidian Forum / GitHub / Obsidian Help"
collectionPurpose: "Obsidian Bases와 frontmatter property를 대량 편집하는 커뮤니티 플러그인 후보를 Dex Company Vault 운영에서 설치가 아니라 승인 전 실사 기준으로 다루기 위해 보존한다."
tags:
  - llm-wiki/source
  - obsidian
  - bases
  - automation
  - install-audit
  - vault-ops
---

# Obsidian Bases Toolbox Property Bulk Edit Audit

## Original Content

- 수집 시각: 2026-07-09 05:05 KST
- 자료 유형: Obsidian Forum showcase, GitHub repository, Obsidian community plugin directory, Obsidian official Help docs
- 핵심 내용 쉬운 설명: Bases Toolbox는 Obsidian Bases와 frontmatter property를 더 쉽게 대량 관리하려는 커뮤니티 플러그인입니다. property index, find/replace preview, bulk edit, CSV import/export, duplicate merge, property format doctor 같은 기능은 Dex Company Vault 운영에 유용할 수 있지만, 커뮤니티 플러그인은 Obsidian 권한을 상속하고 vault 파일을 직접 바꿀 수 있으므로 자동 설치하지 않습니다.
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 짧은 요약, 운영 판단, 미확인 항목만 보존합니다.

## Source-Backed Notes

- Obsidian official Help는 Bases가 note properties, file properties, formula properties를 사용하며, note properties는 Markdown frontmatter에 저장된다고 설명합니다.
- Obsidian official Help는 커뮤니티 플러그인이 Obsidian의 접근 권한을 상속하며, 파일 접근, 인터넷 연결, 추가 프로그램 설치가 가능할 수 있다고 경고합니다.
- Obsidian Forum 게시글은 Bases Toolbox가 property index, find/replace, bulk edit, conditional formatting, CSV import/export, duplicate merge, property format doctor, companion notes, metadata stamping 같은 기능을 제공한다고 설명합니다.
- 게시글 작성자는 플러그인이 AI-assisted로 만들어졌고 아직 battle-hardened 상태가 아니므로 vault backup을 먼저 하라고 경고합니다.
- GitHub repository는 MIT license, manifest version `0.1.41`, minAppVersion `1.9.0`, package scripts `dev`, `build`, `deploy:files`, `deploy`, `typecheck`를 공개합니다.
- GitHub README는 다수 작업이 history/revertible 흐름을 갖는다고 설명하지만, merge notes는 자동 undo가 없고 source note를 vault trash로 옮긴다고 설명합니다.

## Dex Company Use Example

Obsidian Bases나 LLM Wiki property를 대량 수정해야 할 때는 아래 승인 패킷이 채워지기 전까지 설치하지 않습니다.

```yaml
obsidian_community_plugin_bulk_edit_gate:
  target_vault_path: checked | not_checked
  exact_plugin_id: bases-toolbox
  plugin_version: "0.1.41"
  source_repo: checked | not_checked
  community_directory_page: checked | not_checked
  obsidian_min_app_version: "1.9.0"
  current_obsidian_version: not_checked
  restricted_mode_change_required: yes | no | not_checked
  vault_backup_created: yes | no | not_checked
  test_vault_trial_completed: yes | no | not_checked
  affected_property_scope: listed | not_checked
  preview_before_apply: required
  history_or_undo_path: checked | partial | not_checked
  destructive_actions_disabled_or_confirmed: checked | not_checked
  network_or_telemetry_claim_checked: partial
  package_scripts_reviewed: partial
  lockfile_dependency_reviewed: not_checked
  source_scan_status: not_checked
  rollback_path: restricted_mode_on_or_plugin_remove_plus_restore_backup
  decision: approval-not-ready
```

## Evidence Quality

- quality: medium
- 이유: Obsidian official Help와 GitHub repository metadata를 확인했고, community plugin directory와 forum 게시글을 교차 확인했습니다. 그러나 실제 플러그인 코드를 정적 분석하지 않았고, Obsidian desktop/mobile runtime에서 실행하지 않았으며, vault backup/restore rehearsal도 하지 않았습니다.
- 교차 검증: Obsidian Bases official docs, Obsidian plugin security official docs, forum showcase, GitHub README/package/manifest/license, community plugin page를 대조했습니다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- 계정/connector 변경: 없음.
- license: MIT로 확인.
- 공급망 리스크: GitHub repository는 작고 최근 생성된 커뮤니티 플러그인이며, package scripts와 lockfile/source scan은 충분히 감사하지 않았습니다.
- 권한 리스크: Obsidian 커뮤니티 플러그인은 vault 파일 접근과 네트워크/추가 프로그램 실행 가능성을 가질 수 있으므로 Restricted mode 변경이 곧 보안 결정입니다.
- 데이터 리스크: frontmatter 대량 편집, merge, delete, CSV import/export, companion note creation은 LLM Wiki metadata와 project dashboard를 대량 변경할 수 있습니다.
- 운영 제한: 실제 사용은 에던님 승인, vault backup, test vault trial, affected property list, preview evidence, rollback rehearsal가 있을 때만 조건부 승인 후보로 올립니다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Obsidian docs describe Bases/frontmatter storage and community plugin security boundaries; Bases Toolbox public pages describe feature scope, version, license, package scripts, and author caveats.
- Dex inference: Dex Company should treat Obsidian property bulk-edit plugins as approval-gated vault mutation tools, not as normal productivity plugins.
- not checked: local Obsidian version, actual plugin safety scorecard details, full source audit, dependency lockfile audit, network call inspection, mobile/desktop behavior, backup/restore rehearsal, and real vault dry run.

## Bias Check

- Counter-argument: The plugin may be genuinely useful and explicitly claims no network/telemetry plus history-based revert paths, so a blanket rejection would slow useful Vault maintenance.
- Data gap: The current note did not inspect full source code, bundled release artifacts, safety scorecard internals, or a test-vault run. It only supports `approval-not-ready`, not install approval.
