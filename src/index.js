import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import Modal from "./Modal"
import createRandomArray from "./utils/createRandomArray.js"
import moveTile from "./utils/moveTile"
import winCheck from "./utils/winCheck"
import { createMachine, interpret, assign, send, spawn } from "xstate"

const renderService = (callback, onEvent) => {
  onEvent((e) => {
    switch (e.type) {
      case "GAME": {
        ReactDOM.render(<App action={callback} data={e} />, document.getElementById("root"))
        ReactDOM.render(null, document.getElementById("modal"))
        break
      }
      case "MODAL": {
        ReactDOM.render(<App action={callback} data={e} />, document.getElementById("root"))
        ReactDOM.render(<Modal action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      default: {
        break
      }
    }
  })
}

const appMachine = createMachine(
  {
    context: { score: 0 },
    entry: assign({
      renderServiceRef: () => spawn(renderService, "render"),
    }),
    initial: "newgame",
    states: {
      newgame: {
        entry: [assign({ arr: () => createRandomArray() }), send("TOIDLE")],
        on: {
          TOIDLE: "idle",
        },
      },
      idle: {
        entry: ["renderGame"],
        on: {
          CLICK: "moving",
        },
      },
      moving: {
        entry: [assign({ arr: (ctx, e) => moveTile(ctx.arr, e.data) }), send("WINCHECK")],
        on: {
          WINCHECK: [{ target: "win", cond: (ctx) => winCheck(ctx.arr) }, { target: "idle" }],
        },
      },
      win: {
        entry: [assign({ score: (ctx) => ctx.score + 1 }), "renderGame", "renderModal"],
        on: {
          OK: "newgame",
        },
      },
    },
  },

  {
    actions: {
      renderGame: send((ctx) => ({ type: "GAME", ...ctx }), { to: "render" }),
      renderModal: send((ctx) => ({ type: "MODAL", ...ctx }), { to: "render" }),
    },
  }
)

interpret(appMachine).start()
