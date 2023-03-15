import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAGZsTl5g9atq0MYXvF7TaS2igLNDWR9NQ',
  authDomain: 'react-disney-plus-app-e1dbc.firebaseapp.com',
  projectId: 'react-disney-plus-app-e1dbc',
  storageBucket: 'react-disney-plus-app-e1dbc.appspot.com',
  messagingSenderId: '795267705736',
  appId: '1:795267705736:web:40ea89937d58f791efa83d',
};

const app = initializeApp(firebaseConfig);

export default app;
