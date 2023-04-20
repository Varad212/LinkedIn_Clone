import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { postArticleAPI } from "./actions";
import firebase from 'firebase/compat/app';


const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [VideoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const iamge = e.target.files[0];

    if (iamge === "" || iamge === undefined) {
      alert(`not an image, the file is a ${typeof iamge}`);
      return;
    }
    setShareImage(iamge);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e)=>{
    e.preventDefault();

    if(e.target !== e.currentTarget){
        return;
    }

    const payload ={
         image:shareImage,
         video:VideoLink,
         user:props.user,
         description:editorText,
         timestamp:firebase.firestore.Timestamp.now(),
    }
    props.postArticle(payload);
    reset(e);
  }

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {" "}
      {/*For closing modal*/}
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              {" "}
              {/*Creating header component with some text and close button*/}
              <h2>Create a Post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="/Images/close.png" alt=" " />
              </button>
            </Header>

            <SharedContent>
              {/*Username and image component*/}
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="/Images/user.svg" alt=" " />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                {" "}
                {/*Text area to type */}
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif ,image/jpeg , image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={VideoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {VideoLink && (
                        <ReactPlayer width={"100%"} url={VideoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>

            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  {" "}
                  {/*Imaage and other buttons*/}
                  <img src="/Images/download (1).png" alt=" " />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/Images/images.jpg" alt=" " />
                </AssetButton>
              </AttachAssets>
              <SharedComment>
                <AssetButton>
                  <img src="/Images/comment.png" alt=" " />
                  Anyone
                </AssetButton>
              </SharedComment>

              <PostButton disabled={!editorText ? true : false} onClick={(e)=> postArticle(e)}>
                {" "}
                {/*Post button*/}
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  //Main container styles
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fade-in 0.5s;
`;

const Content = styled.div`
  //
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initital;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  //Header component styles
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color:rgba(0, 0, 0, 0.15) svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  //Username and button style
  display: flex;
  align-items: center;
  padding: 12px 24px;

  svg,
  img {
    width: 35px;
    height: 35px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5%;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  //Image and other button style
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;

  ${AssetButton} {
    width: 48px;
  }
`;

const SharedComment = styled.div`
  //Comment button style
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  //Post button style
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};

  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;

const Editor = styled.div`
  //Textarea component style
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
    postArticle : (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
