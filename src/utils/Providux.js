// @flow

import React, { Component } from "react";
import localStorage from "localStorage";

import { StateProvider, ActionsProvider } from "./context";
import { getActions } from "./actions";
import { STORAGE_KEY } from "./config";

import type { CorePropsType, CoreStateType } from "./types";

let stateFromLocalStorage = localStorage.getItem(STORAGE_KEY);
stateFromLocalStorage = stateFromLocalStorage
  ? JSON.parse(stateFromLocalStorage)
  : {};
const dictionariesFromLocalStorage = stateFromLocalStorage.dictionaries || {};
const initialState: CoreStateType = {
  ...stateFromLocalStorage,
  dictionaries: {
    ...dictionariesFromLocalStorage,
    // eslint-disable-next-line
    ["Dictionary [Example]"]: {
      a: {
        domain: "Stonegrey1",
        range: "Dark Grey"
      },
      b: {
        domain: "Stonegrey2",
        range: "Dark Grey2"
      },
      c: {
        domain: "Caribbean",
        range: "Sea Turqoise"
      }
    }
  }
};

class Providux extends Component<CorePropsType, CoreStateType> {
  state = initialState;

  render() {
    return (
      <ActionsProvider value={getActions(this)}>
        <StateProvider value={this.state}>{this.props.children}</StateProvider>
      </ActionsProvider>
    );
  }
}

export default Providux;
