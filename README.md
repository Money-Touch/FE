# 돈터치 (Money-Touch)

## 📌 프로젝트 소개

> 혼자가 아닌 **‘함께’** 소비를 관리하는 SNS형 소비 관리 웹앱 서비스

### 👥 Web Developers

<div align="center">

|                              Frontend                              |                              Frontend                               |                             Frontend                             |                              Frontend                              |
| :----------------------------------------------------------------: | :-----------------------------------------------------------------: | :--------------------------------------------------------------: | :----------------------------------------------------------------: |
| <img style="width: 150px;" src="https://github.com/hyeok02.png" /> | <img style="width: 150px;" src="https://github.com/sheepyis.png" /> | <img style="width: 150px;" src="https://github.com/zo0o0.png" /> | <img style="width: 150px;" src="https://github.com/gpdnjs8.png" /> |
|                [윤상혁](https://github.com/hyeok02)                |                [양인서](https://github.com/sheepyis)                |                [이현주](https://github.com/zo0o0)                |                [최혜원](https://github.com/gpdnjs8)                |

</div>
<br />

## 🛠 기술 스택

| 구분       | 기술         |
| ---------- | ------------ |
| Framework  | React 18     |
| Language   | TypeScript   |
| Styling    | Tailwind CSS |
| Build Tool | Vite         |
| 배포       | Netlify      |

> **선정 이유**
>
> - **React + TS**: 컴포넌트 재사용성과 타입 안정성 확보
> - **Tailwind CSS**: 빠른 UI 구현과 유지보수 용이성
> - **Axios**: API 요청 관리 일원화

---

## 📂 폴더 구조

```bash
src/
 ├── apis/
 ├── components/
 ├── constants/
 ├── hooks/
 ├── layouts/
 ├── mocks/
 ├── pages/
 ├── routes/
 ├── schemas/
 ├── styles/
 ├── types/
 ├── utils/
 ├── App.tsx
 └── main.tsx
```

## 🤝 협업 규칙

### 🌐 Git-flow

> - **main**: 프로젝트가 최종적으로 배포되는 브랜치
> - **develop**: 다음 출시 버전을 개발하는 브랜치
> - **feature**: 기능을 개발하는 브랜치
>   <br>

### 📌 Git branch 규칙

> 1. **개인 작업은 꼭 feature 브랜치에서 하기**
> 2. **모든 작업 시작 전 develop에서 pull을 받은 후, feature 브랜치에서 작업 시작**
> 3. **개인 작업 마치면 feature 브랜치로 pull request를 통해 develop에 merge하기**
> 4. **프로젝트 완료 후 main으로 merge (앨빈이 한번에 진행 예정)**
>    <br>

### 📝 Feature branch

> 1. **브랜치명은 아래의 형식으로 작성합니다. (feature/이름-기능제목#이슈번호)**
>    - 팀원 ysh2002m의 브랜치명: `feature/ysh2002m-login#1`
> 2. **Feature branch -> develop branch로 merge하기 전 PR에서 reviewers 설정하여 팀원 2명 이상에게 approve 받기**
> 3. **PR 후 팀원들에게 공지하기**
>    <br>

### 🎯 Commit Convention

> 1. **커밋 메시지의 형식은 하단의 사진과 같이 통일해 주세요.(사진에는 Feat이지만, 전부 소문자로 해주세요!)**
> 2. **깃모지를 사용해 주세요.**
>
> <li> 🎉 Start: Start New Project [:tada]
> <li> ✨ Feat: 새로운 기능을 추가 [:sparkles]
> <li> 🐛 Fix: 버그 수정 [:bug]
> <li> 🎨 Design: CSS 등 사용자 UI 디자인 변경 [:art]
> <li> ♻️ Refactor: 코드 리팩토링 [:recycle]
> <li> 🔧 Settings: Changing configuration files [:wrench]
> <li> 🗃️ Comment: 필요한 주석 추가 및 변경 [:card_file_box]
> <li> ➕ Dependency/Plugin: Add a dependency/plugin [:heavy_plus_sign]
> <li> 📝 Docs: 문서 수정 [:memo]
> <li> 🔀 Merge: Merge branches [:twisted_rightwards_arrows:]
> <li> 🚀 Deploy: Deploying stuff [:rocket]
> <li> 🚚 Rename: 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 [:truck]
> <li> 🔥 Remove: 파일을 삭제하는 작업만 수행한 경우 [:fire]
> <li> ⏪️ Revert: 전 버전으로 롤백 [:rewind]
> <img width="713" alt="스크린샷 2024-12-12 오전 11 11 43" src="https://github.com/user-attachments/assets/6353a525-89fb-4f17-a93f-924bedcb9d15" />

## 💡 개발 중 겪은 어려움과 해결 과정

### **1. CSS 우선순위 문제**

| 항목          | 내용                                                                                                                                                                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **발생 배경** | 프로젝트에서 **Tailwind CSS**를 사용하던 중, 특정 컴포넌트의 마진 값을 동적으로 변경하려는 상황에서 문제가 발생함.<br>`className={`${S.SignupDiv} mt-[2rem]`}`처럼 스타일 적용 시, 우선순위 문제로 일부 Tailwind CSS 클래스가 제대로 작동하지 않음. |
| **발생 원인** | CSS는 선언된 순서와 우선순위에 따라 스타일이 적용되는데, Tailwind CSS는 **utility-first** 접근 방식을 사용하기 때문에 기존 스타일과 충돌 시 우선순위에서 밀려 적용되지 않음.                                                                        |
| **해결 방법** | `className={`${S.SignupDiv} !mt-[2rem]`}`처럼 `!important` 접두사(`!`)를 사용하여 해당 스타일의 우선순위를 높여 문제를 해결함.                                                                                                                      |

---

### **2. Netlify 배포 문제**

| 항목          | 내용                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **발생 배경** | **SPA 프로젝트**를 Netlify로 배포하는 과정에서 **리다이렉션 설정, 빌드 환경 설정 부족, 자동 배포 오류** 등의 문제가 발생함.                                                                                                                                                                                                                                                                                                                                                                       |
| **발생 원인** | 1. **리다이렉션 설정(\_redirects 파일 누락)**<br>SPA 프로젝트는 클라이언트 사이드 라우팅을 사용하기 때문에 서버가 직접 경로를 처리할 수 없음.<br>모든 요청을 `index.html`로 리디렉션해야 하는데 해당 설정 파일이 누락됨.<br><br>2. **빌드 환경 설정 부족 (netlify.toml 설정 미비)**<br>경로 처리 설정이 없어서 특정 라우트 접근 시 404 오류 발생.<br><br>3. **자동 배포 설정 오류**<br>Git과 Netlify를 연동했으나, `CI=true` 환경 변수가 누락되어 빌드 오류가 제대로 표시되지 않아 배포가 중단됨. |
| **해결 방법** | 1. **\_redirects 파일 추가** (`public/_redirects`)<br>`text\n/* /index.html 200\n`<br>2. **netlify.toml 파일 추가** (루트 디렉토리)<br>`toml\n[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200\n`<br>3. **자동 배포 환경 설정**<br>빌드 명령어를 `CI= npm run build`로 지정하여 빌드 오류를 명확하게 파악하고 안정적인 배포가 가능하도록 처리함.                                                                                                                                |

## 🤖 AI 활용

- **자동 코드 리뷰**: GitHub PR 생성 시, [CodeRabbit](https://coderabbit.ai)이 자동으로 코드 변경 사항을 분석하고 개선 제안을 제공.
  - 필수 반영 사항은 아니되, 개발 품질 향상과 코드 일관성 유지를 위한 참고 자료로 활용함.
- **버그 해결**: 에러 로그 분석 및 디버깅 전략 도출 일부에 AI 사용

## 📢 기타 사항

- 배포 링크\
  [Money-Touch](https://dont-touch.netlify.app/)
