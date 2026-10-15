# Obsidian Legacy Compatibility Reference

- Status: Legacy reference
- Official Dex Company component: No

## 결정

Obsidian은 Dex Company의 공식 구성요소, Source of Truth, 필수 편집기 또는 장기 기억 시스템이 아니다. GitHub `main`이 유일한 기준정보다.

## 이 파일을 남기는 이유

- 2026-08-21 마이그레이션 과정과 기존 파일의 해석 근거 보존
- 기존 `.obsidian/`, Canvas, Bases, `[[Wiki Link]]`를 갑자기 삭제하지 않기 위한 호환 기록
- 에던이 개인적으로 Markdown 편집기로 다시 사용할 때 참고

이 이유는 Obsidian을 계속 설치하거나 운영해야 한다는 의미가 아니다.

## 허용되는 사용

- GitHub repository를 clone한 뒤 개인 선택형 Markdown 편집기로 열기
- 기존 Wiki Link와 Canvas를 사람이 확인하기
- migration backup을 검토하기

## 금지되는 의존성

- Obsidian registry, graph, plugin 또는 Sync가 없으면 실패하는 workflow
- Obsidian local path만 canonical path로 기록
- Obsidian에만 존재하고 GitHub에 반영되지 않은 결정·상태
- 새로운 provider-neutral 기능을 Obsidian plugin 전용으로 구현

## 제거 가능 조건

다음이 확인되면 에던은 PC에서 Obsidian 앱과 local 설정을 제거해도 된다.

1. GitHub `main`에 필요한 Markdown과 artifact가 존재
2. 백업과 Git 이력 복구 가능
3. 신규 PWA/MCP workflow가 Obsidian을 참조하지 않음
4. 사용 중인 개인 노트가 별도로 남아 있지 않음

앱을 삭제해도 GitHub의 Dex Company 데이터에는 영향이 없다.

## 기존 파일 정책

- `.obsidian/`과 legacy Canvas는 당장 삭제하지 않는다.
- 신규 운영 문서에서는 Obsidian을 공식 구성요소로 표현하지 않는다.
- 향후 정리 task에서 사용 여부와 link 영향도를 검증한 뒤 archive 또는 제거한다.
