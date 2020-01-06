import React from 'react'
import { render } from '@testing-library/react'
import { sessionIntervals, sessionTypes } from "../../constants";
import SessionTypeDisplay from './SessionTypeDisplay'

describe('SessionTypeDisplay component', () => {
  describe('work session', () => {
    test('displays the work session text', () => {
      const { getByText } = render(
        <SessionTypeDisplay sessionLengthMins={sessionIntervals.WORK} />
      );
  
      expect(getByText(sessionTypes.WORK)).toBeTruthy();
    })
  })

  describe('short break', () => {
    const { getByText } = render(
      <SessionTypeDisplay sessionLengthMins={sessionIntervals.SHORT} />
    );

    expect(getByText(sessionTypes.SHORT)).toBeTruthy();
  })

  describe('long break', () => {
    const { getByText } = render(
      <SessionTypeDisplay sessionLengthMins={sessionIntervals.LONG} />
    );

    expect(getByText(sessionTypes.LONG)).toBeTruthy();
  })
})