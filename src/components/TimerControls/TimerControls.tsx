/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button, ButtonGroup, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

type TimerControlsProps = {
  isRunning: boolean,
  onPlay: Function,
  onPause: Function,
  onStop: Function,
}

const TimerControls: React.FC<TimerControlsProps> = ({ isRunning, onPlay, onPause, onStop }) => {
  const handlePlayButtonClick = () => {
    onPlay();
  };

  const handlePauseButtonClick = () => {
    onPause();
  };

  const handleStopButtonClick = () => {
    onStop();
  };

  const buttonStyles = css`
    width: 20rem
  `

  return (
    <ButtonGroup>
      {!isRunning && (
        <Button
          css={buttonStyles}
          icon={IconNames.PLAY}
          intent={Intent.SUCCESS}
          large={true}
          onClick={handlePlayButtonClick}
        >
          Play
        </Button>
      )}
      {isRunning && (
        <Button
          css={buttonStyles}
          icon={IconNames.PAUSE}
          intent={Intent.SUCCESS}
          large={true}
          onClick={handlePauseButtonClick}
        >
          Pause
        </Button>
      )}
      <Button
        css={buttonStyles}
        icon={IconNames.STOP}
        intent={Intent.DANGER}
        large={true}
        onClick={handleStopButtonClick}
      >
        Stop
      </Button>
      {/* <Button large={true}>
          <Icon icon={IconNames.STEP_FORWARD} iconSize={Icon.SIZE_LARGE} />
        </Button> */}
    </ButtonGroup>
  );
}

export default TimerControls