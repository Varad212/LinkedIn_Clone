import styled from "styled-components";

const Rightside = ()=>{
    return (
    <Container>
        <FollowCard>
    
            <Title>                         {/*Title text and img*/}
                <h2>Add to your feed</h2>
                <img src="/Images/feed-icon.svg" alt=""></img>
            </Title>
    
            <FeedList>                       {/*List of text and button*/}
                <li>
                    <a>
                        <Avatar />
                    </a>
                    <div>
                        <span>#LinkedIn</span>
                        <button>Follow</button>
                    </div>
                </li>
                <li>
                    <a>
                        <Avatar />
                    </a>
                    <div>
                        <span>#Video</span>
                        <button>Follow</button>
                    </div>
                </li>
            </FeedList>

            <Recommendation>                   {/*Recommendation text and img*/}
                View all recommendations
                <img src="/Images/right-icon.svg" alt="" />
            </Recommendation>
        </FollowCard>

        <BannerCard>                            {/*Banner with a img*/}
            <img src="data:image/png;base64,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" alt="" />
        </BannerCard>
    </Container>
    );
}

const Container = styled.div`
  grid-area: rightside;
`;

const FollowCard = styled.div`      //1st Card styles
 text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`           //Add to ur feed styles
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;

const FeedList = styled.ul`         //List pf feeds (linkedin,videos) styles
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }
    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

const Avatar = styled.div`              //#img styles
 background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;

const Recommendation = styled.a`        //View recommendation style
 color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const BannerCard = styled(FollowCard)`      //LinkedIn jobs img styles
 img {
    width: 50%;
    height: 50%;
  }
`;

export default Rightside;