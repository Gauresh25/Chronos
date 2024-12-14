import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CalendarEvent } from '../types';

interface ExportButtonProps {
  events: CalendarEvent[];
  format: 'json' | 'csv';
}

const ExportButton: React.FC<ExportButtonProps> = ({ events, format }) => {
  const exportData = () => {
    let content: string;
    let type: string;
    let filename: string;

    if (format === 'json') {
      content = JSON.stringify(events, null, 2);
      type = 'application/json';
      filename = 'calendar-events.json';
    } else {
      const headers = ['Title', 'Description', 'Start', 'End', 'Color', 'All Day'];
      const rows = events.map(event => [
        event.title,
        event.description || '',
        new Date(event.start).toISOString(),
        new Date(event.end).toISOString(),
        event.color,
        event.isAllDay ? 'true' : 'false'
      ]);
      content = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
      type = 'text/csv';
      filename = 'calendar-events.csv';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={exportData}
      variant="outline"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Export {format.toUpperCase()}
    </Button>
  );
};

export default ExportButton;