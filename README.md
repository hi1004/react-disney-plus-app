# 🎦 React Disney Plus App-Clone 

## [DEMO - DISNEY PLUS APP](https://react-disney-plus-app-e1dbc.web.app/)
- **Google**アカウントでログインできます。

## 1. プロジェクト紹介

![LOGIN](https://user-images.githubusercontent.com/80688093/225328347-98696023-a454-49f6-8564-973a8c125a6e.png)


### 📌 概要
> [Disney Plus](https://www.disneyplus.com/)サイトを参考にしました。

> [TMDB(The Movie Database) API](https://www.themoviedb.org/)を使ってDisney Plusをクーロンコーディングし、リニューアルしたレスポンシブ対応Webアプリケーションです。

> 今まで検索映画情報サイトを何回か作ってきましたが、勉強してきたReact.jsでSPAを実装し、Firbaseでログイン機能やGithub Actionでデプロイしたことは初めてでした。

> なるべくReactのhooksを活用するようにしたり、styled componentsでUI/UXに取り組んだりすぐにでも実務に活かせるようにしました。

> 一人で開発を行ったので試行錯誤はたくさんありましたが、課題に直面した時も諦めず最後まで頑張りました。

<br/>

## 2. 開発環境

### 2.1 技術

| フロントエンド | バックエンド | バージョン、イシュー管理 |           
| --- | --- | --- |
| <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <br><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"><br> | <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"><br> <img src="https://img.shields.io/badge/The Movie Database-01B4E4?style=for-the-badge&logo=The Movie Database&logoColor=white"> | <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"><br/><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"> |

### 2.2 パッケージモジュール

<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white"> <img src="https://img.shields.io/badge/Create_React_App-09D3AC?style=for-the-badge&logo=Create React App&logoColor=white"><br/><img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"><br/> <img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=Swiper&logoColor=white">

<br/>

## 3. コア機能

<details>
  <summary>
    📌 LoginPage(ログイン)    
  </summary>

  ![login](https://user-images.githubusercontent.com/80688093/225330270-efb12a79-2fe8-4274-b267-bc399c637b7d.gif)
  
- Firebaseでログイン/ログアウト機能を実装[(Nav.jsx)](https://github.com/hi1004/react-disney-plus-app/blob/main/src/components/Nav.jsx)   
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
      📌 MainPage(映画検索、ジャンル別映画情報、モーダル)
    </summary>

  ![main](https://user-images.githubusercontent.com/80688093/225371912-95a683a6-e86e-4238-a643-32b2632649a2.gif)
  
- 映画検索機能を実装 [Nav.jsx](https://github.com/hi1004/react-disney-plus-app/blob/main/src/components/Nav.jsx)
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
- `Youtube Iframe`で予告動画の導入した`Banner`[Banner.jsx](https://github.com/hi1004/react-disney-plus-app/blob/main/src/components/Banner.jsx)
  1. [usePromise(Custom hook)](https://github.com/hi1004/react-disney-plus-app/blob/main/src/hooks/usePromise.js)を作り、`axios`で映画の動画があるデータをランダムに得られるようにしました。[[参照](https://github.com/hi1004/react-disney-plus-app/blob/main/src/components/Banner.jsx#L15-L51)]
  
  2. `setTimeOut`で３秒後に動画が再生できるようにしました。
        ```js
          useEffect(() => {
            setTimeout(() => {
              setIsStart(true);
            }, 3000);
          }, []);
        ```
  3. 動画が終わると`setIsStart`が`false`になり、`BannerHeader`の背景イメージに変わります。[[参照](https://github.com/hi1004/react-disney-plus-app/blob/main/src/components/Banner.jsx#L69-L103)]

  4. loading 実装
      ```js
        if (loading)
         return (
          <BannerHeader>
            <Loding />
          </BannerHeader>
        );
      ``` 
  5. `description`の文字列を100の長さまでにし、余りは`...`に変える`truncate`関数を実装
      ```jsx
      const truncate = (str, n) => {
        return str?.length > n ? `${str.substring(0, n)}...` : str;
      };
      <p className="description">{truncate(movie.overview, 100)}</p>
      ```
      
       
- ジャンル別映画情報([Row.jsx](https://github.com/hi1004/react-disney-plus-app/blob/main/src/components/Row.jsx))
  1. loading中には`skeleton UI`でローディングアニメーションを実装しました。
      ```jsx
        if (loading)
      return (
      <Skeleton>
        <li className="row__poster skeleton">
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
        </li>
      </Skeleton>
      ```
  2. `Swiper.js`のライブラリを使って、スライド機能を実装しました。[[参照]](https://github.com/hi1004/react-disney-plus-app/blob/main/src/components/Row.jsx#L57-L96)

  3. Rowコンポーネントの映画の画像をクリックすると`onClickイベント`が発生し、モーダルが開きます。
      ```jsx
      const [modalOpen, setModalOpen] = useState(false);
      const [movieSelected, setMovieSelected] = useState({});
      const onClickHandler = movie => {
        setModalOpen(true);
        setMovieSelected(movie);
      };

      {modalOpen && (
        <MovieModal {...movieSelected} setMovieModalOpen={setModalOpen} />
      )}
      ```

- モーダル([MovieModal.jsx](https://github.com/hi1004/react-disney-plus-app/blob/main/src/components/MovieModal.jsx))
    1. Bannerと同じく`Youtube Iframe`で予告動画の導入し、音のコントロール機能を追加しました。 [[参照]](https://github.com/hi1004/react-disney-plus-app/blob/main/src/components/MovieModal.jsx#L67-L114)
    2. 動画は0.5秒後に再生します。
        ```js
        useEffect(() => {
          setTimeout(() => {
            setIsStart(true);
          }, 500);
        }, []);
        ```
    3. [useOnClickOutside(Custom hook)](https://github.com/hi1004/react-disney-plus-app/blob/main/src/hooks/useOnClickOutside.js)と`useRef`でモーダルの外をクリックしたらモーダルが消えるようにしました。
        ```jsx
        import useOnClickOutside from '../hooks/useOnClickOutside';
        const modalEl = useRef();
        // RowコンポーネントからもらったsetMovieModalOpenのpropsをfalseに変更
        useOnClickOutside(modalEl, () => setMovieModalOpen(false));
        ```
   

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
  <details>
      <summary>
        2. モーダルを開いた時、動画の音が操作できないイシュー
      </summary>

  ## 🤔 Issue
    - Youtubeの音を直接に操作できない
    - buttonをクリックして操作することができない
  ## ✅ Solution
    -  `useRef` hookを使って`player.current.internalPlayer`に`mute`、`unMuteメソッド`を条件分岐にしたらコントロール操作を解決
        ```jsx
          const [movieSound, setMovieSound] = useState(false);
          const player = useRef();

          <button
            className="youtube__sound-button"
            type="button"
            onClick={() => {
              setMovieSound(!movieSound);
              if (!movieSound) {
                player.current.internalPlayer.unMute();
              } else {
                player.current.internalPlayer.mute();
              }
            }}
          >
            {!movieSound ? (
              <VscMute className="sound-icon" />
            ) : (
              <VscUnmute className="sound-icon" />
            )}
          </button>
        ```
  </details>
</details>
<details>
  <summary>
    📌 SearchPage(QueryStringを活用した検索) 
  </summary>

  ![search](https://user-images.githubusercontent.com/80688093/225338155-851cc3e4-9fde-4b45-89cf-d4e205fd5588.gif)

  
- `QueryString`を活用した検索[(SearchPage.jsx)](https://github.com/hi1004/react-disney-plus-app/blob/main/src/pages/SearchPage.jsx)
    1. `MainPage`から`input`に検索した`value`が`useQuery`の`q`である`searchTerm`がアップデートされます。その後`fetchSearchMovie`を実行すると、`setSearchResults`にデータが入りページが動的に動くようになります。
        ```jsx
        const [searchResults, setSearchResults] = useState([]);
        const useQuery = () => {
          return new URLSearchParams(useLocation().search);
        };
        const query = useQuery();
        const searchTerm = query.get('q');
        const fetchSearchMovie = async searchText => {
          try {
            const response = await axios.get(
              `/search/multi?include_adult=false&query=${searchText}`,
            );
            setSearchResults(response.data.results);
          } catch (e) {
            throw new Error(e);
          }
        };
        ```
    2. [useDebounce(Cusotm hooks)](https://github.com/hi1004/react-disney-plus-app/blob/main/src/hooks/useDebounce.js)を作って検索している間はAPIの要請を制限し、アプリケーションの性能を高めました。
        ```jsx
        const debouncedSearchTerm = useDebounce(searchTerm, 500);
        useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
          }
        }, [debouncedSearchTerm]);
        ```
</details>
<details>
  <summary>
    📌 DetailPage(詳細映画ページ) 
  </summary>
  
- 詳細映画ページ[(DetailPage.jsx)](https://github.com/hi1004/react-disney-plus-app/blob/main/src/pages/DetailPage.jsx)
    1. SearchPageからのデータで詳細映画ページへ移動します。そこでは映画ポスターやタイトル、発売日が現れますが、情報がない場合404ページのイメージに変えました。
        ```jsx
        import error404 from '../assets/images/404_error.png';
        <h2>{movie.title || movie.original_title}</h2>
        <p>{movie?.release_date}</p>
        {!error && movie.backdrop_path !== undefined && (
          <img
            src={
              movie?.backdrop_path !== null
                ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
                : error404
            }
            alt={movie.title}
          />
        )}
        {error && <div className="error" />}
        ```
</details>
