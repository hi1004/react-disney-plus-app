# React Disney Plus App-Clone

[DEMO](https://react-disney-plus-app-e1dbc.web.app/)

## 1. プロジェクト紹介

### 📌 概要

> - React で News API を連動した`News検索アプリケーション`です。
> - 今まで勉強した内容を生かし、API を使ったレスポンシブ Web アプリケーションです。



## 2. 開発環境

### 2.1 技術

| フロントエンド | バックエンド | バージョン、イシュー管理 |           
| --- | --- | --- |
| <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <br><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"><br> | <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"><br> <img src="https://img.shields.io/badge/The Movie Database-01B4E4?style=for-the-badge&logo=The Movie Database&logoColor=white"> | <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"><br/><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"> |

### 2.2 パッケージモジュール

<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white"> <img src="https://img.shields.io/badge/Create_React_App-09D3AC?style=for-the-badge&logo=Create React App&logoColor=white"><br/><img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"><br/> <img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=Swiper&logoColor=white">

## 3. コア機能

<details>
  <summary>
    📌 LoginPage(ログイン)    
  </summary>
  
- Firebaseでログイン/ログアウト機能を実装(Nav.jsx)   
  1. `styled components`で作成したLogInボタンをクリックすると、`handleAuth`関数が実行されます。
      ```html
      <Login onClick={handleAuth}>ログイン</Login>
      ```
  2. `firebase/auth`から`popup`機能を使うため、`signInWithPopup`を実行します。それから`onAuthStateChanged`でログインしたかしていないかを確認した後、`useNavigate`でページ移動します。
      ```js
      import {
        getAuth,
        GoogleAuthProvider,
        onAuthStateChanged,
        signInWithPopup,
        signOut,
      } from 'firebase/auth';

      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const { pathname } = useLocation();
      const navigate = useNavigate();

      // ログイン後、URL経路のpathが"/"(LogInページ）の場合、useNavigateを使ってメインページへ移動します。
      // そうではない場合(ログアウト)にはログインページへ移動します。
      useEffect(() => {
        onAuthStateChanged(auth, user => {
          if (user) {
            setIsLoggedIn(true);
            if (pathname === '/') {
              navigate('/main');
            }
          } else {
            setIsLoggedIn(false);
            navigate('/');
          }
        });
      }, [auth, navigate]);

      // LogIn
      const handleAuth = () => {
        signInWithPopup(auth, provider)
        .then(result => {
          setUserData(result.user);
        })
        .catch(e => {
          throw new Error(e);
       });
      };

      // LogOut
      const handleSignOut = () => {
        signOut(auth)
        .then(() => {
          setUserData({});
          navigate('/');
        })
        .catch(e => {
          throw new Error(e);
        });
      };
      ```

  ### ⚠️ トラブルシューティング
    <details>
      <summary>
        1. ブラウザを再読み込みしたら、ユーザのデータが消えるイシュー
      </summary>


  ## 🤔 Issue
    - ログイン後、再読み込みしたブラウザにUserImageが消えるイシュー
      ```html
      <UserImg src={userData.photoURL} alt={userData.displayName} />
      ```
  ## ✅ Solution
    - `localStorage`でユーザデータを記録
      ```js
      const handleAuth = () => {
        signInWithPopup(auth, provider)
          .then(result => {
            setUserData(result.user);
            // localStorageをuserDataにセットします。
            localStorage.setItem('userData', JSON.stringify(result.user)); 
          })
          .catch(e => {
            throw new Error(e);
          });
        };

      ```
    - 記録した情報をuseStateで管理
      ```js
      // localStorageにあるuserDataの名前のデータをゲットします。
      const initialUserData = localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData'))
        : {};
      const [userData, setUserData] = useState(initialUserData);    
      ```
    </details>
</details>

<details>
    <summary >
      📌 MainPage（映画検索、ジャンル別映画情報、モーダル）
    </summary>
    
- 映画検索機能を実装 (Nav.jsx)
  1. 検索Iconをクリックすると、`onClickHandler`イベントが発生し、`useRef`で`input要素`をFocusします。
      ```jsx
      <Search>
        <AiOutlineSearch
          className="search__icon"
          onClick={onClickHandler}
        />
        <Input
          className="nav__input"
          value={searchValue}
          type="text"
          placeholder="映画を検索してください。"
          onChange={onChange}
          ref={inputEl}
        />
      </Search>
      ```
  2. inputタグから`onChange`イベントが発生した場合、`searchValue`の値がアップデートされ、`useNavigate`でsearchページへ移動します。
      ```jsx
      const [searchValue, setSearchValue] = useState('');
      const navigate = useNavigate();
      const onClickHandler = () => {
        inputEl.current.focus();
      };

      // 空欄の時はmainページへ移動します。
      // そうではない時はsearchページのqueryStringのkeyであるqに値が入ります。
      const onChange = e => {
        setSearchValue(e.target.value);
        if (e.target.value === '') {
          navigate(`/main`);
          return;
        }
        navigate(`/search?q=${e.target.value}`);
      };
      ```
- `Youtube Iframe`で予告動画の導入した`Banner`
- ジャンル別映画情報とモーダル

  ### ⚠️ トラブルシューティング
    <details>
      <summary>
        1. Mainページで一文字を検索したらinputタグのFocusが解除されるイシュー
      </summary>

  ## 🤔 Issue
    - 検索すると、`useNavigate`により`searchページへ移動`されるが、一文字以上を入力しようとしたら`Focusが解除`されて打てなくなる
    - inputのvalueが消える
  ## ✅ Solution
    - 最初は`Nav.jsx`の`searchValue`stateがまだアップデートされていなかったからだと思ったが、`app.js`のLayoutのNavタグをOutletより下にしたら解決
      ```js
      const Layout = () => {
        // Nav位置変更
        return (
          <Main>
            <div className="containerWrapper">
              <Outlet />
            </div>
            <Nav /> 
            <Footer />
          </Main>
        );
      };
      ```
    </details>
</details>