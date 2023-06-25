import styles from './styles.module.css';

type GiftBoxProps = {
  text: string;
};

export default function GiftBox({ text }: GiftBoxProps) {
  return (
    <>
      <div className={styles.gift}>
        <div className={styles.gift_text}>{text}</div>
        <div className={styles.gift_bow}>
          <div className={styles.gift_bow_left}></div>
          <div className={styles.gift_bow_right}></div>
          <div className={styles.gift_bow_center}></div>
        </div>
        <div className={styles.gift_box}>
          <div className={styles.gift_lid_shadow}></div>
        </div>
        <div className={styles.gift_lid}></div>
        <div className={[styles.gift_star, styles.gift_star__1].join(' ')}></div>
        <div className={[styles.gift_star, styles.gift_star__2].join(' ')}></div>
        <div className={[styles.gift_star, styles.gift_star__3].join(' ')}></div>
        <div className={[styles.gift_star, styles.gift_star__4].join(' ')}></div>
        <div className={[styles.gift_star, styles.gift_star__5].join(' ')}></div>
      </div>
    </>
  );
}
