import { TOPPING } from '@/constants/cake';
import { cakeState } from '@/store/cakeState';
import { Topping } from '@/types/cake';
import { produce } from 'immer';
import { useSetRecoilState } from 'recoil';

const ToppingController = () => {
  const setCakeState = useSetRecoilState(cakeState);

  const handleClick = (selectedTopping: Topping) => {
    setCakeState(
      produce((prev) => {
        prev.steps.decoration = {
          topping: selectedTopping,
        };
      })
    );
  };

  return (
    <article>
      {Object.values(TOPPING).map((topping) => (
        <button key={topping} type='button' onClick={() => handleClick(topping)}>
          {topping}
        </button>
      ))}
    </article>
  );
};

export default ToppingController;
