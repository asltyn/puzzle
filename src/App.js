import "./App.css"

function App({ data, action }) {
  return (
    <div classNameName="App">
      <div className="text">
        <div className="content a">Your score is: {data.score}</div>
      </div>
      <div className="text f">
        <hr></hr>
      </div>
      <div className="field">
        <div className="content">
          {data.arr.map((x) => (
            <div className={`tile ${x === 0 ? "e" : ""}`} onClick={(e) => action({ type: "CLICK", data: x })}>
              <div className="content c">{x || ""}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text d">
        <div className="content b">Developed by asltyn@rambler.ru</div>
      </div>
    </div>
  )
}

export default App
