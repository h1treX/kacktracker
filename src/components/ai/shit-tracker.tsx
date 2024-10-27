import React, { useState, useEffect } from 'react';
import {
  Button,
  Calendar,
  Form,
  NavBar,
  Rate,
  Slider,
  Space,
  TabBar,
  Toast
} from 'antd-mobile';
import {
  AppOutline,
  CalendarOutline,
  ContentOutline
} from 'antd-mobile-icons';
import { ConfigProvider } from 'antd-mobile'
import enUS from 'antd-mobile/es/locales/en-US'

interface Session {
  date: Date;
  duration: number;
  size: number;
  consistency: number;
  urgency: number;
  wipeAmount: number;
}

export default function ShitTracker() {
  const [activeTab, setActiveTab] = useState('timer');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleEndSession = () => {
    setIsTimerRunning(false);
    setActiveTab('rating');
  };

  const handleSubmitRating = (values: Omit<Session, 'date' | 'duration'>) => {
    const newSession: Session = {
      date: new Date(),
      duration: time,
      ...values,
    };
    setSessions([...sessions, newSession]);
    setTime(0);
    setActiveTab('timer');
    Toast.show({
      content: 'Saved Shitting Session',
      position: 'bottom',
    });
  };

  const renderTimer = () => (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ fontSize: '48px', margin: '20px 0' }}>{formatTime(time)}</h2>
      <Space wrap>
        <Button color='primary' onClick={handleStartStop}>
          {isTimerRunning ? 'Pause' : 'Start'}
        </Button>
        <Button color='danger' onClick={handleEndSession}>End Session</Button>
      </Space>
    </div>
  );

  const renderCalendar = () => (
    <Calendar
      selectionMode='single'
      shouldDisableDate={(date: Date) => {
        const sessionDates = sessions.map(s => s.date.toDateString());
        return !sessionDates.includes(date.toDateString());
      }}
    />
  );

  const renderRating = () => (
    <Form
      layout='horizontal'
      footer={
        <Button
          style={{
            width: '200px',
            margin: '0 auto',
            display: 'block',
            textAlign: 'center'
          }}
          block type='submit' color='primary' size='large'>
          Submit Rating
        </Button>
      }
      onFinish={handleSubmitRating}
    >
      <Form.Header>Rate Your Session</Form.Header>
      <Form.Item name='size' label='Size' rules={[{ required: true }]}>
        <Rate count={5} />
      </Form.Item>
      <Form.Item name='consistency' label='Consistency' rules={[{ required: true }]}>
        <Slider
          ticks
          step={1}
          min={1}
          max={5}
          marks={{
            1: 'Very Hard',
            2: 'Hard',
            3: 'Normal',
            4: 'Soft',
            5: 'Very Soft'
          }}
        />
      </Form.Item>
      <Form.Item name='urgency' label='Urgency' rules={[{ required: true }]}>
        <Rate count={5} />
      </Form.Item>
      <Form.Item name='wipeAmount' label='Wipe Amount' rules={[{ required: true }]}>
        <Slider
          ticks
          step={1}
          min={0}
          max={4}
          marks={{
            0: '0 Wipes',
            1: '1 Wipe',
            2: '2 Wipes',
            3: '3 Wipes',
            4: '4+ Wipes'
          }}
        />
      </Form.Item>
    </Form>
  );

  return (
    <ConfigProvider locale={enUS}>
    <div style={{
      height: '100vh',
      paddingLeft: '400px',
      paddingRight: '400px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <NavBar back={null}>Shit Tracker 💩</NavBar>
      <div style={{ flex: 1, paddingTop: '200px', overflowY: 'auto' }}>
        {activeTab === 'timer' && renderTimer()}
        {activeTab === 'rating' && renderRating()}
        {activeTab === 'calendar' && renderCalendar()}
      </div>
      <TabBar activeKey={activeTab} onChange={setActiveTab}>
        <TabBar.Item key='timer' icon={<ContentOutline />} title='Timer' />
        <TabBar.Item key='rating' icon={<AppOutline />} title='Rating' />
        <TabBar.Item key='calendar' icon={<CalendarOutline />} title='Calendar' />
      </TabBar>
    </div>
    </ConfigProvider>
  );
}
