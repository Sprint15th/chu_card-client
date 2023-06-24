import { CREATE_STEPS } from '@/constants/createStep';
import { FormStateContext } from '@/context/FormStateContext';
import useController from '@/hooks/useController';
import React, { useContext } from 'react'

export const MultiStepForm = () => {

  const { form, setFrom } = useContext(FormStateContext);

  const { selectedIndex } = form;


  const { prev }  =  useController();

  return (
    <section>
      test
      {/* {CREATE_STEPS.map((step, idx) => (
        <

      ))} */}
    </section> 
  )
};

