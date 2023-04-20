import { auth, provider, storage } from "../firebase.js";
import db from "../firebase.js";
import { SET_USER,SET_LOADING_STATUS,GET_ARTICLES } from "./actionType.js";

//handling all the action for reducer function

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) =>({
  type: SET_LOADING_STATUS,
  status:status,
})

export const getArticles=(payload)=>({
  type:GET_ARTICLES,
  payload:payload,
});

export function singInAPI() {
  //Function for singing in
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
        console.log(payload.user);
      })
      .catch((err) => console.log(err.message));
  };
}

export function getUserAuth() {
  //Function for getting user authentication
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  //Function for singing out
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function postArticleAPI(payload) {           //Function for adding data to firebase database and storage
  return (dispatch) => {
      dispatch(setLoading(true));


    if (payload.image != "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_change",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress : ${progress}%`);

          if (snapshot.state === "Running") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("article").add({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            Comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false))
        }
      );
    } else if (payload.video) {
      db.collection("article").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        Comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false))
    }
  };
}

export function getArticlesAPI(){
  return (dispatch)=>{
    let payload;

    db.collection('article').orderBy("actor.date","desc")
    .onSnapshot((snapshot)=>{
      payload = snapshot.docs.map((doc)=> doc.data());
      console.log(payload);
      dispatch(getArticles(payload));
    });
  }
}