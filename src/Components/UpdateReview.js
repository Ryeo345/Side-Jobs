import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateReview } from '../store';
import {
  Modal,
  FormControl,
  Rating,
  TextField,
  Button,
  Typography,
//   IconButton,
//   DeleteIcon,
//   Tooltip,
//   EditIcon
 } from '@mui/material'
const UpdateReview = ({review, onClose }) => {
  const { auth, reviews, tasks } = useSelector(state => state);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const task = tasks.find(task => task.taskDoerId === review.taskDoerId);

  useEffect(()=>{
    if(review){
      setRating(review.rating);
      setTitle(review.title);
      setComment(review.comment);
    }
  }, [reviews]);


  const update = async(ev) => {
    ev.preventDefault();
    try{
      await dispatch(updateReview({ id: review.id, rating, title, comment, userId: auth.id, taskId: review.taskId, taskDoerId: review.taskDoerId }));
      onClose();
    }
    catch(ex){
      console.log(ex);
    }
  };

  return(
    <div className='update-review'>

      <form onSubmit={ update }>
        <Rating className='rating' sx={{ margin: 'auto', my: '10px' }} value={ rating } onChange={ ev => setRating(Number(ev.target.value)) } placeholder='rating' />
        {/*<FormControl>*/}
        <TextField
         className='update-review-textfield'

          label="Title"
          variant="outlined"
          value={ title }

          onChange={ ev => setTitle(ev.target.value) } />
        {/*</FormControl>*/}
        <TextField
          className='update-review-textfield'

          label="Comment"
          variant="outlined"
          multiline={true}
          rows={3}
          value={ comment } onChange={ ev => setComment(ev.target.value) } />

        {/*<Button margin='normal' variant="outlined" type="submit">Update</Button>*/}
        <Button variant="outlined" type='submit'>Update</Button>
      </form>
    </div>
    );
};

export default UpdateReview;