import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarEvent } from '../types';
import ColorPicker from './ColorPicker';

interface EventFormProps {
  event?: CalendarEvent;
  defaultDate?: Date;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: CalendarEvent) => void;
  onDelete?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  defaultDate,
  isOpen,
  onClose,
  onSubmit,
  onDelete,
}) => {
  // Set default start and end times
  const getDefaultTimes = (date: Date) => {
    const start = new Date(date);
    start.setHours(9, 0, 0); // Default to 9 AM
    const end = new Date(date);
    end.setHours(10, 0, 0); // Default to 10 AM

    return { start, end };
  };

  const { register, handleSubmit, setValue, watch, reset } = useForm<CalendarEvent>({
    defaultValues: event || {
      title: '',
      description: '',
      ...getDefaultTimes(defaultDate || new Date()),
      color: '#3b82f6',
      isAllDay: false,
    },
  });

  // Update form dates when defaultDate changes
  useEffect(() => {
    if (!event && defaultDate && isOpen) {
      const { start, end } = getDefaultTimes(defaultDate);
      setValue('start', start);
      setValue('end', end);
    }
  }, [defaultDate, isOpen, event, setValue]);

  // Reset form when it's opened
  useEffect(() => {
    if (isOpen) {
      if (event) {
        reset(event);
      } else if (defaultDate) {
        const { start, end } = getDefaultTimes(defaultDate);
        reset({
          title: '',
          description: '',
          start,
          end,
          color: '#3b82f6',
          isAllDay: false,
        });
      }
    }
  }, [isOpen, event, defaultDate, reset]);

  const selectedColor = watch('color');

  const onSubmitForm = (data: CalendarEvent) => {
    onSubmit({
      ...data,
      id: event?.id || crypto.randomUUID(),
    });
    onClose();
  };

  // const formatDateTimeForInput = (date: Date) => {
  //   return date.toISOString().slice(0, 16);
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Event' : 'New Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <Input
            placeholder="Event title"
            {...register('title', { required: true })}
          />
          
          <Textarea
            placeholder="Description"
            {...register('description')}
          />
          
          {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Start</label>
              <Input
                type="datetime-local"
                {...register('start')}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setValue('start', date);
                }}
              />
            </div>
            <div>
              <label className="text-sm">End</label>
              <Input
                type="datetime-local"
                {...register('end')}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setValue('end', date);
                }}
              />
            </div>
          </div> */}

          <div>
            <label className="text-sm">Color</label>
            <ColorPicker
              color={selectedColor}
              onChange={(color) => setValue('color', color)}
            />
          </div>

          <div className="flex justify-between">
            <Button type="submit" variant="default">
              {event ? 'Update' : 'Create'}
            </Button>
            {event && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={onDelete}
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;