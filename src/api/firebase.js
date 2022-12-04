import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

//컴포넌트 내에서 사용할수 있도록 함수로 만들어준다.
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth);
}

//사용자의 상태를 확인
export function onUserStateChange(callback) {
  // onUserStateChange를 호출할때마다 콜백함수를 호출
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

//인가
async function adminUser(user) {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return {
        ...user,
        isAdmin,
      };
    }
    return user;
  });
}

//실시간 등록
export async function addNewProduct(product, imageUrl) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    // price: parseInt(product.price),
    image: imageUrl,
    options: product.options.split(","),
  });
}

export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

//cart
export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)) //사용자id별로 carts를 보관
    .then((snapshot) => {
      const items = snapshot.val() || {}; //snapshot.val()롤 items을 가져오고 없다면 빈 {}
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
