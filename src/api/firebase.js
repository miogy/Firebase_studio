import { initializeApp } from "firebase/app";
//1-1.firebase 프로젝트 설정
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//2-1.Authentication=>문서이동=>빌드=>인증=>Web=>google

//1-2.프로젝트 설정에서 가져오기
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, //시크릿키 숨기기
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
//1-3.초기화
const auth = getAuth();
//2-2.Authentication=>문서이동=>빌드=>인증=>Web=>google가져오기
const provider = new GoogleAuthProvider();
//2-3.Authentication=>문서이동=>빌드=>인증=>Web=>google가져오기

//firebase안에서 로그인기능을 만들어준다.
export function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch(console.error);
}

// 사용자가 로그인할때 필요한 함수=>
// signInWithPopup(auth, provider)
//   .then((result) => {
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;

//     const user = result.user;
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     const email = error.customData.email;
//     const credential = GoogleAuthProvider.credentialFromError(error);
//   });
//2-2.Authentication=>문서이동=>빌드=>인증=>Web=>google가져오기
