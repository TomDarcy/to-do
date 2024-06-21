import { supabase } from '../../utils/supabase';
import React, { useState, ChangeEvent } from 'react';
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
import { useNavigate } from 'react-router-dom';



interface TaskEntry {
  task: string;
  detail: string;
  due_date: string;
  priority: string;
  status: string;
}

const TaskEntryForm: React.FC = () => {
  const navigate = useNavigate();

  const [entry, setEntry] = useState<TaskEntry>({
    task: '',
    detail: '',
    due_date: new Date().toISOString().split('T')[0], // Default to today's date
    priority: '',
    status: 'not_started',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEntry(prevEntry => ({ ...prevEntry, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setEntry(prevEntry => ({ ...prevEntry, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitting entry:', entry);

    const { task, detail, due_date, priority, status } = entry;

    const { error } = await supabase
      .from('todo')
      .insert([{ task, detail, due_date, priority, status }]);

    if (error) {
      console.error('Error inserting data:', error);
      setError('Failed to add the task.');
    } else {
      setSuccess(true);
      setEntry({
        task: '',
        detail: '',
        due_date: '',
        priority: '',
        status: 'not_started',
      });
      navigate('/');

    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Task
        </Typography>
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" variant="body1">
            Task added successfully!
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
            Add Task
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default TaskEntryForm;
