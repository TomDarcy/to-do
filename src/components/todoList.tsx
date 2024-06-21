import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography, Paper, Box, Container, IconButton } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, PlayArrow, Flag, Home, Add, BarChart } from '@mui/icons-material';
import { supabase } from '../../utils/supabase';



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

const PriorityFlag: React.FC<{ priority: Todo['priority'] }> = ({ priority }) => (
  <Flag style={{ color: priorityColors[priority] }} />
);

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todo')
      .select("*")
      .neq('status', 'completed')
      .order('due_date', { ascending: true });

    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      setTodos(data || []);
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
          <Typography variant="h4" gutterBottom sx={{ pt: 3, color: 'text.primary' }}>
            To-Do List
          </Typography>
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
                  }}
                >
                  <ListItemIcon>
                    <StatusIcon status={todo.status} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                        {todo.task}
                        <Box component="span" sx={{ ml: 1 }}>
                          <PriorityFlag priority={todo.priority} />
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
