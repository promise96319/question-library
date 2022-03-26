import React from 'react'
import type { FilterCondition, Question } from './data.d'

export const SET_FILTER_CONDITION = 'SET_FILTER_CONDITION'
export const DataContext: React.Context<any> = React.createContext({})
export const dataState: FilterCondition = {}
export const dataReducer = (state: FilterCondition, action: { type: string; payload: Partial<Question> }) => {
  switch (action.type) {
    case SET_FILTER_CONDITION:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
