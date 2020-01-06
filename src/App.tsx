/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useEffect, useRef, useCallback } from 'react'
import { sessionIntervals, INTERVAL_DELAY } from './constants'
import { NumberOfSessionsDisplay, SessionTypeDisplay, TimerControls, TimerDigits } from './components'

const useInterval = (callback: Function, delay: number | null) => {
  const savedCallback = useRef<Function>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      if (typeof savedCallback.current === 'function') {
        savedCallback.current()  
      }
    }
      
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const App: React.FC = () => {
  const [intervalDelay, setIntervalDelay] = useState<number|null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionLengthMins, setSessionLengthMins] = useState<number>(
    sessionIntervals.WORK
  );
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    sessionLengthMins * 60
  );
  const [workIntervalCount, setWorkIntervalCount] = useState<number>(0)
  
  const appStyles = css`
    font-family: sans-serif;
    text-align: center;
  `

  const timer = () => {
    setSecondsRemaining(secondsRemaining - 1)
  }

  const pauseInterval = () => {
    setIsRunning(false)
    setIntervalDelay(null)
  }

  const resetCounter = (mins: number) => {
    setSecondsRemaining(mins * 60)
  }

  const updateCurrentIntervalLength = useCallback(() => {
    let nextIntervalLength = sessionIntervals.WORK

    if (sessionLengthMins === sessionIntervals.WORK) {
      let breakInterval = sessionIntervals.SHORT

      if (workIntervalCount === 3) {
        breakInterval = sessionIntervals.LONG
        setWorkIntervalCount(0)
      } else {
        setWorkIntervalCount(workIntervalCount + 1)
      }

      nextIntervalLength = breakInterval
    }

    setSessionLengthMins(nextIntervalLength)
    resetCounter(nextIntervalLength)
  }, [sessionLengthMins, workIntervalCount])

  const play = () => {
    setIntervalDelay(INTERVAL_DELAY)
    setIsRunning(true)
  }

  const pause = () => {
    pauseInterval()
  }

  const stop = () => {
    pauseInterval()
    resetCounter(sessionIntervals.WORK)
  }

  useInterval(timer, intervalDelay)

  useEffect(() => {
    if (isRunning && secondsRemaining === 0) {
      pauseInterval()
      resetCounter(sessionLengthMins)
      updateCurrentIntervalLength()
    } else if (secondsRemaining === 0) {
      setSecondsRemaining(sessionLengthMins * 60)
    }
  }, [isRunning, secondsRemaining, sessionLengthMins, updateCurrentIntervalLength])

  const handlePlayButtonClick = () => {
    play()
  }

  const handlePauseButtonClick = () => {
    pause()
  }

  const handleStopButtonClick = () => {
    setWorkIntervalCount(0)
    setSessionLengthMins(sessionIntervals.WORK)
    stop()
  }

  return (
    <div className="App" css={appStyles}>
      <h1>Pomodoro Timer</h1>

      <TimerDigits secondsRemaining={secondsRemaining} sessionLengthMins={sessionLengthMins} />

      <SessionTypeDisplay sessionLengthMins={sessionLengthMins} />

      <NumberOfSessionsDisplay workIntervalCount={workIntervalCount} />
      
      <TimerControls
        isRunning={isRunning}
        onPlay={handlePlayButtonClick}
        onPause={handlePauseButtonClick}
        onStop={handleStopButtonClick}
      />
    </div>
  )
}

export default App;
