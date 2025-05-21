import React from 'react';
import './SchedulePostModal.css';
import { BottomlessModal } from '../../../components/BottomlessModal/BottomlessModal';
import { SchedulePostModalTopBar } from '../SchedulePostModalTopBar/SchedulePostModalTopBar';

export const SchedulePostModal: React.FC = () => {
    return <BottomlessModal topBar={<SchedulePostModalTopBar />} content={<></>} />
}