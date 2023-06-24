import { FormStateContext } from "@/context/FormStateContext";
import { useCallback, useContext } from "react";

const useController = () => {

  const {setForm} = useContext(FormStateContext);

  const next = useCallback(() => {
    setForm(
      (form) => {
        ...form,
        form.selectedIndex += 1;
      }
    );
  }, [setForm]);
   
  const prev = useCallback(() => {
    setForm(
      (form) => {
        ...form,
        form.selectedIndex -= 1;
      }
    );
  }, [setForm]);


  const setSelectedIndex = useCallback(
    (index: number) => 
      setForm(
        (form) => {
          ...form,
          form.selectedIndex = index
        })
      )
    ,
    [setForm]
  );

  return {
    prev, 
    next,
    setSelectedIndex
  }
}

export default useController;