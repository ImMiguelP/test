import {
  Box,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type calendarEvents = {
  title: string;
  start: Date | string;
  end: Date | string;
}[];

const events: calendarEvents = [];

function YourCalendar() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  const [editingEvents, setEditingEvents] = useState(events);
  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();
  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();
  console.log(editingEvents);

  useEffect(() => {
    setAllEvents(JSON.parse(localStorage.getItem("MyEvents")!));
  }, []);

  useEffect(() => {
    if (allEvents.length === 0) return;
    localStorage.setItem("MyEvents", JSON.stringify(allEvents));
  }, [allEvents]);

  const addEvent = () => {
    const test = [...allEvents, newEvent];
    setAllEvents(test);
    localStorage.setItem("MyEvents", JSON.stringify(test));
    onFirstModalClose();
  };

  const clearEvents = () => {
    const empty: any = [];
    setAllEvents(empty);
    localStorage.setItem("MyEvents", JSON.stringify(empty));
  };

  const eventModal = (event: any) => {
    onSecondModalOpen();
    setEditingEvents(event);
    console.log(event);
  };

  const bg = "/calbg.png";
  return (
    <Box bgImage={bg} bgSize={"cover"} minH="100%" position={"relative"}>
      <Box
        bg={"rgba( 0, 0, 0, 0.55 )"}
        boxShadow={"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}
        backdropFilter={"blur( 10.5px )"}
        color="White"
        minHeight="100vh"
      >
        <Navbar />
        <Box p={5} maxW={"7xl"} mx={"auto"}>
          <Text
            fontSize={"2xl"}
            color={"#f67f1a"}
            fontWeight={"bold"}
            pb={5}
            textAlign={"center"}
          >
            Your Calendar
          </Text>
          <VStack align={"end"} p={5}>
            <HStack>
              <IconButton
                aria-label="clear events"
                color={"#f67f1a"}
                variant={"ghost"}
                onClick={clearEvents}
                icon={<DeleteIcon />}
              >
                Add A New Event
              </IconButton>
              <Button onClick={onFirstModalOpen} color={"black"} bg={"#f67f1a"}>
                Add A New Event
              </Button>
            </HStack>
          </VStack>
          {/* Modal */}
          <Modal isOpen={isFirstModalOpen} onClose={onFirstModalClose}>
            <ModalOverlay />
            <ModalContent bg={"#333333"}>
              <ModalHeader color={"white"}>
                Add A New Event To The Calendar
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  type={"text"}
                  cursor={"pointer"}
                  color="white"
                  placeholder={"Event Name"}
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <HStack pt={"5"}>
                  <Input
                    as={DatePicker}
                    cursor={"pointer"}
                    color={"white"}
                    placeholderText="Start Date"
                    selected={newEvent.start}
                    onChange={(start: any) =>
                      setNewEvent({ ...newEvent, start })
                    }
                  />
                  <Input
                    as={DatePicker}
                    cursor={"pointer"}
                    color={"white"}
                    placeholderText="End Date"
                    selected={newEvent.end}
                    onChange={(end: any) => setNewEvent({ ...newEvent, end })}
                  />
                </HStack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={addEvent} bg={"#f67f1a"}>
                  Add Event
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* Calendar */}
          <Calendar
            localizer={localizer}
            events={allEvents}
            onDoubleClickEvent={eventModal}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: 600,
              color: "black",
              background: "white",
            }}
          />
          <Modal isOpen={isSecondModalOpen} onClose={onSecondModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Event</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input />
                <HStack pt={5} pb={5}>
                  <Input
                    as={DatePicker}
                    cursor={"pointer"}
                    color={"white"}
                    placeholderText="Start Date"
                  />
                  <Input
                    as={DatePicker}
                    cursor={"pointer"}
                    color={"white"}
                    placeholderText="End Date"
                  />
                </HStack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onSecondModalClose}>
                  Delete Event
                </Button>
                <Button colorScheme="blue">Edit Event</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

export default YourCalendar;
