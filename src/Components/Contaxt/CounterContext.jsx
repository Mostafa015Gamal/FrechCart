import React, { createContext, useState } from 'react'


export let CounterContext = createContext()

export default function CounterContextProvider(props) {

  return <CounterContext.Provider>
    {props.children}
  </CounterContext.Provider>
}
