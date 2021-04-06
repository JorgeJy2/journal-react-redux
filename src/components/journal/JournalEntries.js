import React from 'react'
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const entries =  [1,2,3,3,3,34,4,44,4];

    return (
        <div className="journal__entries">
            {
                entries.map(entry => 
                    (<JournalEntry key={entry} />))
            }    
        </div>
    )
}
