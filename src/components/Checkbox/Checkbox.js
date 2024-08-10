import styled from 'styled-components';
import styles from './styles.module.css';

// Follows WAI accessibility guidelines https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/

const Checkbox = ({ isChecked = false, onChange, label }) => {
  return (
    <label className={styles.container} htmlFor={`checkbox ${label}`}>
      <span className={styles.checkmarkWrapper}>
        <input
          id={`checkbox ${label}`}
          className={styles.input}
          type='checkbox'
          checked={isChecked}
          aria-checked={isChecked}
          onChange={onChange}
        />
        <span className={styles.checkmark}></span>
      </span>
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
