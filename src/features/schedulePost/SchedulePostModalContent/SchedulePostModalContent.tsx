import React, { useEffect, useRef, useState } from 'react';
import './SchedulePostModalContent.css';
import ScheduleTimeSVG from '../../../components/SVGs/ScheduleTimeSVG';
import { ValidatedDateSelector } from '../../../components/ValidatedInput/ValidatedDateSelector';
import  CalendarMonthIcon  from '@mui/icons-material/CalendarMonth';
import { getDays, getMonths, MONTHS } from '../../../utils/DateUtils';
import { DAYS, getAmPm, getScheduleHours, getScheduleMinutes, getScheduleYears } from '../SchedulePostUtils/SchedulePostUtils';
import { AppDispatch } from '../../../redux/Store';
import { useDispatch } from 'react-redux';
import { setScheduleDate } from '../../../redux/Slices/PostSlice';
import { validateFutureDate } from '../../../services/Validators';

export const SchedulePostModalContent:React.FC = () => {

    const dateSelectorRef = useRef<HTMLInputElement>(null);
    const [scheduledDate, setScheduledDate] = useState<Date>(() => new Date());
    const [amPm, setAmPm] = useState<number>(() => new Date().getHours()/12 > 0 ? 1 : 0);

    const dispatch:AppDispatch = useDispatch();

    const openDateSelector = () => {
        if(dateSelectorRef && dateSelectorRef.current){
            let element:any = dateSelectorRef.current;
            element.showPicker();
        }
    }

    const updateScheduledDate = (name: string, value: string | number | boolean) => {
        let dateCopy = new Date(scheduledDate);

        if(name === 'month' && typeof(value) === 'number'){
            console.log(name +" "+ value);
            dateCopy.setMonth(value-1);
            setScheduledDate(dateCopy);
        }
        
        if(name === 'day' && typeof(value) === 'number'){
            dateCopy.setDate(value);
            setScheduledDate(dateCopy);
        }

        if(name === 'year' && typeof(value) === 'number'){
            dateCopy.setFullYear(value);
            setScheduledDate(dateCopy);
        }

        if(name === 'hour' && typeof(value) === 'number'){
            if(amPm === 0){
                let newHours= value %12;
                dateCopy.setHours(newHours);
            }else{
                let newHours = value === 12 ? 12 : value + 12;
                dateCopy.setHours(newHours);
            }
            setScheduledDate(dateCopy);
        }

        if(name === 'minute' && typeof(value) === 'number'){
            dateCopy.setMinutes(value);
            setScheduledDate(dateCopy);
        }

        if(name === 'am/pm' && typeof(value) === 'number'){
            if(value = 0){
                dateCopy.setHours(dateCopy.getHours() - 12);
            }else{
                dateCopy.setHours(dateCopy.getHours() + 12);
            }
            setScheduledDate(dateCopy);
            setAmPm(value);
        }

        if(validateFutureDate(dateCopy)) dispatch(setScheduleDate(dateCopy));
    }

    const selectDateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let selectedDate:any = e.target.value;
        let d = new Date(selectedDate);

        let dateCopy = new Date(scheduledDate);
        dateCopy.setMonth(d.getMonth());
        dateCopy.setDate(d.getDate());
        dateCopy.setFullYear(d.getFullYear());

        setScheduledDate(dateCopy);
        if(validateFutureDate(dateCopy)) dispatch(setScheduleDate(dateCopy));
    }

    const generateDateString = () => {
        const month = MONTHS[scheduledDate.getMonth() + 1].slice(0,3);
        const day = DAYS[scheduledDate.getDay()];
        const dayOfMonth = scheduledDate.getDate();
        const year = scheduledDate.getFullYear();
        const time = scheduledDate.toLocaleTimeString();
        
        return `${day}, ${month} ${dayOfMonth}, ${year} at ${time.split(":")[0]}:${time.split(":")[1]} ${time.split(" ")[1]}`;
    }

    return (
        <div className="schedule-post-modal-content">
            <div className="schedule-post-modal-content-top">
                <div className="schedule-post-modal-content-scheduled-info">
                    <ScheduleTimeSVG height={20} width={20} color={"#657786"} />
                    <p className='schedule-post-modal-content-scheduled-date'>Will send on {generateDateString()}</p>
                </div>
                <p className="schedule-post-modal-content-label">Date</p>
                <div className="schedule-post-modal-content-date-group">
                    <div className="schedule-post-modal-month-select-wrapper">
                        <ValidatedDateSelector name='Month' valid={validateFutureDate(scheduledDate)} dropDown={getMonths} dispatcher={updateScheduledDate} data={scheduledDate.getMonth() + 1} />
                    </div>
                    <div className="schedule-post-modal-day-select-wrapper">
                        <ValidatedDateSelector name='Day' valid={validateFutureDate(scheduledDate)} dropDown={getDays} dispatcher={updateScheduledDate} data={scheduledDate.getDate()} />
                    </div>
                    <div className="schedule-post-modal-year-select-wrapper">
                        <ValidatedDateSelector name='Year' valid={validateFutureDate(scheduledDate)} dropDown={getScheduleYears} dispatcher={updateScheduledDate} data={scheduledDate.getFullYear()} />
                    </div>
                    <label className='schedule-post-modal-calendar-select-wrapper' onClick={openDateSelector}>
                        <CalendarMonthIcon sx={{
                            fontSize: "24px"
                        }} />

                    </label>
                    <input type='date' id="date-selector" ref={dateSelectorRef} onChange={selectDateChange} />
                </div>
                <p className="schedule-post-modal-content-label">Time</p>
                <div className="schedule-post-modal-content-time-group">
                    <div className="schedule-post-modal-hour-select-wrapper">
                        <ValidatedDateSelector name='Hour' valid={validateFutureDate(scheduledDate)} dropDown={getScheduleHours} dispatcher={updateScheduledDate} data={+scheduledDate.toLocaleTimeString().split(":")[0]} />
                    </div>
                    <div className="schedule-post-modal-minute-select-wrapper">
                        <ValidatedDateSelector name='Minute' valid={validateFutureDate(scheduledDate)} dropDown={getScheduleMinutes} dispatcher={updateScheduledDate} data={scheduledDate.getMinutes()} />
                    </div>
                    <div className="schedule-post-modal-ampm-select-wrapper">
                        <ValidatedDateSelector name='AM/PM' valid={validateFutureDate(scheduledDate)} dropDown={getAmPm} dispatcher={updateScheduledDate} data={amPm} />
                    </div>
                </div>
                <p className="schedule-post-modal-content-label">Time Zone</p>
                <h3 className="schedule-post-modal-content-time-zone">{Intl.DateTimeFormat().resolvedOptions().timeZone}</h3>
            </div>
            <div className="schedule-post-modal-content-bottom">
                <div className="schedule-post-modal-content-scheduled-posts-bg">
                <p className="schedule-post-modal-content-scheduled-posts">Scheduled Post</p>
                </div>
            </div>
        </div>
    )
}