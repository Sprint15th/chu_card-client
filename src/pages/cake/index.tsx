import CakePreview from '@/components/CakePreview';
import MultiStepForm from '@/components/MultiStepForm';
import FormStateProvider from '@/context/FormStateContext';
import React from 'react';

const Cake = () => {

  return (
    <main>
      <FormStateProvider>
        <CakePreview />
        <MultiStepForm />
      </FormStateProvider>
    </main>
  )
}

export default Cake;

