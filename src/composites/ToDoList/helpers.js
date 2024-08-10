export const formatGroups = (groups) => {
  const groupsCopy = JSON.parse(JSON.stringify(groups));
  const formattedGroups = {};

  groupsCopy.forEach((group) => {
    formattedGroups[group.name] = {};
    group.tasks.forEach((task) => {
      formattedGroups[group.name][task.description] = task.checked;
    });
  });

  return formattedGroups;
};

export const calculateCompletionPercentage = ({ formattedGroups, groups }) => {
  let totalWeight = 0;
  let completedWeight = 0;

  groups.forEach((group) => {
    group.tasks.forEach((task) => {
      totalWeight += task.value;
      if (formattedGroups[group.name][task.description])
        completedWeight += task.value;
    });
  });

  const completionPercentage = (completedWeight * 100) / totalWeight;
  return Math.round(completionPercentage) || 0; 
};
