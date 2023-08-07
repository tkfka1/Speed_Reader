src/
|-- App.tsx
|-- index.tsx
|-- components/  # 재사용 가능한 UI 컴포넌트들을 저장하는 폴더
|   |-- Header/
|   |   |-- index.tsx
|   |-- FileList/
|   |   |-- index.tsx
|   |-- TextDisplay/
|   |   |-- index.tsx
|   |-- TextControl/
|   |   |-- index.tsx
|   |-- AddTextModal/
|   |   |-- index.tsx
|-- features/  # 특정 기능을 위한 컴포넌트들을 저장하는 폴더
|   |-- TextDetail/
|   |   |-- TextDetail.tsx
|   |-- TextList/
|   |   |-- TextList.tsx
|-- assets/  # 이미지, 스타일, 폰트 등의 자원을 저장하는 폴더 (필요한 경우)
|-- utils/  # 유틸리티 함수나 공통 로직을 저장하는 폴더 (필요한 경우)


재사용 가능한 컴포넌트 분리: components 폴더에는 재사용 가능한 UI 컴포넌트들을 저장하여 다른 컴포넌트나 페이지에서 쉽게 재사용할 수 있습니다.
기능별 분리: features 폴더는 특정 기능을 위한 컴포넌트들을 저장하는 곳입니다. 이 폴더를 통해 관련된 컴포넌트들을 함께 묶어 관리할 수 있습니다.
확장성: 추후에 프로젝트가 확장될 경우, 새로운 기능이나 컴포넌트를 추가하기 쉽습니다.
