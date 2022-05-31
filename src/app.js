import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

// const FAKE_IMAGES = [
//   "https://picsum.photos/id/232/200/300",
//   "https://picsum.photos/id/233/200/300",
//   "https://picsum.photos/id/234/200/300",
//   "https://picsum.photos/id/235/200/300",
//   "https://picsum.photos/id/236/200/300",
//   "https://picsum.photos/id/237/200/300",
//   "https://picsum.photos/id/238/200/300",
// ];

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
      address,
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

  const displayNFT = (images) => {
    return images.map((image, i) => (
      <div className="col col-md-4" key={i}>
        <div
          className="card"
          style={{ justifyContent: "center", display: "flex", width: "100px" }}
        >
          <img
            className="card-top-img"
            alt="Card image cap"
            id={`crd${i}`}
            src={image}
            style={{ height: "100px", width: "100px", objectFit: "contain" }}
          />
        </div>
      </div>
    ));
  };

  const changecolor = (color) => {
    // action here
  };

  const removebackground = () => {};

  const changesize = (size) => {
    // action here
  };

  return (
    <div className="main">
      <section>
        <div className="Container">
          <div className="Canvas">
            <div id="Clothing" className="Clothing">
              <div className="NFT">
                <img src="" alt="design" id="design" />
              </div>
            </div>
            <img src="" alt="design2" id="design2" />
            <div className="Foreground"></div>
            <div className="Clothing Clothing2"></div>
          </div>
        </div>
      </section>

      <section>
        <div className="ContainerRight">
          <div className="NFT-List">
            <div className="row" id="app"></div>
          </div>

          <h2>Fetching NFTs is not a transcation and does not consume gas</h2>

          <div className="buttons">
            {isAuthenticated ? (
              <button
                className="slide_from_left"
                id="btn-logout"
                onClick={logOut}
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={login}
                className="slide_from_left"
                id="btn-login"
              >
                Fetch NFTs
              </button>
            )}
          </div>

          <div className="fts-list">
            <div className="row">{displayNFT(cards)}</div>
          </div>
        </div>
      </section>

      <section>
        <div className="ContainerRight">
          <div className="NFT-List">
            <div className="row" id="app" />
          </div>
          <h2>Fetching NFTs is not a transcation and does not consume gas</h2>
          <div className="buttons">
            <button
              className="slide_from_left"
              id="btn-logout"
              style={{ visibility: "hidden" }}
            >
              Log Out
            </button>
            <button className="slide_from_left" id="btn-login">
              Fetch NFTs
            </button>
          </div>
          <div className="orderform">
            <div className="colors">
              <button
                onClick={changecolor("#171717")}
                style={{ backgroundColor: "#171717" }}
              />
              <button
                onClick={changecolor("#ffffff")}
                style={{ backgroundColor: "white" }}
              />
              <button
                onClick={changecolor("#000080")}
                style={{ backgroundColor: "#000080" }}
              />
              <button
                onClick={changecolor("#36454F")}
                style={{ backgroundColor: "#36454F" }}
              />
              <button
                onClick={changecolor("#b11226")}
                style={{ backgroundColor: "#b11226" }}
              />
              <button
                onClick={changecolor("#43755a")}
                style={{ backgroundColor: "#43755a" }}
              />
            </div>
            <div className="options">
              <h2>- Bespoke -</h2>
              <div className="options-bg">
                <button onClick={removebackground()} className="options-button">
                  Remove Background{" "}
                </button>
                <i className="material-icons">
                  error
                  <div className="tooltiptext">
                    Experimental, resulting quality may be affected
                  </div>
                </i>
              </div>
              <div className="options-bg" style={{ display: "flex" }}>
                <button
                  id="addbg"
                  className="options-button"
                  style={{ maxWidth: "90%" }}
                  value={0}
                >
                  Add Backdrop
                </button>
                <div className="colors" id="invertbg" value={0}>
                  <button
                    id="btninvert"
                    style={{
                      background: "black",
                      margin: "0 20px 0 0",
                      height: 40,
                      width: 40,
                    }}
                  />
                </div>
              </div>
              <div className="options-full">
                <button id="fullsize" value={0} className="options-button">
                  Normal Scale
                </button>
                <i className="material-icons">
                  error
                  <div className="tooltiptext">
                    Background is automatically removed for the full scale
                    option
                  </div>
                </i>
              </div>
            </div>
            <div className="finalize">
              <div className="size">
                <h2 id="h2size">Size </h2>
                <input id="toggle" type="checkbox" defaultChecked="" />
                <ul>
                  <li>
                    <a onClick={changesize("small")}>Small</a>
                  </li>
                  <li>
                    <a onClick={changesize("medium")}>Medium</a>
                  </li>
                  <li>
                    <a onClick={changesize("large")}>Large</a>
                  </li>
                  <li>
                    <a onClick={changesize("xlarge")}>X Large</a>
                  </li>
                </ul>
              </div>
              <span style={{ width: 30 }} />
              <button className="options-button" id="submitorder">
                Add to Cart
              </button>
            </div>
            <p id="price">$49.99 (VAT Included)</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
