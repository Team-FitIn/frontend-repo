# 👗 FITIN - 가상 피팅룸 서비스

> AI 기반 가상 피팅룸으로 옷을 직접 입어보지 않고도 나에게 맞는 스타일을 찾아보세요.

---

## 📸 스크린샷

### 메인 페이지
![메인 페이지] <img width="1279" height="677" alt="스크린샷 2026-06-13 오후 5 08 21" src="https://github.com/user-attachments/assets/77496ed5-3d14-454d-8dec-194c4bea85dc" />


### 가상 피팅룸
![가상 피팅룸] <img width="1280" height="682" alt="스크린샷 2026-06-13 오후 5 03 37" src="https://github.com/user-attachments/assets/4ac410ab-b26e-4e14-8bee-6631adb97011" />


### 검색 페이지
![검색 페이지] <img width="1279" height="679" alt="스크린샷 2026-06-13 오후 5 03 16" src="https://github.com/user-attachments/assets/2dccb261-9016-4ae4-ad65-992b8e306a42" />


### 위시리스트
![위시리스트] <img width="1279" height="680" alt="스크린샷 2026-06-13 오후 5 03 25" src="https://github.com/user-attachments/assets/59b9ec66-3dc7-4228-8062-1767bda32dad" />


### 로그인
![로그인] <img width="1277" height="680" alt="스크린샷 2026-06-13 오후 5 03 00" src="https://github.com/user-attachments/assets/681d0232-c1c1-494f-8723-55df2d8007e0" />


### 마이페이지
![마이페이지] <img width="1269" height="679" alt="스크린샷 2026-06-13 오후 5 08 14" src="https://github.com/user-attachments/assets/ac0475cb-5ffc-4e6f-a68f-949c8d482ba2" />


---

## 📌 프로젝트 소개

FITIN은 사용자가 얼굴 사진과 의류를 선택하면 AI가 가상으로 옷을 입혀주는 패션 플랫폼입니다.
무신사 의류 데이터를 기반으로 실제 상품을 탐색하고, 가상 피팅 결과를 확인할 수 있습니다.

---

## ✨ 주요 기능

- **가상 피팅룸 (VF)** — 얼굴 사진 + 의류 선택 → AI가 옷 입혀주기
- **의류 탐색** — 무신사 크롤링 데이터 기반 상품 검색 및 필터링
- **위시리스트** — 마음에 드는 상품 찜하기 + 무신사 상세 페이지 연결
- **소셜 로그인** — 구글 / 카카오 OAuth 2.0 로그인
- **마이페이지** — 피팅 히스토리, 내 정보 수정

---

## 🛠 기술 스택

### Frontend
| 기술 | 버전 |
|------|------|
| React | 18 |
| TypeScript | 5 |
| Tailwind CSS | 3 |
| motion/react | 12 |
| lucide-react | 1.8 |
| axios | - |
| Vite | - |

### Backend
| 기술 | 설명 |
|------|------|
| Java Spring Boot | REST API 서버 |
| MySQL | 데이터베이스 |
| JWT | 인증 토큰 |
| OAuth 2.0 | 소셜 로그인 |

### AI
| 기술 | 설명 |
|------|------|
| FastAPI | AI 서버 |
| InsightFace | 얼굴 인식 |
| CatVTON | 가상 피팅 딥러닝 모델 |
| Google Colab | GPU 서버 |

---

## 📁 프로젝트 구조
src/

├── api/

│   └── axios.ts

├── pages/

│   ├── MainPage.tsx

│   ├── VirtualFittingPage.tsx

│   ├── SearchPage.tsx

│   ├── WishlistPage.tsx

│   ├── LoginPage.tsx

│   ├── SignUpPage.tsx

│   ├── MyPage.tsx

│   └── OAuthRedirectPage.tsx

└── ...

---

## 📝 커밋 컨벤션

| 태그 | 설명 |
|------|------|
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| chore | 설정, 패키지 등 기타 변경 |
| merge | 브랜치 병합 |
