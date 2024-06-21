import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Container,
  SelectChangeEvent,
} from '@mui/material';

interface TaskEntry {
  id: number;
  task: string;
  detail: string;
  due_date: string;
  priority: string;
  status: string;
}

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<TaskEntry>({
    id: 0,
    task: '',
    detail: '',
    due_date: '',
    priority: '',
    status: '',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const { data, error } = await supabase
        .from('todo')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching task:', error);
        setError('Failed to fetch the task.');
      } else if (data) {
        setEntry(data);
      }
    };

    fetchTask();
  }, [id]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEntry(prevEntry => ({ ...prevEntry, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setEntry(prevEntry => ({ ...prevEntry, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { task, detail, due_date, priority, status } = entry;

    const { error } = await supabase
      .from('todo')
      .update({ task, detail, due_date, priority, status })
      .eq('id', id);

    if (error) {
      console.error('Error updating task:', error);
      setError('Failed to update the task.');
    } else {
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Task
        </Typography>
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Task"
            name="task"
            value={entry.task}
            onChange={handleTextChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Detail"
            name="detail"
            value={entry.detail}
            onChange={handleTextChange}
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Due Date"
            name="due_date"
            value={entry.due_date}
            onChange={handleTextChange}
            required
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={entry.priority}
              label="Priority"
              name="priority"
              onChange={handleSelectChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={entry.status}
              label="Status"
              name="status"
              onChange={handleSelectChange}
            >
              <MenuItem value="not_started">Not Started</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Task
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditTask;
