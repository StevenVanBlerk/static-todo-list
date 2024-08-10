import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import styles from './styles.module.css';

const Wrapper = styled.div`
  border-top: ${({ $isFirstItem }) =>
    $isFirstItem ? '1px solid var(--color-greyscale-300)' : 'none'};
  border-radius: ${({ $isFirstItem, $isLastItem }) => {
    const topRadius = $isFirstItem ? '8px 8px' : '0px 0px';
    const bottomRadius = $isLastItem ? '8px 8px' : '0px 0px';
    return `${topRadius} ${bottomRadius}`;
  }};
`;

const Chevron = styled.img`
  transform: ${({ $isExpanded }) =>
    $isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const Panel = styled.div`
  display: ${({ $isExpanded }) => ($isExpanded ? 'block' : 'none')};
  max-height: ${({ $maxHeight }) => $maxHeight}px;
`;

const AccordionItem = ({ id, header, isFirstItem, isLastItem, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const panelRef = useRef(null);

  // fetching panel height to allow for height transition over time
  useEffect(() => {
    if (!isExpanded) setPanelHeight(0);
    else setPanelHeight(panelRef.current.scrollHeight);
  }, [isExpanded]);

  return (
    <Wrapper
      className={styles.wrapper}
      $isExpanded={isExpanded}
      $isFirstItem={isFirstItem}
      $isLastItem={isLastItem}
    >
      <button
        className={styles.header}
        type='button'
        role='heading'
        aria-controls={`${header}-panel`}
        aria-expanded={isExpanded}
        aria-level={3}
        onClick={() => {
          setIsExpanded((prevState) => !prevState);
        }}
      >
        <h3>{header}</h3>
        <span className={styles.chevronWrapper}>
          {isExpanded ? 'Hide' : 'Show'}
          <Chevron
            className={styles.icon}
            src='/icons/chevron-down.svg'
            $isExpanded={isExpanded}
          />
        </span>
      </button>
      <Panel
        id={`${id} panel`}
        ref={panelRef}
        className={styles.panel}
        $maxHeight={panelHeight}
        $isExpanded={isExpanded}
      >
        {children}
      </Panel>
    </Wrapper>
  );
};

export default AccordionItem;
