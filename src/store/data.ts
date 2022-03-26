import React from 'react'
import type { FilterCondition, Question } from './data.d'
import { DEFAULT_GRADE } from './util'

export const SET_FILTER_CONDITION = 'SET_FILTER_CONDITION'
export const RESET_FILTER_CONDITION = 'RESET_FILTER_CONDITION'

export const DataContext: React.Context<any> = React.createContext({})
export const dataState: FilterCondition = {
  id: DEFAULT_GRADE,
}
export const dataReducer = (state: FilterCondition, action: { type: string; payload: Partial<Question> }) => {
  switch (action.type) {
    case SET_FILTER_CONDITION:
      return {
        ...state,
        ...action.payload,
      }
    case RESET_FILTER_CONDITION:
      return {
        id: DEFAULT_GRADE,
      }
    default:
      return state
  }
}
