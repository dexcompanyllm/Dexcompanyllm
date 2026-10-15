# 재점검 후 최소 개선 결과

기준: 2026-10-16 06:49 KST / 2026-10-15 21:49 UTC. 과거 9월 검증값을 현재 검증으로 재사용하지 않아요.

## 보안 수정

Runtime [PR #243](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/243)을 검수 후 main에 병합했어요.

- base: `5a57b84eeb6428f301b848439887ac02ca9b5c99`
- reviewed head: `94b591cef001ab567130304a78e3903dcb1ec265`
- merge: `8ea6a7d65c3f4fb5843433d6b0f5f54bceb5e9f8`
- 변경: package.json/package-lock.json 두 파일, 패키지 추가·삭제 없음
- MCP SDK 1.30.0 → 1.31.0, fast-uri 3.1.6 → 3.1.8, ip-address 10.5.0 → 10.7.4, proxy-addr 2.0.7 → 2.0.8
- 생산 의존성 audit: critical 1 / high 2 / moderate 1 → 전 등급 0. 이는 해당 시점의 의존성 검사이며 서비스 전체 보안 보증이 아니에요.
- 앱 코드·라이선스·dependency/engine 계약·권한·비용 정책·보안 검사 기준은 유지했어요. 취약 의존성 존재는 확인했지만 배포 환경 악용이나 침해는 입증하지 않았어요.

## 검증과 독립 검수

| 검사 | 결과·증거 |
|---|---|
| 원본 재구성 | 267개 텍스트 + 2개 PNG의 Git blob 검증, 전체 tree가 `ada7e25fd75a0dd20c360dafec050f902455e265`와 일치 |
| 기능 테스트 | 429개 중 428 PASS / 0 FAIL / 기존 Windows 전용 1 SKIP |
| 정적 검사·OAuth/PWA/MCP·Vercel adapter smoke | PASS; 로컬 테스트 범위 |
| 생산 의존성 audit | PASS, 모든 심각도 0 |
| 원래 Git 이력의 recovery tag 검사 | 원격 전체 이력 CI PASS. 로컬 재구성에는 원래 tag ancestry가 없어 로컬 검사는 실패했고 우회하지 않았어요. |
| 원격 PR CI | [38812224667](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/38812224667) PASS. 정확한 head와 위 base를 합친 merge result `8206b19f26e2bf4ca6cbda36aa4661496dbb08be`를 검사했어요. |
| 원격 push CI | [38812220514](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/38812220514) PASS |
| 독립 검수 | 별도 read-only run `independent_security_review`: exact blob·변경 범위·호환 계약·IPv6/proxy probe·원격 CI 확인, PASS / blocking finding 없음 |
| 병합 후 main CI | [38812726823](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/38812726823) PASS, 정확한 병합 SHA에 대한 검사 완료. |
| 실제 worker·기기·설치·운영 배포 | Not Checked. 위 CI나 smoke로 대체하지 않아요. |

## 자동화 기록 정정

연결된 자동화의 직접 조회 결과 세 자동화 모두 `is_enabled=false`, `next_run_time=null`이에요.

| 자동화 | ID | 마지막 실행 UTC |
|---|---|---|
| ChatGPT·Codex 변화·Dex 최적화 | 6a88c01b71a08191b2faf942886b0bf5 | 2026-10-05T22:17:33.924955Z |
| Dex 스킬 점검·발굴 | 6aa31682b4c08191b3f535dae1095527 | 2026-09-23T22:37:57.135836Z |
| Dex 상태·핵심 Gate 통합 감시 | 6a99ea49dbe88191a7a358fe78ed1d61 | 2026-09-22T09:30:35.734702Z |

`20_Codex_Handoff/DEX_SKILL_REGISTRY.json`의 `automation.enabled`만 true → false로 맞췄어요. 일정·프롬프트·fingerprint·과거 run·33개 entry·설치 상태는 보존해요. registry의 기존 asOfDate와 과거 PASS는 과거 기록이며 이 문서가 현재 관찰을 담아요. 자동화 재개나 새 자동화 생성은 하지 않았어요.

## 유지한 경계와 다음 순서

기존 #28(실제 Task→worker→result), #34(Work/mobile), #35(worker routing)를 닫지 않아요. 현재 환경에 codex CLI와 승인된 Windows worker·분리 계정 연결이 없어 실제 실행을 입증할 수 없어요. Skill 1.3.0 소스 존재와 33개 설치 상태 Not Checked를 구분해요. 디자인 A/B는 기존 PILOT_PLAN의 실제 3개 작업으로 이어가며 수치를 만들지 않아요.

우선순위는 실제 실행 receipt 한 건 확보 → 기존 디자인 pilot와 측정 → 검증된 범위의 context/memory 및 routing 개선이에요. 현 단계에서 새 multi-agent orchestration, durable runtime, memory 제품을 추가하거나 실험 플래그를 켜지 않아요.

두 저장소 main은 현재 branch API상 protected=false예요. 보호 규칙 문제는 남아 있으며 플랜 구매·공개 전환·권한 확대는 수행하지 않았어요. 기존 8개 역사 snapshot 문서는 수정하지 않아요.

Rollback: 후속 변경과 충돌을 확인한 뒤 Runtime #243을 revert해요. 상태 정정 rollback은 해당 필드만 되돌릴 수 있지만 실제 scheduler 상태와 다시 대조해야 해요. 기존 Task와 receipt 기록은 보존해요.
