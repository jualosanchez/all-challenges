import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewerProps {
  code: string;
  title?: string;
}

export default function CodeViewer({ code, title = "Code" }: CodeViewerProps) {
  return (
    <Box my={4} style={{ marginTop: 70 }}>
        <Paper elevation={3} sx={{ backgroundColor: 'rgb(41, 45, 62)' }}>
            <Typography variant="h6" component="h3" sx={{ color: 'white', p: 2, borderBottom: '1px solid #444' }}>
                {title}
            </Typography>
            <SyntaxHighlighter
                language="tsx"
                style={materialDark}
                showLineNumbers
                customStyle={{ margin: 0, borderRadius: '0 0 4px 4px' }}
            >
                {code.trim()}
            </SyntaxHighlighter>
        </Paper>
    </Box>
  );
}