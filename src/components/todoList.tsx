import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography, Paper, Box, Container, IconButton, Switch, FormControlLabel } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, PlayArrow, Flag, Home, Add, BarChart, Delete, Done, AccessTime } from '@mui/icons-material';
import { supabase } from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';

const priorityColors = {
  low: '#4caf50',
  medium: '#ff9800',
  high: '#f44336',
};

interface Todo {
  id: number;
  task: string;
  detail?: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not_started' | 'in_progress' | 'completed';
}

const StatusIcon: React.FC<{ status: Todo['status'] }> = ({ status }) => {
  switch (status) {
    case 'not_started':
      return <RadioButtonUnchecked />;
    case 'in_progress':
      return <PlayArrow />;
    case 'completed':
      return <CheckCircle />;
    default:
      return null;
  }
};

const isPastDue = (dueDate: string) => {
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate);
  return dueDateObj < currentDate;
};

const PriorityFlag: React.FC<{ priority: Todo['priority']; dueDate: string }> = ({ priority, dueDate }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Flag style={{ color: priorityColors[priority] }} />
    {isPastDue(dueDate) && <AccessTime style={{ color: '#f44336', marginLeft: '4px' }} />}
  </Box>
);

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, [showCompleted]);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todo')
      .select("*")
      .order('due_date', { ascending: true })
      .in('status', showCompleted ? ['completed'] : ['not_started', 'in_progress']);
    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      setTodos(data || []);
    }
  };

  const handleEditTask = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteTask = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      const { error } = await supabase
        .from('todo')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Error deleting todo:', error);
      } else {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    }
  };

  const handleCompleteTask = async (id: number) => {
    const { error } = await supabase
      .from('todo')
      .update({ status: 'completed' })
      .eq('id', id);
    if (error) {
      console.error('Error updating todo:', error);
    } else {
      fetchTodos();
    }
  };

  return (
    <Box sx={{
      bgcolor: 'background.default',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 3 }}>
  <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
    Tom's To Do list
  </Typography>
  <FormControlLabel
    control={<Switch checked={showCompleted} onChange={() => setShowCompleted(!showCompleted)} />}
    label="Show Completed"
  />
</Box>

        <Paper elevation={3} sx={{
          flexGrow: 1,
          p: 2,
          mb: 2,
          bgcolor: 'background.default',
          overflow: 'auto'
        }}>
          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                alignItems="flex-start"
                sx={{
                  mb: 2,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                  cursor: 'pointer'
                }}
                onClick={() => handleEditTask(todo.id)}
              >
                <ListItemIcon>
                  <StatusIcon status={todo.status} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                      {todo.task}
                      <Box component="span" sx={{ ml: 1 }}>
                        <PriorityFlag priority={todo.priority} dueDate={todo.due_date} />
                      </Box>
                    </Typography>
                  }
                  secondary={
                    <>
                      {todo.detail && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {todo.detail}
                        </Typography>
                      )}
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        Due: {new Date(todo.due_date).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {todo.status !== 'completed' && (
                    <IconButton color="primary" onClick={(e) => { e.stopPropagation(); handleCompleteTask(todo.id); }}>
                      <Done />
                    </IconButton>
                  )}
                  <IconButton color="secondary" onClick={(e) => { e.stopPropagation(); handleDeleteTask(todo.id); }}>
                    <Delete />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-around',
          p: 1,
          bgcolor: 'background.default'
        }}
        elevation={3}
      >
        <IconButton color="primary" aria-label="home">
          <Home />
        </IconButton>
        <IconButton color="primary" aria-label="add new task">
          <Add />
        </IconButton>
        <IconButton color="primary" aria-label="statistics">
          <BarChart />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default TodoList;
