import styled from "styled-components";
import PostModal from "./PostModal";
import { useState } from "react";
import {connect} from "react-redux";
import { useEffect } from "react";
import { getArticlesAPI } from "./actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() =>{
    props.getArticles();
  },[]);

  {
    /*For opening a modal*/
  }
  const handleCick = (e) => {
    e.preventDefault();

    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  return (
    <>
    {
        props.articles.length === 0 ?
        <p>There are no articles.</p>
        :
    <Container>
      <ShareBox>
        <div>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} />
          ) : (
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhIIBxAWFRIXGR0PDhgXEA8WFRIVIBIWGBUXIhYZHSggJBolIBUVITEtJSk3Li4uIR8zODssNyg5LisBCgoKDQ0NEQ0PDisZExkrKysrKysrKysrKysrKzcrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABQYIBwQDAf/EAD0QAAIBAgMDCQQIBgMBAAAAAAABAgMEBQYRIUGBBxITMVFhcZTRFiIyVCM0QlJykbHBFIKhosLSJFOTFf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHmvby3sbaVzeTjCEdspSkoxS8WB6T8OVZj5YLahJ0cv0ekfV0lTWNPxUPifHQouIcoear5+9dygtypRhBLilr/UYa0gDLvtVmLnc7+OuPMVfUksP5Q81WL927lNb1VjCafFrX+owaQBynLvLBbV5KjmCj0b6ukp86UOMPiXDU6bZXlvfW0bmznGcJbYyjJSi14oD0gAAAAAAAAAAAAAAAAAAAAAAAi8wY1ZYBhk8QxCWkI7FptlOT6opb2zPOb824jmq96S7fNpJ60aSfuQXa/vT73w0JHlOzTPMWPSpW8v+PRbp0duyUuqdTi9i7l3lOLEoACoAAAWDKGbcRyre9JaPnUm9a1Jv3JrtX3Z9646lfAGpsv41ZY/hkMQw+WsJbHrslCS64tbmiUM7cmOaJ5dx6NK4l/x6zVOv2Rl1QqcHsfc+40SZaAAAAAAAAAAAAAAAAAAAKxyj4u8FyfcXFJ6TkugpPslP3deC1fAs5y7l4uJQwa1tl1Squb7+bTf+4HFupaIAGmQAAAAAAADRPYzSfJxi7xrJ9vc1XrOK6Cr3yh7uvFaPiZsO08g9xKeDXVs+qNVTXdzqa/0JVjqIAIoAAAAAAAAAAAAAAAAcq5e6UpYbaVl1KpOL409f8DqpTOVjDJYnkuq6a1lSauY9ukfj/tcwM8AA0yAAAAAAAAHZeQSlKOG3dZ9TqQiuFPX/ADONGh+SfDJYZkuk6i0lVbuZdukvg/tUCVYuYAIoAAAAAAAAAAAAAAAAfOpThVpuFRappxkn1NPrR9ABmTO+XamWcfnZNPo379vLdKk3sXiup+HeQBpXOuVrXNeEu1qvm1Y6yoVNNXCXf2wfU1+6M74zhN9guISscSg4zjxUlulF70+0sSvEACoAAAAe3BsJvsaxCNjhsHKcuCit8pPcl2gSWScu1cy4/CySfRrSdw/u0k9q8X1Lx7jS9OnClBQprRJKMUupJdSK9krK1rlTCVa0nzqstJV6mmjnLu7ILqS/dllMtAAAAAAAAAAAAAAAAAAAAAAQuY8uYZmKz/h8Up87TVwktk6b7Yy3fo95LVJxpwc6jSS2tt6JLxKPj3Knl/C6ro2rlcST0l0XN5ke36R7Hw1AoeYuSfGcPk6mEtXFPrSXNjVS74vZLg+BRr3D72wqdHf0alN7+fTnH9UaKwPPWXcbSVrcRjN/YqPo5ru0ex8GyxyUKsNHo0+7VMupjJHOj2r8z1WWH3t/PmWFGpUe7mU5y/RGpv8A5thzud0FPXt6OGv6H3ioUoaLRJd2iQ0xwvLvJRjOISVTF2ren1tPmyqtd0VsjxfA69lzLuGZds/4fC6fN10c5PbOb7ZS3/otx4scz1l3BE1c3EZTX2Kb6Sb7tFsXFoisB5U8v4pV6G6creWukelS5kuz6RbFx0Iq+A+dOcKkFOm009qaeqa8T6AAAAAAAAAAAAAAAAAAAAK/mrNWG5Xsunv5ayevRU47alR9y3Ltb2I+Wdc1WuVMKdxV96rLWNvT10c5dr7ILe/3ZnbF8UvMZxCd/iM3KpJ7XuS3RityW5ATGbM64vmeq1dT5lH7NKDkoL8X333vgkVsA0yNJrRnts8VxGw+pXFWn+CtVivyT0PEAJz2wzLp9fuP/aZH3mK4jf8A124q1Px1qsl+Teh4wASSWiAAFkynnTF8sVVG1nz6P26U3Jwf4fuvvXFM7tlTNWG5osunsJaSWnS05bKlN963rsa2MzKezB8UvMGxCF/h03GpF7Hukt8ZLenvRMXWrgVrJWarXNeFK5pe7UjpGvT11cJdq7YPc/3RZSKAAAAAAAAAAAAAB5sQvKGHWU7y6lzYQi5zfYkj0nJuXDH3SoUsBt3tn9PcbfsJ/Rxfi03/ACoDm+bMwXOZManiFzsXw0YN7KdNdUfHe+9shgDTIAAAAAAAAAAAAAmcp5gustY1DEbbVr4a0NdlSm+uPjvXejTGH3lDEbKF5ay50JxU4PtTRk47DyH5gdS3q4DcP4Na9vt+w39JFeDaf8zIrrIAIoAAAAAAAAAABmHO2KvGc1XN7rrFzcKf4Ie7D9NeJo3H7p2GB3F2n8FKc14qDaMqrXTbxLEr9ABUAAAAAAAAAAAAAAnMk4o8HzTbXuukVNQqfgn7s/6PXgQZ+PXTZwA12COwC6d9gdvdv7dKFR+LgmyRMtAAAAAAAAAAArnKHNxyRetf9Ml+ewzQ+s0zn63rXWTruhbQlKcqbUIxi5Sk9mxJdZn15YzBr9RufL1fQsSogEt7L5g+RufL1fQey+YPkbny9X0AiQS3svmD5G58vV9B7L5g+RufL1fQCJBLey+YPkbny9X0HsvmD5G58vV9AIkEt7L5g+RufL1fQey+YPkbny9X0AiQS3svmD5G58vV9B7L5g+RufL1fQCJBLey+YPkbny9X0HsvmD5G58vV9AIkLrJb2XzB8jc+Xq+gWWMwa/Ubny9X0A0DyeTcskWUn/0xX5bCxleyDb1rXJ1pQuYShONJKcZKUZRe3Y0+osJFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="
              alt=" "
            />
          )}
          <button onClick={handleCick} disabled={props.loading ? true : false}>
            Start a Post
          </button>
        </div>
        <div>
          <button>
            {" "}
            {/*Add Photo*/}
            <img src="/Images/download (1).png" alt="" />
            <span>Photo</span>
          </button>

          <button>
            {" "}
            {/*Add Video*/}
            <img src="/Images/images.jpg" alt="" />
            <span>Video</span>
          </button>

          <button>
            {" "}
            {/*Add Event*/}
            <img src="/Images/event.png" alt=" " />
            <span>Event</span>
          </button>

          <button>
            {" "}
            {/*Add Article*/}
            <img src="/Images/article.png" alt=" " />
            <span>write Article</span>
          </button>
        </div>
      </ShareBox>
      <Content>
        {
            props.loading && <img src="/Images/spin.svg" />
        }

        {props.articles.length > 0 && 
        props.articles.map((article,key)=>(
        
        <Article key={key}>
          {" "}
          {/*Article Component*/}
          <SharedActor>
            <a>
              <img  src={article.actor.image} />
              <div>
                <span>{article.actor.title}</span>
                <span>{article.actor.description}</span>
                <span>{article.actor.date.toDate().toLocaleDateString()}</span>
              </div>
            </a>
            <button>
              <img src="/Images/dotss.png" alt="" />
            </button>
          </SharedActor>
          <Description>{article.description}</Description>
          <SharedImage>
            <a>
              {!article.sharedImg && article.video ? 
                <ReactPlayer width={'100%'} url={article.video}/>
               :
              (
                article.sharedImg && <img src={article.sharedImg}/>
              )}
            </a>
          </SharedImage>

          <SocialCounts>
            <li>
              <button>
                <img src="/Images/like.jpg" alt=" " />
                <img src="/Images/reaction.png" alt=" " />
                <span>75</span>
              </button>
            </li>
            <li>
              <a>{article.Comments}</a>
            </li>
          </SocialCounts>
          <SocialActions>
            <button>
              <img src="/Images/like.jpg" alt=" " />
              <span>Like</span>
            </button>
            <button>
              <img src="/Images/comment.png" alt=" " />
              <span>Comment</span>
            </button>
            <button>
              <img src="/Images/share.png" alt=" " />
              <span>Share</span>
            </button>
            <button>
              <img src="/Images/send.png" alt="" />
              <span>Send</span>
            </button>
          </SocialActions>
        </Article>
        ))}
        </Content>
      <PostModal showModal={showModal} handleClick={handleCick} />
    </Container>
    }</>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 0.6), 0 0 0 rgb(0 0 0 0.6);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      //Buttons styles of Photo,video,etc
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      //Start a post style
      display: flex;
      align-items: center;
      padding: 8px 16px 0 px 16px;
      img {
        width: 35px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      //Photo,video,etc section style
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
          cursor: pointer;
        }
        span {
          color: gray;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  //Article component style
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 35px;
      height: 35px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;

        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  //Post description style
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImage = styled.div`
  //Post image style
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  //Social counts style for no of reactions
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
      border:none;
      background-color: white;
    }
  }
`;

const SocialActions = styled.div`
  //Social actions style for like comment button
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    border:none;
    background-color: white;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
    text-align:center;

    &>img{
        width:40px;
    }
`;

const mapsStateToProps = (state)=>{
    return{
        loading: state.articleState.loading,
        user:state.userState.user,
        articles:state.articleState.articles,
    }
};

const mapDispatchToProps = (dispatch)=>({
    getArticles : ()=> dispatch(getArticlesAPI())
});

export default connect(mapsStateToProps,mapDispatchToProps)(Main);
