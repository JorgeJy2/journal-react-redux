import React from 'react';
import dayjs from "dayjs";
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

export const JournalEntry = ({ id, body, title, date, url }) => {
    const day = dayjs(date);
    const dispatch = useDispatch();


    const handleEntryClick = () => {
        dispatch(activeNote(id, {
            body,
            title,
            date,
            url,
        }));
    }

    return (
        <div
            onClick={handleEntryClick}
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster">
            {
                url &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                >
                </div>
            }
            <div className="journal__entry-body">
                <p className="journal_entry-title">
                    {title}
                </p>
                <p className="journal_entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{day.format("dddd")}</span>
                <h4>{day.format("Do")}</h4>
            </div>
        </div>
    )
}
