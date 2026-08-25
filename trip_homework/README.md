# TripTrip 과제 예시

안녕하세요! 이 프로젝트는 작은 예제를 배운 뒤 갑자기 큰 과제 화면을 만났을 때, 
**어디에 어떤 파일을 만들어야 하는지** 천천히 살펴보기 위한 예시예요.

Figma 전체 기능을 한꺼번에 만든 프로젝트가 아닙니다. 지금 필요한 화면과 API만 연결했어요.

## 지금 만든 화면

| 주소 | 화면 | 연결한 API |
| --- | --- | --- |
| `/` | 로그인 전·후 메인 | 게시글 목록 조회, 로그인 회원 조회 |
| `/login` | 로그인 | 로그인 |
| `/signup` | 회원가입 | 회원가입 |
| `/boards/[boardId]` | 게시글 상세 | 게시글 하나 조회 |
| `/boards/new` | 트립토크 등록 | 화면을 채워 갈 빈 페이지 |
| `/travelproducts` | 숙박권 구매 | 화면을 채워 갈 빈 페이지 |

숙박권 구매와 트립토크 등록은 이동만 가능한 빈 페이지입니다. 아직 API 기능은 없고, 이번 주에는 Figma를 보며 CSS 화면부터 조금씩 채워 나갑니다.

## 먼저 폴더를 이렇게 기억해요

```text
src/
├── app/
│   ├── (auth)/                 로그인·회원가입 화면
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (main)/                 공통 헤더가 필요한 화면
│   │   ├── boards/
│   │   │   ├── [boardId]/page.tsx
│   │   │   └── new/            트립토크 등록 빈 페이지
│   │   ├── travelproducts/     숙박권 구매 빈 페이지
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/graphql/route.ts    브라우저 요청을 실제 API로 전달
│   └── layout.tsx              모든 화면의 가장 바깥쪽
├── components/
│   ├── boards/board-detail/    게시글 상세 화면 조각
│   ├── commons/header/         여러 화면에서 함께 쓰는 헤더
│   ├── home/                   메인의 배너와 게시판
│   └── providers/              Apollo를 모든 페이지에서 사용하도록 연결
├── graphql/
│   ├── mutations.ts            데이터를 만들거나 로그인하는 명령
│   └── queries.ts              데이터를 읽어오는 명령
└── types/
    ├── board.ts                게시글 데이터 모양
    └── user.ts                 회원 데이터 모양

public/
└── triptrip.png                로고처럼 주소로 바로 꺼내 쓸 파일
```

`(main)`, `(auth)`처럼 괄호로 감싼 폴더 이름은 주소에 들어가지 않아요. 비슷한 화면끼리 묶고 서로 다른 레이아웃을 사용하기 위한 **Route Group**입니다.

`public` 폴더는 로고, 아이콘, 배너처럼 브라우저에서 바로 사용할 파일을 두는 올바른 위치예요. `public/triptrip.png`는 코드에서 `/triptrip.png`라고 씁니다.

## API는 다섯 개만 사용했어요

### 1. fetchBoards

메인 페이지의 게시글 목록을 불러옵니다. 같은 결과의 앞 네 개를 `오늘 핫한 트립토크` 카드에도 보여줍니다.

### 2. fetchBoard

목록에서 게시글을 클릭했을 때 해당 게시글 하나만 불러옵니다.

### 3. createUser

회원가입 폼의 이메일, 이름, 비밀번호를 서버에 보냅니다.

### 4. loginUser

로그인에 성공하면 `accessToken`을 받습니다. 지금 단계에서는 흐름을 쉽게 보기 위해 브라우저의 `localStorage`에 저장합니다.

### 5. fetchUserLoggedIn

저장한 토큰을 함께 보내 현재 로그인한 회원의 이름, 이메일, 포인트를 불러옵니다. 이 결과로 헤더의 로그인 버튼을 프로필 버튼으로 바꿉니다.

## Apollo의 흐름

```text
페이지의 useQuery / useMutation
             ↓
ApolloSetting이 토큰을 헤더에 추가
             ↓
/api/graphql이 실제 연습 API로 전달
             ↓
결과를 받아 화면을 다시 그림
```

화면 컴포넌트에서 실제 API 주소나 복잡한 요청 설정을 반복하지 않기 위해 Apollo를 한 번 연결했습니다.

## 코드젠은 아직 사용하지 않아요

지금은 GraphQL 문법과 데이터 흐름을 먼저 이해하는 단계예요. 따라서 Codegen 설정 파일과 자동 생성 파일이 없습니다.

`src/types` 안의 타입은 우리가 직접 간단히 작성했습니다. 나중에 GraphQL 사용이 익숙해진 뒤 Codegen을 배우면 이 수동 타입을 자동으로 만들 수 있어요.

## 실행하기

이 프로젝트는 새로 만든 `next-study`와 같은 **Next.js 16 / React 19** 기준입니다. Next.js 16을 실행하려면 Node.js 20.9 이상이 필요하므로 수업에서는 Node.js 22를 선택하면 편해요.

```bash
nvm use 22
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 코드를 살펴보는 추천 순서

1. `app/(main)/page.tsx`에서 메인 화면이 어떤 컴포넌트를 조립하는지 봅니다.
2. `components/home/board-section/index.tsx`에서 `useQuery` 하나로 게시글을 불러오는 과정을 봅니다.
3. `graphql/queries.ts`에서 화면이 요청한 필드만 확인합니다.
4. `app/(auth)/signup/page.tsx`에서 입력값을 state에 담고 Mutation에 보내는 과정을 봅니다.
5. `app/(auth)/login/page.tsx`에서 받은 토큰을 저장하는 부분을 봅니다.
6. `components/commons/header/index.tsx`에서 로그인 전과 후가 바뀌는 과정을 봅니다.

CSS는 각 화면 옆의 `styles.module.css`에 있습니다. 파일 이름이 같아도 서로 섞이지 않는 CSS Module 방식이에요.

## 아직 없는 것들

- GraphQL Codegen
- 댓글, 좋아요, 글 등록·수정·삭제
- 실제 이미지 업로드
- 숙박권 구매와 트립토크 등록의 실제 화면 및 기능
- 마이 페이지
- Refresh Token을 이용한 자동 로그인 연장
- 복잡한 전역 상태 관리

처음부터 모든 기능을 넣으면 폴더와 데이터 흐름이 더 어려워져요. 게시글 조회와 로그인 흐름을 이해한 뒤 필요한 기능을 하나씩 추가하면 됩니다.
