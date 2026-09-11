import { Composition } from "remotion";
import {
  DigitSumReel,
  digitSumReelDuration,
  type DigitSumReelProps,
} from "./DigitSumReel";
import reelConfig from "./config.json";
import {
  CountDigitsReel,
  countDigitsReelDuration,
  type CountDigitsReelProps,
} from "./CountDigitsReel";

const defaultProps: DigitSumReelProps = {
  value: reelConfig.number,
  brand: reelConfig.brand,
  titleLine1: reelConfig.titleLine1,
  titleLine2: reelConfig.titleLine2,
  subtitle: reelConfig.subtitle,
  closingLine1: reelConfig.closingLine1,
  closingLine2: reelConfig.closingLine2,
  secondsPerStep: reelConfig.secondsPerStep,
  introSeconds: reelConfig.introSeconds,
  outroSeconds: reelConfig.outroSeconds,
  backgroundLogoOpacity: reelConfig.backgroundLogoOpacity,
  cornerLogoOpacity: reelConfig.cornerLogoOpacity,
};

const countDigitsProps: CountDigitsReelProps = defaultProps;

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="DigitSumReel"
        component={DigitSumReel}
        durationInFrames={digitSumReelDuration(defaultProps.value, defaultProps.secondsPerStep, defaultProps.introSeconds, defaultProps.outroSeconds)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
        calculateMetadata={({ props }) => ({ durationInFrames: digitSumReelDuration(props.value, props.secondsPerStep, props.introSeconds, props.outroSeconds) })}
      />
      <Composition
        id="CountDigitsReel"
        component={CountDigitsReel}
        durationInFrames={countDigitsReelDuration(countDigitsProps.value, countDigitsProps.secondsPerStep, countDigitsProps.introSeconds, countDigitsProps.outroSeconds)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={countDigitsProps}
        calculateMetadata={({ props }) => ({ durationInFrames: countDigitsReelDuration(props.value, props.secondsPerStep, props.introSeconds, props.outroSeconds) })}
      />
    </>
  );
}
