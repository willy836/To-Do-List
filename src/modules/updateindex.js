const resetIndex = () => {
  const todoArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  const arr = [];

  todoArr.forEach((obj) => {
    const newObj = { ...obj, index: arr.length + 1 };
    arr.push(newObj);
  });
  localStorage.setItem('tasks', JSON.stringify(arr));
};

export default resetIndex;