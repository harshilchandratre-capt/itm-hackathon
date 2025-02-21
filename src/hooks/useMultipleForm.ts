import { ReactElement, useState } from "react";

type Props = { steps: ReactElement[] };

const useMultipleForm = ({ steps }: Props) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(3);

  const next = () => {
    console.log("next called");
    setCurrentStepIndex((prev) => {
      if (prev >= steps.length - 1) {
        return prev;
      }
      return prev + 1;
    });
  };
  const prev = () => {
    setCurrentStepIndex((prev) => {
      if (prev < 1) {
        return prev;
      }
      return prev - 1;
    });
  };
  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    steps,
    goTo,
    next,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    prev,
  };
};

export default useMultipleForm;
