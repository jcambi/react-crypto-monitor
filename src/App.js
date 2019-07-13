import React, { Component } from "react";
import { Header, Image, Table, Message, Icon } from "semantic-ui-react";
import logo from "./images/PNG72.png";
import Bitcoin from "./images/Bitcoin.svg";
import Ethereum from "./images/Ethereum.svg";
import XRP from "./images/Ripple.svg";
import BitcoinCash from "./images/Bitcoin Cash.svg";
import Litecoin from "./images/Litecoin.svg";
import EOS from "./images/EOS.svg";
import BinanceCoin from "./images/Binance Coin.svg";
import BitcoinSV from "./images/BitcoinSV.svg";
import Tether from "./images/Tether.svg";
import Cardano from "./images/Cardano.svg";
import Tron from "./images/TRON.svg";
import Stellar from "./images/Stellar.svg";
import Monero from "./images/Monero.svg";
import Dash from "./images/Dash.svg";
import NEO from "./images/NEO.svg";
import ChainLink from "./images/1975.png";
import IOTA from "./images/IOTA.svg";
import Cosmos from "./images/Cosmos.svg";
import EthereumClassic from "./images/Ethereum Classic.svg";
import NEM from "./images/NEM.svg";
import Ontology from "./images/Ontology.svg";
import "./App.css";
var NumberFormat = require("react-number-format");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: [],
      images: [
        { name: "Bitcoin", src: Bitcoin, symbol: "BTC" },
        { name: "Ethereum", src: Ethereum, symbol: "ETC"},
        { name: "Ripple", src: XRP, symbol: "XRP" },
        { name: "Bitcoin Cash", src: BitcoinCash, symbol: "BCH" },
        { name: "Litecoin", src: Litecoin, symbol: "LTC" },
        { name: "EOS", src: EOS, symbol: "EOS"},
        { name: "Binance Coin", src: BinanceCoin, symbol: "BNB" },
        { name: "Bitcoin SV", src: BitcoinSV, symbol: "BSV" },
        { name: "Tether", src: Tether, symbol: "USDT" },
        { name: "Cardano", src: Cardano, symbol: "ADA" },
        { name: "TRON", src: Tron, symbol: "TRX" },
        { name: "Stellar", src: Stellar, symbol: "XLM" },
        { name: "Monero", src: Monero, symbol: "XMR" },
        { name: "Dash", src: Dash, symbol: "DASH" },
        { name: "NEO", src: NEO, symbol: "NEO" },
        { name: "Chainlink", src: ChainLink, symbol: "LINK" },
        { name: "MIOTA", src: IOTA, symbol: "MIOTA" },
        { name: "Cosmos", src: Cosmos, symbol: "ATOM" },
        { name: "Ethereum Classic", src: EthereumClassic, symbol: "ETC" },
        { name: "NEM", src: NEM, symbol: "XEM" },
        { name: "Ontology", src: Ontology, symbol: "ONT" }
      ],
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.funcInterval, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  funcInterval = () => {
    fetch(
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,BCH,LTC,EOS,BNB,BSV,USDT,ADA,TRX,XLM,XMR,DASH,NEO,LINK,MIOTA,ATOM,ETC,XEM,ONT&tsyms=USD"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          cryptos: data.RAW
        });
        console.log(this.state.cryptos);
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateSearch = (event) => {
    this.setState({
      search: event.target.value.substr(0,20)
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <Image src={logo} size="large" />
          </div>
          <div className="col-md-3">
            <Message icon size='mini'>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Updates every second</Message.Header>
              </Message.Content>
            </Message>
          </div>
        </div>

        <Table fixed celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price (USD)</Table.HeaderCell>
              <Table.HeaderCell>Change (24h)</Table.HeaderCell>
              <Table.HeaderCell>Market Cap</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.keys(this.state.cryptos).map((key, index) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image
                        src={this.state.images[index].src}
                        rounded
                        size="mini"
                      />
                      <Header.Content>
                        {this.state.images[index].name}
                        <Header.Subheader>{key}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                      value={this.state.cryptos[key].USD.PRICE}
                      displayType={"text"}
                      decimalScale={2}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                      value={this.state.cryptos[key].USD.CHANGEPCT24HOUR}
                      displayType={"text"}
                      decimalScale={2}
                      suffix={"%"}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                      value={this.state.cryptos[key].USD.MKTCAP}
                      displayType={"text"}
                      decimalScale={2}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default App;
