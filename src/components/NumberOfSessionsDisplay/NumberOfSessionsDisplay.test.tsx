import React from 'react'
import { render } from '@testing-library/react'
import NumberOfSessionsDisplay from './NumberOfSessionsDisplay'

describe('NumberOfSessionsDisplay component', () => {
  describe('before second last session', () => {
    test('displays the correct number of sessions', () => {
      const { getByText } = render(
        <NumberOfSessionsDisplay workIntervalCount={1} />
      );
  
      expect(getByText('3 sessions remaining until your big break')).toBeTruthy();
    })
  })

  describe('second last session', () => {
    test('displays the correct number of sessions', () => {
      const { getByText } = render(
        <NumberOfSessionsDisplay workIntervalCount={3} />
      );
  
      expect(getByText('Big break up next')).toBeTruthy();
    })
  })

  describe('last session', () => {
    test('displays the correct number of sessions', () => {
      const { getByText } = render(
        <NumberOfSessionsDisplay workIntervalCount={4} />
      );
  
      expect(getByText('4 sessions remaining until your big break')).toBeTruthy();
    })
  })
})
