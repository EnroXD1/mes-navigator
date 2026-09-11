import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  browserLocalPersistence,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB--7qKh2yPXTSpBZJ-u5vOeBizcFhZe_M",
  authDomain: "mes-navigator.firebaseapp.com",
  projectId: "mes-navigator",
  storageBucket: "mes-navigator.firebasestorage.app",
  messagingSenderId: "440672348003",
  appId: "1:440672348003:web:c2ca011500215f28ddd556"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const learning = window.CehZnaniy;

const status = document.querySelector("#cloud-status");
const signedOut = document.querySelector("#cloud-signed-out");
const signedIn = document.querySelector("#cloud-signed-in");
const userLabel = document.querySelector("#cloud-user");
const signInButton = document.querySelector("#cloud-sign-in");
const signOutButton = document.querySelector("#cloud-sign-out");
const syncButton = document.querySelector("#cloud-sync-now");

let currentUser = null;
let stopWatching = null;
let saveTimer = null;
let syncing = false;
let queuedSync = false;
let applyingCloudState = false;
const MIN_SYNC_FEEDBACK_MS = 900;

function setCloudStatus(message, stateName = "ready") {
  status.textContent = message;
  status.dataset.state = stateName;
}

function setSyncButtonBusy(isBusy) {
  syncButton.disabled = isBusy;
  syncButton.dataset.syncing = String(isBusy);
  syncButton.setAttribute("aria-busy", String(isBusy));
  syncButton.textContent = isBusy ? "Синхронизация…" : "Синхронизировать сейчас";
}

function syncedAtMessage() {
  const time = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date());
  return `Готово — прогресс синхронизирован в ${time}.`;
}

function cloudDocument(user = currentUser) {
  return doc(db, "progress", user.uid);
}

function showUser(user) {
  currentUser = user;
  signedOut.hidden = Boolean(user);
  signedIn.hidden = !user;
  userLabel.textContent = user ? (user.displayName || user.email || "Google-аккаунт") : "";
}

function friendlyError(error) {
  const code = String(error?.code || "");
  if (code.includes("popup-closed")) return "Вход отменён. Локальный прогресс не изменён.";
  if (code.includes("popup-blocked")) return "Браузер заблокировал окно входа. Запускаю вход через перенаправление…";
  if (code.includes("network-request-failed") || !navigator.onLine) return "Нет соединения. Прогресс сохранён локально и отправится позже.";
  if (code.includes("permission-denied")) return "Облачное хранилище ещё не разрешило доступ. Используйте резервную копию или повторите позже.";
  return "Не удалось синхронизировать. Локальный прогресс сохранён.";
}

async function writeCurrentState(user = currentUser) {
  if (!user || syncing) {
    if (user) queuedSync = true;
    return;
  }
  const startedAt = Date.now();
  syncing = true;
  setSyncButtonBusy(true);
  setCloudStatus("Синхронизация…", "loading");
  try {
    const reference = cloudDocument(user);
    const remote = await getDoc(reference);
    if (remote.exists() && remote.data()?.state) {
      applyingCloudState = true;
      learning.mergeCloudProgress(remote.data().state);
      applyingCloudState = false;
    }
    await setDoc(reference, {
      schemaVersion: 1,
      state: learning.getState(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    setCloudStatus(syncedAtMessage(), "success");
  } catch (error) {
    applyingCloudState = false;
    setCloudStatus(friendlyError(error), "error");
  } finally {
    const remainingFeedbackTime = MIN_SYNC_FEEDBACK_MS - (Date.now() - startedAt);
    if (remainingFeedbackTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingFeedbackTime));
    }
    syncing = false;
    setSyncButtonBusy(false);
    if (queuedSync) {
      queuedSync = false;
      scheduleSync(250);
    }
  }
}

function scheduleSync(delay = 1200) {
  if (!currentUser || applyingCloudState) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => writeCurrentState(), delay);
}

function watchCloud(user) {
  if (stopWatching) stopWatching();
  stopWatching = onSnapshot(cloudDocument(user), (snapshot) => {
    if (!snapshot.exists() || snapshot.metadata.hasPendingWrites || !snapshot.data()?.state) return;
    const remoteState = snapshot.data().state;
    applyingCloudState = true;
    const mergedState = learning.mergeCloudProgress(remoteState);
    applyingCloudState = false;
    setCloudStatus("Получены свежие данные из Firebase.", "success");
    if (JSON.stringify(mergedState) !== JSON.stringify(remoteState)) scheduleSync(250);
  }, (error) => setCloudStatus(friendlyError(error), "error"));
}

signInButton.addEventListener("click", async () => {
  setCloudStatus("Открываю вход через Google…", "loading");
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    if (String(error?.code || "").includes("popup-blocked")) {
      setCloudStatus(friendlyError(error), "loading");
      await signInWithRedirect(auth, provider);
      return;
    }
    setCloudStatus(friendlyError(error), "error");
  }
});

signOutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    setCloudStatus("Вы вышли. Прогресс продолжает храниться на этом устройстве.");
  } catch (error) {
    setCloudStatus(friendlyError(error), "error");
  }
});

syncButton.addEventListener("click", () => writeCurrentState());
window.addEventListener("ceh-znaniy:state-change", () => scheduleSync());
window.addEventListener("online", () => scheduleSync(100));

try {
  await setPersistence(auth, browserLocalPersistence);
  await getRedirectResult(auth);
  onAuthStateChanged(auth, async (user) => {
    showUser(user);
    if (!user) {
      if (stopWatching) stopWatching();
      stopWatching = null;
      setCloudStatus("Войдите через Google, чтобы связать телефон и компьютер.");
      return;
    }
    watchCloud(user);
    await writeCurrentState(user);
  });
} catch (error) {
  setCloudStatus(friendlyError(error), "error");
}
