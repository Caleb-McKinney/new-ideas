import '../styles/main.scss';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tweetInput = document.getElementById('tweet-input');
const tweetButton = document.getElementById('tweet-button');
const tweetList = document.getElementById('tweet-list');

const loadTweets = async () => {
  tweetList.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, 'tweets'));
  querySnapshot.forEach((doc) => {
    const tweet = document.createElement('div');
    tweet.className = 'tweet';
    tweet.textContent = doc.data().content;
    tweetList.appendChild(tweet);
  });
};

tweetButton.addEventListener('click', async () => {
  const tweetContent = tweetInput.value;
  if (tweetContent) {
    await addDoc(collection(db, 'tweets'), { content: tweetContent });
    tweetInput.value = '';
    loadTweets();
  }
});

loadTweets();
