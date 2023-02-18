import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Center, Text, Stack } from '@chakra-ui/react'

export default function () {
    const [value, onChange] = useState(new Date())
    console.log(value)
    function convert(str:any) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
      console.log(convert(`${value}`))
    return (
        <Center>
            <Calendar onChange={onChange} value={value} />
        </Center>
    );
}