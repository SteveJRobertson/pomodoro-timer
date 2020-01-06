import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TimerControls from './TimerControls'

describe('TimerControls component', () => {
  const mockOnPlay = jest.fn()
  const mockOnPause = jest.fn()
  const mockOnStop = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('click play', () => {
    test('calls onPlay', () => {
      const mockIsRunning = false
      const { getByText } = render(<TimerControls
        isRunning={mockIsRunning}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onStop={mockOnStop}
      />)
      const playButton = getByText('Play')
      fireEvent.click(playButton)

      expect(mockOnPlay).toHaveBeenCalledWith()

    })
  })

  describe('click pause', () => {
    test('calls onPause', () => {
      const mockIsRunning = true
      const { getByText } = render(<TimerControls
        isRunning={mockIsRunning}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onStop={mockOnStop}
      />)
      const pauseButton = getByText('Pause')
      fireEvent.click(pauseButton)

      expect(mockOnPause).toHaveBeenCalledWith()
    })
  })

  describe('click stop', () => {
    test('calls onStop', () => {
      const mockIsRunning = true
      const { getByText } = render(<TimerControls
        isRunning={mockIsRunning}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onStop={mockOnStop}
      />)
      const stopButton = getByText('Stop')
      fireEvent.click(stopButton)

      expect(mockOnStop).toHaveBeenCalledWith()
    })
  })
})