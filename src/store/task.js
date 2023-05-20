import axios from 'axios';
const tasks = (state = [], action)=> {
  if(action.type === 'SET_TASKS') {
    return action.tasks;
  }
  return state;
};

export const fetchTasks = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/tasks');
    //console.log(response.data)
    dispatch({ type: 'SET_TASKS', tasks: response.data });
  };
};

export default tasks;