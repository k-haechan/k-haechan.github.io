/* ═══════════════════════════════════════════════════
   포트폴리오 콘텐츠 데이터
═══════════════════════════════════════════════════ */

const SKILLS = [
  ['Language', ['Java 21', 'Python', 'C / C++'], ['Java 21']],
  ['Backend', ['Spring Boot', 'Spring Security', 'Spring Data JPA', 'QueryDSL'], ['Spring Boot', 'Spring Security']],
  ['Database', ['MySQL', 'Redis', 'MongoDB', 'H2 (test)', 'Flyway'], ['MySQL', 'Redis']],
  ['Infra & Cloud', ['AWS (EC2·S3·RDS·CloudFront)', 'Docker', 'Terraform (IaC)'], ['AWS (EC2·S3·RDS·CloudFront)', 'Terraform (IaC)']],
  ['CI/CD', ['GitHub Actions', '브랜치 보호 규칙', 'Secret 관리'], ['GitHub Actions']],
  ['Auth & Security', ['JWT (JJWT)', 'OAuth2 (Kakao)', 'BCrypt', 'BouncyCastle (PKI)'], ['JWT (JJWT)', 'BouncyCastle (PKI)']],
  ['Test', ['JUnit5', 'Mockito', 'Jacoco', 'JMeter', 'k6'], []],
  ['Frontend', ['Next.js', 'JSP', 'Thymeleaf', 'HTML / CSS'], []],
  ['Docs & Collab', ['SpringDoc / Swagger', 'Git', 'Slack', 'Notion'], []],
  ['AI 활용', ['Claude', 'Codex', 'Groq (Llama) API'], ['Claude']],
];

/* ── Project cover thumbnails (real images) ──────── */
const COVERS = {
  sns: `<img src="images/sns_thumbnail.png" style="width:100%;height:100%;object-fit:cover;display:block;">`,
  ssafy: `<img src="images/ssafy_thumbnail.png" style="width:100%;height:100%;object-fit:cover;display:block;">`,
  cotree: `<img src="images/cotree_thumbnail.png" style="width:100%;height:100%;object-fit:cover;display:block;">`,
  hakku: `<img src="images/hakku_thumbnail.png" style="width:100%;height:100%;object-fit:cover;display:block;">`,
};
/* ── Projects ──────────────────────────────────── */
const PROJECTS = [
  {
    id: 'sns',
    index: '/ 02',
    cover: COVERS.sns,
    name: 'SNS Service',
    sub: '실시간 소셜 네트워킹 백엔드',
    type: '1인 프로젝트',
    period: '2025.07 — 2025.09',
    tagline: '기획·개발·인프라·배포까지 혼자 책임진 SNS 서비스. 실시간 채팅·알림, 보안 미디어 처리, 코드형 인프라(IaC)와 CI/CD 자동화까지 풀스택 백엔드 역량을 담았습니다.',
    stackMini: 'Spring Boot · MySQL · MongoDB · Redis · AWS',
    metrics: [
      { val: '193', lab: 'Commits (전부 본인)' },
      { val: '#6127', lab: 'AWS SDK 오픈소스 기여' },
      { val: '5min', lab: 'Presigned URL 만료' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/k-haechan/sns1-server' },
      { label: 'IaC 템플릿', url: 'https://github.com/k-haechan/cicd-template-repo' },
    ],
    overview: '게시물·댓글·팔로우 등 기본 소셜 기능에 더해 <strong>실시간 채팅·알림</strong>, <strong>보안을 고려한 미디어 처리</strong>, <strong>코드형 인프라(IaC)와 CI/CD 자동화</strong>까지 혼자 책임진 프로젝트입니다. 193개의 커밋 전부를 직접 작성하며 기획부터 배포까지 풀사이클을 경험했습니다.',
    problems: [
      {
        tag: '보안',
        title: '비공개 미디어 접근 제어 → CloudFront 서명 쿠키 + 오픈소스 기여(#6127)',
        problem: '업로드된 이미지를 아무나 URL로 접근하지 못하도록 제어해야 했습니다.',
        solution: 'CloudFront <strong>서명 쿠키/URL</strong> 정책을 직접 구현. 구현 중 AWS SDK for Java v2의 <code>CustomSignerRequest</code>가 <strong>서명 쿠키 정책의 <code>resourceUrlPattern</code>을 지원하지 않는 한계</strong>를 발견해 공식 레포에 이슈를 제보(#6127, CLOSED). 전공(PKI·서명) 지식이 실무 문제 발견으로 이어진 사례입니다.',
      },
      {
        tag: '성능·보안',
        title: '이미지 업로드 부하 → S3 Presigned URL',
        problem: '모든 업로드가 앱 서버를 거치면 트래픽·메모리 부하가 발생합니다.',
        solution: '서버를 거치지 않는 <strong>Presigned PUT URL</strong> 발급. 남용 방지를 위해 <strong>유효기간 5분 제한</strong>, <strong>Content-Type <code>image/webp</code> 고정</strong>, 사용자/게시물 ID 기반 키 경로(<code>images/members/{memberId}/posts/{postId}-{idx}</code>)로 구조화했습니다.',
      },
      {
        tag: '운영',
        title: '배포 헬스체크 비효율 → 폴링 방식 개선',
        problem: '배포 후 서버 기동을 "고정 루프 카운트"로 확인 → 20회 루프 동안 안 뜨면 실패하고 불필요한 부하가 발생했습니다.',
        solution: '<strong>2초 간격 폴링</strong>으로 변경해 서버 부하를 줄이고 기동 확인을 안정화했습니다.',
      },
    ],
    rationale: [
      { tech: 'MongoDB (채팅)', reason: '채팅은 고빈도 쓰기 + 비정형 + 관계 조인 불필요 → 데이터 특성을 날카롭게 분석해 관계형(MySQL)과 비관계형(MongoDB)을 요건에 맞게 혼용하는 <strong>다중 데이터베이스 구조</strong>로 설계. 정형 데이터는 MySQL, 비정형 메시지는 MongoDB로 분리해 부하를 낮추고 각 저장소의 강점을 최대화했습니다.' },
      { tech: 'Redis', reason: 'Refresh Token 블랙리스트(로그아웃 즉시 무효화)와 이메일 인증번호는 <strong>빠른 조회 + TTL</strong>이 핵심 → 인메모리 저장소가 최적.' },
      { tech: 'STOMP vs SSE', reason: '양방향이 필요한 <strong>채팅은 STOMP(WebSocket)</strong>, 서버→클라이언트 단방향인 <strong>알림은 SSE</strong>로 구현해 불필요한 WebSocket 오버헤드를 제거.' },
      { tech: 'Terraform', reason: 'AWS(VPC·EC2·RDS·S3·CloudFront)와 <strong>GitHub(Secrets·브랜치 보호)</strong>까지 코드로 통합 관리 → 수작업·드리프트 방지, 재현 가능한 인프라.' },
      { tech: 'PR · 테스트 습관', reason: '1인 프로젝트임에도 feature/hotfix 브랜치 + <strong>PR 단위(#75까지)</strong>, 기능마다 <strong>단위/통합 테스트(JUnit5·Mockito)</strong> 동반, Jacoco로 커버리지 관리.' },
    ],
    stack: ['Java 21', 'Spring Boot 3.5.3', 'Spring Security', 'JWT', 'QueryDSL', 'MySQL', 'MongoDB', 'Redis', 'Flyway', 'AWS S3 / CloudFront', 'STOMP', 'SSE', 'Terraform', 'GitHub Actions', 'Docker', 'Jacoco'],
  },

  {
    id: 'ssafy',
    index: '/ 01',
    cover: COVERS.ssafy,
    name: 'SSAFY Study Platform',
    sub: 'AI 퀴즈·실시간 알림 스터디 백엔드',
    type: '1인 백엔드',
    period: '2026.02 — 2026.03',
    tagline: 'SSAFY 스터디원 20명이 실제 사용하는 학습 플랫폼 백엔드. AI가 학습 글을 기반으로 퀴즈를 자동 생성하고, SSE로 실시간 알림을 제공해 스터디 효율을 높였습니다.',
    stackMini: 'Spring Boot 4.0 · Groq · SSE · Redis',
    metrics: [
      { val: '20명', lab: '실사용 스터디원' },
      { val: '53', lab: 'Commits (전부 본인)' },
      { val: '70B', lab: 'Llama 3.3 파라미터' },
    ],
    links: [
      { label: 'Live', url: 'https://www.ssafy-study.site/' },
      { label: 'GitHub', url: 'https://github.com/k-haechan/study_backend' },
    ],
    overview: '유튜브 강의형 학습 콘텐츠에 더해, <strong>AI가 학습 글을 기반으로 퀴즈를 자동 생성</strong>하고 SSE로 실시간 알림을 제공해 스터디 효율을 높이는 것이 목표였습니다. SSAFY 스터디원 <strong>20명이 실제로 사용</strong>하는 서비스입니다.',
    problems: [
      {
        tag: '생산성',
        title: '퀴즈 수작업 출제 부담 → LLM 기반 자동 생성·채점',
        problem: '학습 글마다 퀴즈를 사람이 만들면 운영 부담이 큽니다.',
        solution: '<code>GroqClient</code>로 <strong>Llama 3.3-70B</strong>를 호출, 포스트 본문 → 객관식 퀴즈 <strong>자동 생성</strong>. <code>Quiz/QuizQuestion/QuizOption/QuizAttempt</code>로 문제·보기·응시·채점 결과를 정규화하고 제출 시 <strong>서버 자동 채점</strong> + 시도 이력 조회를 제공. LLM을 단순 챗봇이 아닌 <strong>"콘텐츠 → 구조화된 학습 데이터" 변환 파이프라인</strong>으로 활용했습니다.',
      },
      {
        tag: '비용·정합성',
        title: 'S3 고아 이미지 누적 → 상태 추적 + 정리 스케줄러',
        problem: 'Presigned URL로 업로드했지만 게시물에 연결되지 않은 이미지가 스토리지에 남아 비용·정합성 문제가 발생했습니다.',
        solution: '<code>ImageStatus</code>로 이미지 상태(임시/확정)를 추적하고, <code>ImageCleanupScheduler</code>로 <strong>고아 이미지를 주기적으로 정리</strong>했습니다.',
      },
      {
        tag: '결합도',
        title: '알림 로직 강결합 → 이벤트 기반 비동기 구조',
        problem: '알림 생성과 전송이 도메인에 강하게 묶이면 확장·유지보수가 어렵습니다.',
        solution: '<code>NotificationCreatedEvent → EventListener → PushService</code>의 <strong>Spring 이벤트 기반 비동기 알림</strong>으로 생성/전송을 디커플링. <code>EmitterRepository</code>로 SSE 연결을 관리하고 읽음 처리를 분리했습니다.',
      },
    ],
    rationale: [
      { tech: 'Groq (Llama 3.3-70B)', reason: '빠른 추론 속도의 LLM API로, <strong>실시간성에 가까운 퀴즈 생성 UX</strong>를 확보.' },
      { tech: 'SSE (이벤트 기반)', reason: '알림은 단방향 푸시면 충분 → SSE로 경량 구현, Spring <code>ApplicationEvent</code>로 결합도 최소화.' },
      { tech: '역할 기반 권한 분리', reason: '일반/관리자 API를 <code>MemberRole</code> 기반으로 분리하고, <code>GlobalExceptionHandler</code> + 공통 응답(<code>ApiResponse</code>)으로 <strong>일관된 에러 포맷</strong> 제공.' },
    ],
    stack: ['Java 21', 'Spring Boot 4.0.3', 'Spring Security', 'JWT', 'MySQL', 'Redis', 'Flyway', 'Groq API (Llama 3.3-70B)', 'AWS S3', 'SSE', 'SpringDoc'],
  },

  {
    id: 'cotree',
    index: '/ 03',
    cover: COVERS.cotree,
    name: 'Cotree',
    sub: '교육 플랫폼 — 회원·인증 도메인 & 성능 최적화',
    type: '팀 5인',
    period: '2025.03 — 2025.05',
    tagline: '인프런과 유사한 교육 플랫폼. 안정적인 인증·보안 환경과 성능 최적화에 중점을 두었으며, 회원/인증 도메인을 전담하고 리뷰 조회 성능을 직접 개선했습니다.',
    stackMini: 'Spring Boot · JWT · OAuth2 · QueryDSL',
    metrics: [
      { val: '2배+', lab: '리뷰 조회 응답 개선' },
      { val: '783ms', lab: '개선 전 평균 응답' },
      { val: '20 / 162', lab: '본인 커밋 / 팀 전체' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/k-haechan/WEB3_4_SsamMuDan_BE' },
    ],
    overview: '강의 콘텐츠·학습 자료·리뷰 기능을 제공하는 교육 플랫폼에서 <strong>회원/인증 도메인을 전담</strong>했습니다. 다인원 팀의 PR·이슈 기반 협업으로 도메인 경계를 나눠 개발하고, <strong>"측정 → 병목 분석(EXPLAIN) → 인덱스 설계 → 재측정"의 데이터 기반 성능 개선 사이클</strong>을 경험했습니다.',
    problems: [
      {
        tag: '성능',
        title: '리뷰 조회 지연 → 복합 인덱스 직접 설계 (코드 검증됨)',
        problem: '테크북 조회 API 평균 응답 <strong>783ms</strong>로 P95 기준(500ms)을 초과. 원인은 리뷰 목록의 <strong>정렬 풀스캔 + N+1</strong>(JMeter·Prometheus·Grafana로 측정, EXPLAIN으로 병목 확인).',
        solution: '리뷰 조회 쿼리 패턴(<code>WHERE type=? AND item=? ORDER BY created_at DESC</code>)에 정확히 맞춘 <strong>복합 인덱스를 직접 설계·적용</strong>. 인덱스 컬럼 순서가 필터(2개)+정렬과 일치해 Full Scan을 회피 → <strong>응답 속도 2배 이상 개선</strong>.',
        code: `<span class="c-comment">-- V3.1__create_review_index.sql (commit #263, 본인 작성)</span>
<span class="c-key">CREATE INDEX</span> idx_type_item_created_at
    <span class="c-key">ON</span> techEducation_review (
        tech_education_type_id, item_id, created_at <span class="c-key">DESC</span>
    );`,
      },
      {
        tag: '보안',
        title: '인증 상태 관리 → JWT stateless + 토큰 블랙리스트',
        problem: '세션 기반은 서버 부하·확장성 한계가 있고, 로그아웃된 토큰의 무효화도 필요합니다.',
        solution: '<code>JwtAuthenticationFilter</code> · <code>AccessTokenService</code> · <code>TokenBlacklistService</code>로 <strong>stateless 인증</strong>과 <strong>로그아웃 토큰 블랙리스트</strong>를 직접 구현했습니다.',
      },
      {
        tag: 'UX',
        title: '가입 진입장벽·응답 지연 → 카카오 OAuth + 이메일 비동기',
        problem: '가입 접근성이 낮고, 이메일 인증 전송이 응답을 지연시켰습니다.',
        solution: '카카오 OAuth 2.0 연동으로 가입 접근성을 개선하고, 이메일 인증 회원가입에서 <strong>이메일 전송을 비동기 처리</strong>해 가입 응답 지연을 제거했습니다.',
      },
    ],
    rationale: [
      { tech: '복합 인덱스', reason: '쿼리의 WHERE+ORDER BY와 1:1로 매칭해야 인덱스 정렬을 그대로 활용하고 filesort/풀스캔을 피할 수 있음 → <strong>컬럼 순서를 의도적으로 설계</strong>.' },
      { tech: 'JWT + 블랙리스트', reason: 'stateless로 서버 세션 부하를 줄이되, <strong>블랙리스트로 로그아웃 보안 공백</strong>을 메움.' },
      { tech: '이메일 비동기', reason: '메일 전송은 느린 I/O → 별도 비동기로 분리해 <strong>사용자 응답 속도를 보호</strong>.' },
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'OAuth2 (Kakao)', 'QueryDSL', 'MySQL', 'Flyway', 'JMeter', 'Prometheus', 'Grafana'],
  },

  {
    id: 'hakku',
    index: '/ 04',
    cover: COVERS.hakku,
    name: 'Hakku 학꾸',
    sub: '결제 서버 · 스토리지 보안 · AI 챗봇',
    type: '팀 프로젝트 (페어프로그래밍)',
    period: '2026.06 — 2026.07',
    tagline: 'AI 퍼스널컬러 커머스 플랫폼. 페어프로그래밍으로 협업하며 백엔드 아키텍처 리뷰와 보안 점검을 맡아, 결제 서버를 설계·구현하고 스토리지 분리의 보안 설계와 AI 챗봇 초기 구축을 이끌었습니다.',
    stackMini: 'Spring Boot 4 · Kafka · 토스페이먼츠 · Go · FastAPI',
    metrics: [
      { val: '22', lab: '결제 도메인 테스트 (TDD)' },
      { val: 'Outbox', lab: '결제 이벤트 유실 0' },
      { val: '6', lab: '폴리글랏 MSA 서비스' },
    ],
    links: [
      { label: 'Live', url: 'https://hakku.rearleg.com/' },
      { label: 'GitHub (fork)', url: 'https://github.com/k-haechan/hakku' },
    ],
    overview: 'AI 퍼스널컬러 진단을 기반으로 꾸미기 아이템을 추천하는 커머스·커뮤니티 플랫폼. Nginx 뒤에 6개 서비스가 독립 실행되는 <strong>폴리글랏 마이크로서비스</strong> 구조입니다. 저는 팀원과 <strong>페어프로그래밍</strong>으로 협업하며 <strong>백엔드 아키텍처 리뷰·보안 취약점 점검</strong>을 맡아, 결제 서버를 설계·구현하고 스토리지 서버 분리의 보안 설계와 AI 챗봇의 뼈대를 이끌었습니다.',
    problems: [
      {
        tag: '신뢰성',
        title: '이중 결제·커밋 실패 갭 → intent-first 멱등 설계',
        problem: '결제 버튼 중복 클릭 시 이중 결제, PG 과금 성공 후 DB 커밋 실패 시 "돈은 빠졌는데 주문은 없는" 갭이 발생할 수 있습니다.',
        solution: '<code>idempotency_key</code> UNIQUE 제약으로 <strong>과금 전 PENDING 의도를 선커밋</strong>(intent-first)하고, 동시 요청의 레이스 패자는 승자 결제를 재조회. PG 호출은 <strong>트랜잭션 밖</strong>에서 수행하고 실패해도 롤백하지 않아, 웹훅/정산이 최종 상태를 확정하도록 <strong>커밋-실패 갭</strong>을 닫았습니다.',
      },
      {
        tag: '신뢰성',
        title: '결제 이벤트 유실 → 트랜잭셔널 Outbox + Kafka 릴레이',
        problem: '결제 완료를 주문·알림 등 다른 서비스로 전달할 때 DB 커밋과 메시지 발행 사이에서 이벤트가 유실될 수 있습니다.',
        solution: '상태 변경과 발행할 이벤트를 <strong>같은 트랜잭션</strong>으로 기록하고, 릴레이 워커가 폴링해 Kafka로 발행(<code>acks=all</code>·멱등 producer). 브로커 ack 후에만 SENT로 전이(at-least-once)하고, 반복 실패 메시지는 <strong>DEAD로 격리(poison isolation)</strong>해 큐 막힘을 방지했습니다.',
      },
      {
        tag: '보안',
        title: '위조 웹훅 → HMAC-SHA256 상수시간 서명검증',
        problem: 'PG 웹훅은 "결제 성공"을 통보하는데, 위조된 요청이 결제를 무단 확정시킬 수 있습니다.',
        solution: 'raw 본문의 <strong>HMAC-SHA256</strong>을 공유 비밀키로 계산해 헤더값과 <strong>상수시간 비교</strong>(타이밍 공격 방지). 32바이트 미만의 약한 키는 부팅 시 fail-fast로 차단했습니다.',
      },
      {
        tag: '아키텍처·보안',
        title: '스토리지 서버 분리 → Go 네이티브 + JWT 접근제어',
        problem: '이미지 I/O를 별도 서비스로 분리하면 접근 제어가 네트워크 경계 밖으로 노출되고, 퍼스널컬러 결과 이미지가 URL만으로 유출될 수 있습니다.',
        solution: 'I/O 중심 특성상 <strong>Go 표준 라이브러리 네이티브 서버</strong>가 적합하다고 판단(팀이 Spring 대조군과 벤치마크로 검증). result 이미지는 <strong>Bearer JWT(HS256) + 업로더 본인</strong>만 접근하도록 소유자 검증하고, <code>JWT_SECRET</code> 미설정 시 무인증 공개를 막기 위해 <strong>기동을 중단</strong>하도록 설계했습니다.',
      },
    ],
    rationale: [
      { tech: '트랜잭셔널 Outbox', reason: '결제 상태와 이벤트를 한 트랜잭션으로 묶어 <strong>원자적으로 기록</strong> → 릴레이가 at-least-once로 발행하고 소비자는 멱등 처리해 유실·중복을 모두 방어.' },
      { tech: 'intent-first + 낙관적 락', reason: 'PG 호출 전 의도를 선커밋해 이중 결제를 구조적으로 차단하고, 동기/웹훅 동시 정산은 <code>@Version</code> 낙관적 락 + 1회 재시도로 <strong>멱등 no-op</strong> 확정.' },
      { tech: '토스 orderId = 멱등키', reason: '서버가 생성한 <code>orderId</code>를 멱등키로 그대로 사용 → 클라이언트 멱등키 충돌·이중 INSERT 레이스가 구조적으로 제거됨.' },
      { tech: 'Go (스토리지)', reason: '이미지 바이트 전달은 CPU보다 I/O 중심 → JVM보다 가벼운 <strong>Go 네이티브</strong>가 적합. 팀 벤치마크로 선택을 검증.' },
    ],
    stack: ['Java 17', 'Spring Boot 4.0', 'Spring Security', 'Spring Data JPA', 'Kafka (KRaft)', 'Flyway', 'JJWT', '토스페이먼츠', 'PostgreSQL', 'Redis', 'Go', 'FastAPI', 'OpenAI', 'Vue 3', 'Docker', 'Nginx'],
  },
];
