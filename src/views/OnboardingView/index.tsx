import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Button,
  useTheme,
  Container
} from '@mui/material';
import { DiamondOutlined } from '@mui/icons-material';

const steps = [
  'Select campaign settings',
  'Create an ad group',
  'Create an ad',
  'Create another ad'
];
const OnboardingView = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box position="relative" sx={{ width: '100%', height: '100vh' }}>
      <Box
        position="relative"
        height={250}
        bgcolor={theme.palette.primary.light}
      >
        <Stepper sx={{ maxWidth: 900, margin: 'auto' }} activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box
          position="absolute"
          bottom="-75px"
          left="50%"
          right="50%"
          display="flex"
          justifyContent="center"
        >
          <DiamondOutlined sx={{ fill: '#FF6B6B', fontSize: 150 }} />
        </Box>
      </Box>
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h1">Welcome abroad</Typography>
        <Typography my={5}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nisi
          quisquam delectus ullam, cum alias libero doloribus cupiditate
          aspernatur placeat sunt reprehenderit, itaque ad quos sed laboriosam
          id perferendis. Natus.
        </Typography>
        <Button variant="contained" size="large">
          Get Started
        </Button>
        <Button size="large">Skip Tutorial</Button>
      </Container>

      <Box width="50%" mx="auto" mt={10}>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length ? (
                  <Button onClick={handleReset}>Reset</Button>
                ) : activeStep === steps.length - 1 ? (
                  'Finish'
                ) : (
                  'Next'
                )}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default OnboardingView;
