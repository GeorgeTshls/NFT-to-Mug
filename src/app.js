import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Button, Row, Col } from 'reactstrap';
import mug from './mug1.png';

function App() {
  const [cards, setCards] = useState([]);
  const { authenticate, logout, isAuthenticated, user, account } = useMoralis();
  const Web3Api = useMoralisWeb3Api();


  useEffect(() => {
    if (isAuthenticated) {
      const address = user.get("ethAddress");
      if (address) {
        fetchnftmeta(address);
      }
    }
  }, [isAuthenticated]);

  const logOut = async () => {

    await logout();
  };

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate()
        .then(function (res) {
          const address = res.get("ethAddress");
          if (res) {
            fetchnftmeta(address);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const fetchnftmeta = async (address) => {
    const options = {
      chain: "eth",
      address: "0xa451b2657fecf00d6f2a6b6c8677be956230882a",
    };
    const AccountNFT = await Web3Api.account.getNFTs(options);
    const NFTs = AccountNFT.result;
    // console.log("NFTs: ", NFTs);

    let promises = [];
    for (let i = 0; i < NFTs.length; i++) {
      let datajson = JSON.parse(NFTs[i].metadata);
      if (datajson == null) {
        continue;
      }
      let image = datajson.image;
      let id = NFTs[i].metadata.token_id;

      if (image == undefined) {
        image = datajson.image_url;
      } else {
        if (image.startsWith("ipfs")) {
          image =
            "https://gateway.moralisipfs.com/ipfs/" +
            image.replace("ipfs://", "");
        }
      }

      promises.push(image);
      setCards(promises);
    }
  };

  const [toggle, setToggle] = useState();

  const displayNFT = (images) => {
    return images.map((image, i) => (

      <Col key={i}>
        <div onClick={() => {
          setToggle(image);
        }}
          style={{ justifyContent: "center", display: "flex" }}
        >
          <img
            alt="Card image cap"
            src={image}
            style={{ width: '7vw', height: '7vw', objectFit: 'contain', padding: '5px', borderRadius: '10px' }}
          />
        </div>
      </Col>
    ));
  };



  return (
    <div className="main">
      <Row xs={3} >
        <div className="flexCont">

          <img src={require('./mug1.png').default} className="mugImage" />
          {toggle && <img
            alt="Card image cap"
            src={toggle}
            className='overlay'
          />}
        </div>
        <div className="flexCont">
          <div className="listContainer">
            <Row xs={3} className="listStyle">
              {displayNFT(cards)}
            </Row>
          </div>
          <div className="buttons">
            {isAuthenticated ? (
              <Button className="button"
                onClick={logOut}
              >
                Log Out
              </Button>
            ) : (
              <Button
                onClick={login}
                className="button"
              >
                Fetch NFTs
              </Button>
            )}
          </div>


        </div>
      </Row>
    </div>
  );
}

export default App;
