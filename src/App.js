import React from "react";
import axios from "axios";
import "./App.css";
import BicyclePlace from "./BicyclePlace";

class App extends React.Component {
  state = {
    isLoading: true,
    row: [],
  };

  getAPIinfo = async () => {
    const {
      data: {
        rentBikeStatus: { row },
      },
    } = await axios.get(
      "http://openapi.seoul.go.kr:8088/63646f6d6268617238344e46796778/json/bikeList/1/1000"
    );
    this.setState({ row, isLoading: false });
    console.log({ row });
  };

  componentDidMount() {
    this.getAPIinfo();
  }

  render() {
    const { isLoading, row } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div>
            <div className="header">
              <table className="headerTable">
                <tbody>
                  <tr>
                    <td>
                      <img
                        className="logo"
                        src="https://blog.kakaocdn.net/dn/w21Y9/btqu9QnIrhP/D38e5tsM4qw8OlHiRKwHr1/img.jpg"
                        alt="logo"
                      ></img>
                    </td>
                    <td className="title">서울시 자전거 정류장 정보</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <p className="explainLine">
                        정류장 이름을 클릭하면 네이버 지도로 이동합니다 <br />
                        (새 창에서 여시려면 ctrl을 누른채로 클릭해주세요)
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bicycleInfo">
              <table className="bicycleTable">
                <thead>
                  <tr className="bicycleTableHead">
                    <td>정류장 ID</td>
                    <td>정류장 번호</td>
                    <td>정류장 이름</td>
                    <td>자전거 수</td>
                  </tr>
                </thead>
                {row.map((info, index) => (
                  <tbody className="bicycleTableBody">
                    <BicyclePlace
                      key={index}
                      stationId={info.stationId}
                      stationName={info.stationName}
                      rackTotCnt={info.rackTotCnt}
                      shared={info.shared}
                    />
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default App;
