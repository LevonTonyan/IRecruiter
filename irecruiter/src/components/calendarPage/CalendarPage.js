import './CalendarPage.css'

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { UserAuth } from '../../context/AuthContext';



let eventGuid = 0

function createEventId() {
  return String(eventGuid++)
}

const CalendarPage=()=>{
  const {isSidebarOpen} = UserAuth()

  
  return (
    <div className={isSidebarOpen ? 'sideBarOpen' : null}>
      <FullCalendar
        height={'80vh'}
        plugins={[dayGridPlugin,interactionPlugin]}
        headerToolbar={{
          start:"prev,next",
          center:"title",
          end:"dayGridMonth,dayGridWeek,dayGridDay",
        }}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}            
        
      />
      
    </div>
  )
}

const handleDateSelect = (selectInfo) => {
  let title = prompt('Add event')
  let calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }
}

const handleEventClick = (clickInfo) => {
  if ((`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}

function renderEventContent(eventInfo) {
return (
  <>
    <b>{eventInfo.timeText}</b>
    <i>{eventInfo.event.title}</i>
  </>
)
}
export default CalendarPage




