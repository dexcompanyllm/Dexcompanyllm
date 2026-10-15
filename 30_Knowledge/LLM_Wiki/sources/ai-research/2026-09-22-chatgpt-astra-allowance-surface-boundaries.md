---
title: ChatGPT GPT-6 Astra·GPT-5.6 사용량과 표면별 실행 경계
claimType: FACT
classification: source-backed
verificationStatus: verified
verificationScope: OpenAI Help Center 공식 문서 기준; 개인 계정·실기기 적용은 별도 미확인
verifiedAt: 2026-09-22T13:10:40+09:00
verifiedBy: Jenny/ChatGPT
explored: false
disputed: false
supersedes: null
---

# ChatGPT GPT-6 Astra·GPT-5.6 사용량과 표면별 실행 경계

## 확인된 사실

- GPT-6 Astra는 ChatGPT Pro $100·$200, Business, Enterprise의 일반 Chat 표면에서 GPT-6 Pro로 제공되며, Plus는 ChatGPT Work와 Codex에서 Astra를 사용할 수 있어요. Work와 Codex의 Astra 사용량은 각 플랜의 Work/Codex allowance에서 차감돼요.
- Astra는 GPT-5.6 Sol보다 작업·입출력 크기·추론 설정·Fast mode에 따라 allowance를 더 빠르게 사용할 수 있어요.
- ChatGPT Pro $100은 GPT-6 Pro와 GPT-5.6 Sol Pro가 주간 50메시지 공유 allowance를 사용해요.
- ChatGPT Pro $200은 GPT-6 Pro 주간 200메시지, GPT-5.6 Sol Pro 별도 일간 170메시지, 두 모델 합산 일간 200메시지 제한이 있어요.
- Pro-model allowance에 도달해도 구독 자체가 바뀌는 것은 아니며, 표시된 reset 시각까지 다른 사용 가능한 모델을 선택하거나 기다려야 해요. OpenAI Support가 사용량을 직접 reset하지는 않아요.
- Astra 사용을 위해 Codex CLI 0.153.0 이상과 최신 ChatGPT Desktop 앱이 필요해요. GPT-5.6을 Codex에서 사용하려면 ChatGPT 데스크톱 Codex 모드 26.707.30751 또는 Codex CLI 0.144.0 이상이 필요해요.
- Work는 web·mobile·desktop에서 점진 배포되며, Codex는 web·mobile에서 선택형 화면으로 제공되지 않고 모바일에서는 지원되는 desktop Codex 작업을 Remote 탭으로 접근해요.

## Dex 적용 해석

- **confirmed:** 위 내용은 OpenAI Help Center 공식 문서에 기재된 제품 정책·호환성 정보예요.
- **inference:** 장시간 기획·코딩 작업은 Astra를 무조건 기본값으로 쓰기보다, 작업 난이도와 allowance 잔량을 확인해 Sol/Terra/Astra를 구분하는 편이 사용량 보존에 유리해요.
- **proposal:** Dex provider adapter는 특정 모델 ID를 전역 업무 정의에 직접 결합하지 않고, 표면(Chat·Work·Codex)·플랜 allowance·CLI/Desktop 최소 버전·실제 reset 표시를 입력으로 받아 실행 가능 여부를 판정해야 해요.
- **unknown:** 에던 계정의 실제 잔여량, Astra·Work·Codex의 개인별 rollout, Android/iOS/Windows/macOS에서의 실제 UI 노출, CLI/Desktop 설치 상태.

## 운영 경계

- 자동으로 credit 구매, banked reset 사용, 유료 API fallback, 요금제 변경, 모델 강제 전환을 하지 않아요.
- 모델·표면·기기별 실제 적용은 읽기 전용으로 확인하고, Dex canonical source는 계속 GitHub 승인 `main`으로 유지해요.
- 실제 사용 직전에는 계정 화면의 reset 시각과 allowance 표시를 우선 확인해요.

## 출처

- https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
- https://help.openai.com/en/articles/20001354-gpt-56-in-chatgpt
- https://openai.com/index/gpt-6-astra/
