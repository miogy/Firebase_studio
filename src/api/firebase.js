import { initializeApp } from "firebase/app";
//1-1.firebase 프로젝트 설정
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
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
//2-2. 로그인 로그아웃 & 상태관리
const provider = new GoogleAuthProvider();
//2-3.Authentication=>문서이동=>빌드=>인증=>Web=>google가져오기

//3. signInWithPopup import => login()생성
export async function login() {
  //async:비동기함수
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      return user;
    })
    .catch(console.error);
}

//4. signOut import => logout()생성
export async function logout() {
  return signOut(auth).then(() => null);
}

//5. login과 logout 상태관리
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
