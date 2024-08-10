import { useState, useEffect } from "react";
import {
  ProgressBar,
  Accordion,
  Checkbox,
  AccordionItem,
} from "@/components/index";
import styles from "./styles.module.css";
import { calculateCompletionPercentage, formatGroups } from "./helpers";
import styled from "styled-components";

const GroupHeader = styled.span`
  color: ${({ $isGroupComplete }) =>
    $isGroupComplete
      ? "var(--color-success-green)"
      : "var(--color-greyscale-900)"};
`;

const ToDoList = () => {
  const [rawGroupsData, setRawGroupsData] = useState([]);

  const [groupsState, setGroupsState] = useState([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // fetching data
  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress"
    )
      .then((response) => response.json())
      .then((data) => {
        setRawGroupsData(data);

        setGroupsState(formatGroups(data));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // ensuring state has updated before updating percentage value
  useEffect(() => {
    setCompletionPercentage(
      calculateCompletionPercentage({
        formattedGroups: groupsState,
        groups: rawGroupsData,
      })
    );
  }, [groupsState]);

  const handleCheck = (groupName, taskDescription) => {
    const isChecked = groupsState[groupName][taskDescription];
    setGroupsState((prevState) => {
      const prevStateCopy = JSON.parse(JSON.stringify(prevState));
      prevStateCopy[groupName][taskDescription] = !isChecked;
      return prevStateCopy;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Grouped tasks</h2>
        <ProgressBar
          id="task progress bar"
          percentageValue={completionPercentage}
        />
      </div>
      <Accordion>
        {rawGroupsData.map((group) => {
          const isGroupComplete =
            Object.values(groupsState[group.name]).filter(
              (isTaskComplete) => !isTaskComplete
            ).length === 0;

          return (
            <AccordionItem
              key={group.name}
              id={group.name}
              header={
                <GroupHeader
                  id={`group ${group.name}`}
                  className={styles.itemHeader}
                  $isGroupComplete={isGroupComplete}
                >
                  <span className={styles.icon} aria-hidden="true">
                    <img
                      src={
                        isGroupComplete
                          ? "/icons/booking-ok.svg"
                          : "/icons/booking-features.svg"
                      }
                    ></img>
                  </span>
                  {group.name}
                </GroupHeader>
              }
            >
              <div
                className={styles.checkboxGroup}
                role="group"
                aria-labelledby={`group ${group.name}`}
                aria-describedby="task progress bar"
              >
                {group.tasks.map((task) => {
                  return (
                    <Checkbox
                      key={`${group.name}-${task.description}`}
                      label={task.description}
                      isChecked={groupsState[group.name][task.description]}
                      onChange={() => {
                        handleCheck(group.name, task.description);
                      }}
                    />
                  );
                })}
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ToDoList;
