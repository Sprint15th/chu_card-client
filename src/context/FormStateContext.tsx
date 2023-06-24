import { CREATE_STATE, CREATE_STEPS } from "@/constants/createStep";
import { createContext, useCallback, useState } from "react";

export const FormStateContext = createContext({
  form: CREATE_STEPS,
  setFrom: () => {},
})


interface Props {
  children: React.ReactNode;
}


function FormStateProvider({children}: Props) {
  const [form, setForm] = useState(CREATE_STATE);
 
  const onComplete = useCallback(() => {
    // 작성완료 눌렀을 때 어떻게 해줄것인가


  }, []);
 
  return (
    <FormStateContext.Provider
      value={{
        form,
        setForm,
      }}
    >
      {children}
    </FormStateContext.Provider>
  );
}

export default FormStateProvider;